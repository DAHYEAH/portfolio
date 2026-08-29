/**
 * 포트폴리오 RAG 챗봇 Worker
 *
 * 이 Worker가 존재하는 이유: GitHub Pages는 정적 호스팅이라 비밀값을 둘 곳이 없다.
 * Workers AI는 바인딩(env.AI)으로 호출하므로 API 키 문자열 자체가 없고,
 * 따라서 저장소에 커밋할 비밀값도 없다.
 *
 * 흐름: 질문 → bge-m3 임베딩 → kb.json 과 코사인 유사도 → 상위 K개 청크 → LLM → SSE 스트리밍
 */

const EMBED_MODEL = '@cf/baai/bge-m3';
const TOP_K = 4;
/* 유사도 임계값은 "완전한 헛소리"만 거르는 바닥일 뿐이다.
   실측 결과 관련 질문 최저(0.446)가 무관 질문 최고(0.477)보다 낮아,
   점수만으로는 주제 이탈을 판별할 수 없다. 실제 판별은 문서를 직접 보는
   LLM 이 시스템 프롬프트의 규칙에 따라 수행한다. */
const MIN_SCORE = 0.35;
const MAX_QUESTION_CHARS = 500;
const MAX_HISTORY_TURNS = 6;
const RATE_LIMIT = { max: 12, windowMs: 60_000 };

/* 지식 베이스는 isolate 수명 동안 재사용 (콜드스타트마다 1회만 fetch) */
let kbCache = null;
let kbFetchedAt = 0;
const KB_TTL_MS = 10 * 60_000;

/* 아주 가벼운 IP 레이트리밋. isolate 단위라 완벽하지 않지만
   무료 티어를 남이 퍼가는 것을 막는 1차 방어선으로는 충분하다. */
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const bucket = (hits.get(ip) ?? []).filter(t => now - t < RATE_LIMIT.windowMs);
  if (bucket.length >= RATE_LIMIT.max) return true;
  bucket.push(now);
  hits.set(ip, bucket);
  if (hits.size > 5000) hits.clear();   // 메모리 폭주 방지
  return false;
}

function corsHeaders(request, env) {
  const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map(s => s.trim()).filter(Boolean);
  const origin = request.headers.get('Origin') ?? '';
  const ok = allowed.length === 0 || allowed.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? (origin || '*') : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    _allowed: ok,
  };
}

function json(body, status, headers) {
  const { _allowed, ...cors } = headers;
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors },
  });
}

async function loadKB(env) {
  if (kbCache && Date.now() - kbFetchedAt < KB_TTL_MS) return kbCache;
  const res = await fetch(env.KB_URL, { cf: { cacheTtl: 600, cacheEverything: true } });
  if (!res.ok) throw new Error(`kb.json 로드 실패: ${res.status}`);
  kbCache = await res.json();
  kbFetchedAt = Date.now();
  return kbCache;
}

function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

async function embedQuestion(env, question) {
  const out = await env.AI.run(EMBED_MODEL, { text: [question] });
  const vec = out?.data?.[0] ?? out?.response?.[0];
  if (!Array.isArray(vec)) throw new Error('임베딩 응답 형태가 예상과 다릅니다');
  const norm = Math.hypot(...vec) || 1;
  return vec.map(x => x / norm);
}

function retrieve(kb, queryVec) {
  return kb.chunks
    .map(c => ({ chunk: c, score: dot(queryVec, c.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K)
    .filter(r => r.score >= MIN_SCORE);
}

function buildSystemPrompt(hits, question) {
  const context = hits
    .map((h, i) => `[문서 ${i + 1}] (출처: ${h.chunk.source})\n${h.chunk.text}`)
    .join('\n\n---\n\n');

  /* 지시문 언어 = 답변 언어.
     참고 문서가 전부 한국어라, 시스템 프롬프트가 한국어면 모델이 영어 질문에도
     한국어로 답한다. 규칙 한 줄을 영어로 끼워넣는 정도로는 뒤집히지 않아서
     프롬프트 전체를 질문 언어에 맞춘다. */
  const isKorean = /[\u3131-\u318E\uAC00-\uD7A3]/.test(question);

  if (isKorean) {
    return `당신은 AI 개발자 이다혜(Dahye Lee)의 포트폴리오 사이트에 있는 안내 챗봇입니다.
방문자가 이다혜의 경력, 프로젝트, 기술 스택에 대해 묻습니다.

먼저 판단하세요: 이 질문이 이다혜의 경력·프로젝트·기술·학력·연락처에 관한 것입니까?

아니라면 — 개인 신상(나이, 연애, 결혼, 종교, 정치, MBTI 등), 일반 지식(날씨, 시세, 뉴스),
또는 작업 요청(코드 작성, 번역, 요약)이라면 — 아래 [참고 문서]에 비슷한 단어가 있더라도
답하지 말고 이렇게만 답하세요:
"저는 이다혜님의 경력과 프로젝트에 대해서만 안내드릴 수 있어요. 궁금하신 점이 있으면 물어봐 주세요."

검색은 단어가 겹치기만 해도 문서를 가져옵니다. 문서가 붙어 있다는 사실이
그 질문에 답해도 된다는 뜻은 아닙니다.

맞다면 아래 규칙으로 답하세요:
- [참고 문서]에 있는 내용만 근거로 삼으세요.
- 문서에 없는 내용은 지어내지 말고 "그 부분은 포트폴리오에 정리되어 있지 않아요. dian3548@naver.com 으로 직접 문의해 주세요."라고 답하세요.
- 구체적인 수치나 성과를 묻는데 문서에 없다면, 없다고 솔직히 말하세요. 추측하지 마세요.
- 이다혜 본인이 아니라 제3자(안내자) 시점으로, "이다혜님은 ~했습니다" 처럼 존댓말로 답하세요.
- 3~5문장 정도로 간결하게. 목록이 자연스러우면 짧은 불릿을 쓰세요.

[참고 문서]
${context}`;
  }

  return `You are a guide chatbot on the portfolio site of Dahye Lee (이다혜), an AI developer.
Visitors ask about her experience, projects, and technical skills.

CRITICAL: Answer in English. The reference documents below are written in Korean —
read them, then write your answer in English. Never reply in Korean.

First decide: is this question about Dahye's career, projects, skills, education, or contact info?

If not — personal matters (age, dating, marriage, religion, politics, MBTI), general knowledge
(weather, stock prices, news), or task requests (write code, translate, summarize) — then even if
the documents below share some words with the question, do not answer. Reply only with:
"I can only help with questions about Dahye's experience and projects. Feel free to ask about those!"

Retrieval pulls documents on mere word overlap. A document being attached does not mean
the question is in scope.

If it is in scope, follow these rules:
- Ground every claim in the [Reference documents] below.
- Never invent details. If something is not in the documents, say:
  "That is not covered in the portfolio. Please reach out at dian3548@naver.com."
- If asked for specific numbers or results that are not in the documents, say so plainly. Do not guess.
- Write in third person about her ("Dahye worked on…"), not as her.
- Keep it to 3-5 sentences. Use short bullets if a list reads naturally.

[Reference documents]
${context}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    /* 빌드 전용 임베딩 경로.
       Cloudflare API 토큰 발급이 막힌 경우 scripts/build-index.mjs 가
       `wrangler dev --remote --var DEV_EMBED:1` 로 이 Worker 를 띄워
       OAuth 세션만으로 임베딩을 얻는다.

       DEV_EMBED 는 wrangler.jsonc 의 vars 에 절대 넣지 않는다.
       dev 실행 시 --var 로만 주입되므로 배포본에는 이 경로가 열리지 않는다. */
    if (url.pathname === '/__embed') {
      if (env.DEV_EMBED !== '1') return new Response('not found', { status: 404 });
      const { text } = await request.json();
      const out = await env.AI.run(EMBED_MODEL, { text });
      return Response.json({ data: out?.data ?? out?.response });
    }

    const cors = corsHeaders(request, env);

    if (request.method === 'OPTIONS') {
      const { _allowed, ...h } = cors;
      return new Response(null, { status: 204, headers: h });
    }
    if (!cors._allowed) return json({ error: 'origin_not_allowed' }, 403, cors);
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, cors);

    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    if (rateLimited(ip)) {
      return json({ error: 'rate_limited', message: '잠시 후 다시 시도해 주세요.' }, 429, cors);
    }

    let body;
    try { body = await request.json(); }
    catch { return json({ error: 'invalid_json' }, 400, cors); }

    const question = String(body.question ?? '').trim();
    if (!question) return json({ error: 'empty_question' }, 400, cors);
    if (question.length > MAX_QUESTION_CHARS) {
      return json({ error: 'question_too_long' }, 400, cors);
    }

    const history = Array.isArray(body.history)
      ? body.history
          .slice(-MAX_HISTORY_TURNS)
          .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }))
      : [];

    try {
      const kb = await loadKB(env);
      const queryVec = await embedQuestion(env, question);
      const hits = retrieve(kb, queryVec);

      if (hits.length === 0) {
        return json({
          type: 'no_context',
          answer: '그 질문은 포트폴리오에 정리된 내용으로는 답하기 어렵네요. 경력·프로젝트·기술 스택에 대해 물어봐 주시거나, dian3548@naver.com 으로 직접 문의해 주세요.',
          sources: [],
        }, 200, cors);
      }

      const messages = [
        { role: 'system', content: buildSystemPrompt(hits, question) },
        ...history,
        { role: 'user', content: question },
      ];

      const stream = await env.AI.run(env.LLM_MODEL, {
        messages,
        max_tokens: 500,
        temperature: 0.2,
        stream: true,
      });

      const { _allowed, ...h } = cors;
      return new Response(stream, {
        headers: {
          ...h,
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          // 근거로 쓴 문서를 헤더로 같이 내려서 UI 에 출처 칩으로 표시
          'X-Sources': encodeURIComponent(JSON.stringify(
            hits.map(x => ({ title: x.chunk.title, heading: x.chunk.heading, score: +x.score.toFixed(3) })),
          )),
          'Access-Control-Expose-Headers': 'X-Sources',
        },
      });
    } catch (err) {
      console.error(err);
      return json({ error: 'internal', message: String(err).slice(0, 200) }, 500, cors);
    }
  },
};
