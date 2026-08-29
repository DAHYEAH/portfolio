/* =====================================================
   RAG 챗봇 — 히어로 인라인 패널
   검색·생성은 Cloudflare Worker 가 담당하고 여기서는 UI 만 다룬다.
   worker/README.md 참고
   ===================================================== */

const WORKER_URL = 'https://portfolio-chat.dahyeah.workers.dev';

const UI = {
  ko: {
    prompt:      '이다혜의 경력과 프로젝트에 대해 물어보세요',
    placeholder: '무엇이 궁금하신가요?',
    send:        '보내기',
    sources:     '참고',
    thinking:    '찾아보는 중',
    foot:        'content/ 의 문서를 검색해 답합니다 · 문서에 없는 내용은 답하지 않습니다',
    suggestions: [
      'RAG 경험이 있나요?',
      '어떤 프로젝트를 했나요?',
      '기술 스택이 어떻게 되나요?',
      '수상 경력이 있나요?',
    ],
    errors: {
      rate:    '질문이 너무 빨라요. 잠시 후 다시 시도해 주세요.',
      quota:   '오늘의 무료 사용량을 다 썼어요. 내일 다시 시도해 주시거나 dian3548@naver.com 으로 문의해 주세요.',
      network: '연결에 문제가 있어요. 잠시 후 다시 시도해 주세요.',
      config:  '챗봇이 아직 연결되지 않았어요. (Worker 배포 후 js/chat.js 의 WORKER_URL 을 설정해 주세요)',
    },
  },
  en: {
    prompt:      "Ask about Dahye's experience and projects",
    placeholder: 'What would you like to know?',
    send:        'Send',
    sources:     'Sources',
    thinking:    'Looking it up',
    foot:        'Answers are retrieved from the documents in content/ — nothing outside them.',
    suggestions: [
      'Does she have RAG experience?',
      'What projects has she worked on?',
      'What is her tech stack?',
      'Has she won any awards?',
    ],
    errors: {
      rate:    'Too many questions at once. Please try again shortly.',
      quota:   "Today's free quota is used up. Please try tomorrow or email dian3548@naver.com.",
      network: 'Connection problem. Please try again shortly.',
      config:  'The chatbot is not connected yet. (Set WORKER_URL in js/chat.js after deploying the Worker.)',
    },
  },
};

const state = { busy: false, history: [], started: false };

const lang = () => (localStorage.getItem('lang') === 'ko' ? 'ko' : 'en');
const t = () => UI[lang()];

/* ── DOM 조립 ── */
const mount = document.getElementById('chat-mount');

if (mount) {
  mount.innerHTML = `
    <div class="chat-panel">
      <p class="chat-prompt">
        <span class="chat-prompt-dot" aria-hidden="true"></span>
        <span class="chat-prompt-text"></span>
      </p>

      <div class="chat-log" role="log" aria-live="polite"></div>

      <div class="chat-suggestions"></div>

      <form class="chat-form">
        <input class="chat-input" type="text" autocomplete="off" maxlength="500">
        <button class="chat-send" type="submit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h13M12 5l7 7-7 7"/>
          </svg>
        </button>
      </form>

      <p class="chat-foot"></p>
    </div>
  `;
}

const el = mount ? {
  promptText:  mount.querySelector('.chat-prompt-text'),
  log:         mount.querySelector('.chat-log'),
  suggestions: mount.querySelector('.chat-suggestions'),
  form:        mount.querySelector('.chat-form'),
  input:       mount.querySelector('.chat-input'),
  send:        mount.querySelector('.chat-send'),
  foot:        mount.querySelector('.chat-foot'),
} : null;

/* ── 정적 문구 적용 (언어 토글 시 재호출) ── */
function applyChatLang() {
  if (!el) return;
  const s = t();
  el.promptText.textContent = s.prompt;
  el.input.placeholder      = s.placeholder;
  el.send.setAttribute('aria-label', s.send);
  el.foot.textContent       = s.foot;

  el.suggestions.innerHTML = '';
  for (const q of s.suggestions) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chat-chip';
    chip.textContent = q;
    chip.addEventListener('click', () => ask(q));
    el.suggestions.appendChild(chip);
  }
}

/* ── 스트리밍 토큰 이어붙이기 ──
   Workers AI 의 SSE 는 숫자만으로 된 토큰을 JSON "숫자"로 직렬화하면서
   토큰 앞의 공백을 잃는다:  " 2024"  →  {"response": 2024}
   그대로 이으면 "…부터2024년", "from2024.07" 처럼 붙어버린다.
   (비스트리밍 호출은 온전한 문자열을 주므로 스트리밍 경로만의 손실이다.)

   복원 규칙: 숫자 토큰 앞 글자가 문자류일 때만 공백을 되살린다.
   숫자·소수점·하이픈·여는 괄호 뒤에는 넣지 않는다 — "2024" + "." + "07" 같은
   분해를 망가뜨리지 않기 위해서다. */
function appendToken(answer, token) {
  if (typeof token === 'number' && answer) {
    const prev = answer.slice(-1);
    if (!/[\s\d.,\-/:~([{'"]/.test(prev)) return `${answer} ${token}`;
  }
  return answer + token;
}

/* ── 메시지 렌더 ── */
function addMessage(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `chat-msg chat-msg-${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.textContent = text;
  wrap.appendChild(bubble);
  el.log.appendChild(wrap);
  el.log.scrollTop = el.log.scrollHeight;
  return bubble;
}

function addSources(sources) {
  if (!sources?.length) return;
  const wrap = document.createElement('div');
  wrap.className = 'chat-sources';
  const label = document.createElement('span');
  label.className = 'chat-sources-label';
  label.textContent = t().sources;
  wrap.appendChild(label);
  for (const s of sources) {
    const chip = document.createElement('span');
    chip.className = 'chat-source-chip';
    chip.textContent = s.heading ? `${s.title} · ${s.heading}` : s.title;
    wrap.appendChild(chip);
  }
  el.log.appendChild(wrap);
  el.log.scrollTop = el.log.scrollHeight;
}

/* ── 질의 ── */
async function ask(question) {
  if (!el || state.busy) return;

  // 첫 질문에서 로그를 펼치고 추천 질문을 감춘다
  if (!state.started) {
    state.started = true;
    el.log.classList.add('active');
  }
  el.suggestions.hidden = true;

  if (WORKER_URL.includes('YOUR-SUBDOMAIN')) {
    addMessage('user', question);
    addMessage('error', t().errors.config);
    return;
  }

  state.busy = true;
  el.input.value = '';
  el.send.disabled = true;

  addMessage('user', question);

  const bubble = addMessage('assistant', t().thinking);
  bubble.classList.add('chat-typing');

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history: state.history }),
    });

    if (res.status === 429) throw new Error('rate');
    if (!res.ok) throw new Error(res.status >= 500 ? 'quota' : 'network');

    // 관련 문서를 못 찾은 경우 Worker 가 일반 JSON 으로 응답한다
    if ((res.headers.get('Content-Type') ?? '').includes('application/json')) {
      const data = await res.json();
      bubble.classList.remove('chat-typing');
      bubble.textContent = data.answer ?? t().errors.network;
      return;
    }

    let sources = [];
    try {
      const raw = res.headers.get('X-Sources');
      if (raw) sources = JSON.parse(decodeURIComponent(raw));
    } catch { /* 출처 표시는 실패해도 답변에는 지장 없음 */ }

    /* Workers AI SSE: data: {"response":"..."} … data: [DONE] */
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let answer = '';

    bubble.classList.remove('chat-typing');
    bubble.textContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const chunk = JSON.parse(payload);
          // Workers AI 는 숫자만으로 된 토큰을 문자열이 아니라 정수로 보낸다
          // ({"response": 2024}). falsy 검사를 쓰면 토큰이 0 일 때 사라지므로
          // null/undefined 만 걸러낸다.
          if (chunk.response != null) {
            answer = appendToken(answer, chunk.response);
            bubble.textContent = answer;
            el.log.scrollTop = el.log.scrollHeight;
          }
        } catch { /* 부분 JSON 은 다음 청크에서 이어진다 */ }
      }
    }

    if (!answer) throw new Error('network');

    addSources(sources);
    // 한 번 주고받을 때마다 2개가 쌓이므로, 6 = 직전 3번의 왕복.
    // 더 길게 두면 매 질문의 입력 토큰이 계속 불어나고 오래된 맥락이 답변을 흐린다.
    state.history.push({ role: 'user', content: question });
    state.history.push({ role: 'assistant', content: answer });
    state.history = state.history.slice(-6);

  } catch (err) {
    bubble.closest('.chat-msg').remove();
    const key = ['rate', 'quota', 'network'].includes(err.message) ? err.message : 'network';
    addMessage('error', t().errors[key]);
  } finally {
    state.busy = false;
    el.send.disabled = false;
  }
}

if (el) {
  el.form.addEventListener('submit', e => {
    e.preventDefault();
    const q = el.input.value.trim();
    if (q) ask(q);
  });

  /* 언어 토글 버튼이 눌리면 챗봇 문구도 따라간다 */
  for (const id of ['btn-en', 'btn-ko']) {
    document.getElementById(id)?.addEventListener('click', () => setTimeout(applyChatLang, 0));
  }

  applyChatLang();
}
