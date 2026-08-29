# portfolio-chat — RAG 챗봇 Worker

GitHub Pages(정적 호스팅)에는 비밀값을 둘 곳이 없어서 존재하는 얇은 프록시입니다.

**핵심: 이 구성에는 커밋할 API 키가 없습니다.**
Workers AI를 `env.AI` 바인딩으로 호출하기 때문에 키 문자열 자체가 생기지 않습니다.
`wrangler login`으로 브라우저 OAuth 인증만 하면 되고, 그 자격증명은 로컬(`~/.wrangler`)에만 남습니다.

## 하는 일

```
질문 → bge-m3 임베딩 → kb.json 과 코사인 유사도 → 상위 4개 청크 → LLM → SSE 스트리밍
```

- 오리진 허용목록으로 외부 사이트의 무단 사용 차단
- IP당 1분 12회 레이트리밋 (isolate 단위라 완벽하진 않은 1차 방어선)
- 근거 문서를 `X-Sources` 헤더로 함께 반환 → UI에 출처 칩 표시

## 배포

```bash
cd worker
npm install
npx wrangler login          # 브라우저 OAuth. 키를 파일에 적지 않습니다
npx wrangler deploy
```

## `/__embed` — 빌드 전용 경로

`src/index.js` 에는 `env.DEV_EMBED === '1'` 일 때만 열리는 `/__embed` 가 있습니다.
`scripts/build-index.mjs` 가 API 토큰 없이 임베딩을 만들 때
`wrangler dev --remote --var DEV_EMBED:1` 로 이 Worker 를 잠깐 띄워 사용합니다.

`DEV_EMBED` 는 `wrangler.jsonc` 의 `vars` 에 **없으므로** 배포본에서는 이 경로가 404 입니다.
vars 에 추가하지 마세요.

배포 후 출력되는 URL(`https://portfolio-chat.<계정>.workers.dev`)을
루트의 `js/chat.js` 상단 `WORKER_URL` 에 적어주세요.

## 무료 한도

Workers AI 무료 할당은 **하루 10,000 뉴런**(= 약 $0.11 상당, 매일 00:00 UTC 리셋)입니다.

기본 모델(Llama 3.3 70B fp8 fast, 입력 $0.29/M · 출력 $2.25/M) 기준으로
한 번의 대화가 입력 ~1,500토큰 + 출력 ~300토큰이면 약 $0.0011 →
**하루 약 100회 대화**가 무료 범위입니다. 개인 포트폴리오 트래픽에는 충분합니다.

한도를 넘기면 그날은 에러가 나고 다음 날 리셋됩니다(자동 과금 없음 — Workers 무료 플랜 기준).
더 여유가 필요하면 `wrangler.jsonc`의 `LLM_MODEL`을 `@cf/meta/llama-3.2-3b-instruct`로 낮추세요.

> 요금·한도 정책은 바뀔 수 있습니다. 실제 사용량은 Cloudflare 대시보드 → Workers AI 에서 확인하세요.

## 설정 값

`wrangler.jsonc` 의 `vars`:

| 변수 | 설명 |
|---|---|
| `KB_URL` | `data/kb.json` 의 공개 URL |
| `ALLOWED_ORIGINS` | 쉼표로 구분된 허용 오리진 |
| `LLM_MODEL` | 답변 생성 모델 ID |

`KB_URL`은 비밀값이 아니라 그냥 공개 URL이므로 `vars`에 둡니다.
나중에 진짜 비밀값(예: 외부 LLM API 키)이 필요해지면 `wrangler secret put NAME` 을 쓰세요 —
저장소가 아니라 Cloudflare에 저장됩니다.
