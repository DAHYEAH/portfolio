# dahyeah.github.io/portfolio

이다혜(Dahye Lee) 포트폴리오 — 정적 HTML/CSS/JS + RAG 챗봇.

🔗 https://dahyeah.github.io/portfolio/

## 구조

단일 페이지 스크롤이고, **챗봇이 히어로 중앙**에 배치되어 있습니다.

```
├── index.html              전체 페이지 (hero → about → experience → projects → skills → contact)
├── experience.html …       기존 4개 페이지 → index.html#앵커 로 리다이렉트 (링크 호환용)
├── css/styles.css          전체 스타일
├── js/
│   ├── i18n.js             한/영 토글
│   ├── site.js             네비게이션 · 스크롤 스파이 · 모바일 메뉴
│   └── chat.js             히어로 챗봇 패널
├── images/                 🖼 README.md 에 생성해야 할 이미지 목록
├── content/                📚 지식 베이스 (md) — 챗봇 답변의 원본
├── scripts/build-index.mjs 🔨 content/ → data/kb.json (청킹 + 임베딩)
├── data/kb.json            🤖 빌드 산출물 (챗봇이 검색하는 인덱스)
└── worker/                 ☁️ Cloudflare Worker (검색 + 답변 생성)
```

## 디자인

| | |
|---|---|
| 액센트 | 페리윙클 인디고 `#6C63F5` |
| 배경 | `#FFFFFF` / `#F8F8FD` 교차 |
| 폰트 | Heebo (제목) · Roboto (본문) · Noto Sans KR (한글) |
| 패턴 | 대문자 eyebrow → 굵은 제목 → 2열 카드 그리드 |

이미지는 전부 `onerror` 폴백이 걸려 있어 **없어도 완성돼 보입니다.**
넣어야 할 파일 목록은 [`images/README.md`](images/README.md) 참고.

## 콘텐츠 수정

`content/` 안의 md 파일이 단일 진실 공급원입니다. 작성 규칙은 [`content/README.md`](content/README.md) 참고.

md를 고쳤으면 인덱스를 다시 만들어야 챗봇이 반영합니다:

```bash
node scripts/build-index.mjs
```

> `index.html` 의 내용은 아직 수동 동기화입니다. md를 고치면 HTML도 같이 손봐주세요.

## 챗봇 — 어떻게 동작하나

```
[브라우저]  질문
     ↓
[Cloudflare Worker]
     ├─ bge-m3 로 질문 임베딩
     ├─ data/kb.json 과 코사인 유사도 → 상위 4개 청크
     └─ LLM 에 청크를 근거로 넣어 답변 생성 (SSE 스트리밍)
     ↓
[브라우저]  답변 + 참고 문서 칩
```

**API 키를 커밋하지 않습니다.** GitHub Pages는 정적 호스팅이라 비밀값을 둘 곳이 없는데,
Workers AI를 `env.AI` 바인딩으로 호출하므로 애초에 키 문자열이 생기지 않습니다.
`wrangler login`의 자격증명은 로컬(`~/.wrangler`)에만 남습니다.

### 최초 설정

```bash
cd worker && npm install && npx wrangler login   # 브라우저 OAuth 1회
cd .. && node scripts/build-index.mjs            # → data/kb.json
cd worker && npx wrangler deploy                 # → https://portfolio-chat.<계정>.workers.dev
# 배포된 URL 을 js/chat.js 상단 WORKER_URL 에 반영
```

**API 토큰은 필요 없습니다.** 토큰이 없으면 빌드 스크립트가 자동으로
`wrangler dev --remote` 를 잠깐 띄워 OAuth 세션으로 임베딩을 만들고 종료합니다.
(신규 Cloudflare 계정에서 API 토큰 발급이 `verify your email` 로 막히는 사례가 있어
 토큰 없이도 되도록 해둔 경로입니다.)

토큰이 있으면 그쪽이 조금 더 빠릅니다 — `.env.local` 에 `CLOUDFLARE_API_TOKEN` 을 넣으면
자동으로 REST 경로를 씁니다. `--via-wrangler` 로 강제 전환할 수도 있습니다.

배포된 Worker: `https://portfolio-chat.dahyeah.workers.dev`

자세한 내용과 무료 한도는 [`worker/README.md`](worker/README.md) 참고.
요약: Workers AI 무료 할당은 하루 10,000 뉴런이고, 기본 모델 기준 **하루 약 100회 대화**입니다.

### 로컬 확인

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

`worker/wrangler.jsonc` 의 `ALLOWED_ORIGINS` 에 `localhost:8000` 이 이미 들어 있습니다.

## 배포

`master` 브랜치 루트를 GitHub Pages 가 그대로 서빙합니다. push 하면 반영됩니다.
Worker 는 별도로 `npx wrangler deploy` 해야 합니다.

---

레이아웃 초기 골격은 [RyanFitzgerald/devportfolio](https://github.com/RyanFitzgerald/devportfolio) 에서 출발했으며,
현재는 Astro 없이 순수 정적 파일로 재작성되어 있습니다.
