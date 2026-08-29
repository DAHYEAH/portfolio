/* =====================================================
   RAG 챗봇 위젯
   검색·생성은 Cloudflare Worker 가 담당하고 여기서는 UI 만 다룬다.
   worker/README.md 참고
   ===================================================== */

/* ⚠️ wrangler deploy 후 출력된 URL 로 바꿔주세요 */
const WORKER_URL = 'https://portfolio-chat.dahyeah.workers.dev';

const UI = {
  ko: {
    launch:   '이다혜에게 물어보기',
    title:    '포트폴리오 챗봇',
    subtitle: '경력·프로젝트에 대해 물어보세요',
    greeting: '안녕하세요! 이다혜님의 포트폴리오 안내 챗봇이에요.\n경력, 프로젝트, 기술 스택에 대해 편하게 물어보세요.',
    placeholder: '무엇이 궁금하신가요?',
    send:     '보내기',
    close:    '닫기',
    sources:  '참고한 문서',
    thinking: '찾아보는 중',
    suggestions: [
      '어떤 프로젝트를 했나요?',
      'RAG 경험이 있나요?',
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
    launch:   'Ask about Dahye',
    title:    'Portfolio Chatbot',
    subtitle: 'Ask about experience and projects',
    greeting: "Hi! I'm a guide to Dahye Lee's portfolio.\nAsk me anything about her experience, projects, or tech stack.",
    placeholder: 'What would you like to know?',
    send:     'Send',
    close:    'Close',
    sources:  'Sources',
    thinking: 'Looking it up',
    suggestions: [
      'What projects has she worked on?',
      'Does she have RAG experience?',
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

const state = {
  open: false,
  busy: false,
  history: [],
};

const lang = () => (localStorage.getItem('lang') === 'ko' ? 'ko' : 'en');
const t = () => UI[lang()];

/* ── DOM 조립 ── */
function build() {
  const root = document.createElement('div');
  root.className = 'chat-root';
  root.innerHTML = `
    <button class="chat-launcher" type="button" aria-haspopup="dialog" aria-expanded="false">
      <span class="chat-launcher-icon" aria-hidden="true">💬</span>
      <span class="chat-launcher-label"></span>
    </button>

    <div class="chat-panel" role="dialog" aria-modal="false" aria-label="Portfolio chatbot" hidden>
      <header class="chat-header">
        <div>
          <p class="chat-title"></p>
          <p class="chat-subtitle"></p>
        </div>
        <button class="chat-close" type="button">✕</button>
      </header>

      <div class="chat-log" role="log" aria-live="polite"></div>

      <div class="chat-suggestions"></div>

      <form class="chat-form">
        <input class="chat-input" type="text" autocomplete="off" maxlength="500">
        <button class="chat-send" type="submit"></button>
      </form>
    </div>
  `;
  document.body.appendChild(root);
  return root;
}

const root = build();
const el = {
  launcher:    root.querySelector('.chat-launcher'),
  launchLabel: root.querySelector('.chat-launcher-label'),
  panel:       root.querySelector('.chat-panel'),
  title:       root.querySelector('.chat-title'),
  subtitle:    root.querySelector('.chat-subtitle'),
  close:       root.querySelector('.chat-close'),
  log:         root.querySelector('.chat-log'),
  suggestions: root.querySelector('.chat-suggestions'),
  form:        root.querySelector('.chat-form'),
  input:       root.querySelector('.chat-input'),
  send:        root.querySelector('.chat-send'),
};

/* ── 정적 문구 적용 (언어 토글 시 재호출) ── */
function applyLang() {
  const s = t();
  el.launchLabel.textContent = s.launch;
  el.title.textContent       = s.title;
  el.subtitle.textContent    = s.subtitle;
  el.close.setAttribute('aria-label', s.close);
  el.input.placeholder       = s.placeholder;
  el.send.textContent        = s.send;

  el.suggestions.innerHTML = '';
  for (const q of s.suggestions) {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chat-chip';
    chip.textContent = q;
    chip.addEventListener('click', () => ask(q));
    el.suggestions.appendChild(chip);
  }

  // 인사말은 아직 대화가 없을 때만 갱신
  if (state.history.length === 0) {
    el.log.innerHTML = '';
    addMessage('assistant', s.greeting);
  }
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
  wrap.innerHTML = `<span class="chat-sources-label">${t().sources}</span>`;
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
  if (state.busy) return;

  if (WORKER_URL.includes('YOUR-SUBDOMAIN')) {
    addMessage('user', question);
    addMessage('error', t().errors.config);
    return;
  }

  state.busy = true;
  el.input.value = '';
  el.send.disabled = true;
  el.suggestions.hidden = true;

  addMessage('user', question);

  const bubble = addMessage('assistant', '');
  bubble.classList.add('chat-typing');
  bubble.textContent = t().thinking;

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history: state.history }),
    });

    if (res.status === 429) throw new Error('rate');
    if (!res.ok) throw new Error(res.status >= 500 ? 'quota' : 'network');

    const ctype = res.headers.get('Content-Type') ?? '';

    // 관련 문서를 못 찾은 경우 Worker 가 일반 JSON 으로 응답한다
    if (ctype.includes('application/json')) {
      const data = await res.json();
      bubble.classList.remove('chat-typing');
      bubble.textContent = data.answer ?? t().errors.network;
      state.busy = false;
      el.send.disabled = false;
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
          if (chunk.response) {
            answer += chunk.response;
            bubble.textContent = answer;
            el.log.scrollTop = el.log.scrollHeight;
          }
        } catch { /* 부분 JSON 은 다음 청크에서 이어진다 */ }
      }
    }

    if (!answer) throw new Error('network');

    addSources(sources);
    state.history.push({ role: 'user', content: question });
    state.history.push({ role: 'assistant', content: answer });
    state.history = state.history.slice(-6);

  } catch (err) {
    bubble.remove();
    const key = ['rate', 'quota', 'network'].includes(err.message) ? err.message : 'network';
    addMessage('error', t().errors[key]);
  } finally {
    state.busy = false;
    el.send.disabled = false;
    el.input.focus();
  }
}

/* ── 열기 / 닫기 ── */
function toggle(open) {
  state.open = open ?? !state.open;
  el.panel.hidden = !state.open;
  el.launcher.setAttribute('aria-expanded', String(state.open));
  root.classList.toggle('chat-open', state.open);
  if (state.open) el.input.focus();
}

el.launcher.addEventListener('click', () => toggle());
el.close.addEventListener('click', () => toggle(false));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && state.open) toggle(false);
});

el.form.addEventListener('submit', e => {
  e.preventDefault();
  const q = el.input.value.trim();
  if (q) ask(q);
});

/* 언어 토글 버튼이 눌리면 챗봇 문구도 따라간다 */
for (const id of ['btn-en', 'btn-ko']) {
  document.getElementById(id)?.addEventListener('click', () => setTimeout(applyLang, 0));
}

applyLang();
