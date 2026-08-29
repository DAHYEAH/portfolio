# images/

`onerror` 폴백이 걸려 있어 **이미지가 없어도 사이트는 정상 동작**합니다.
없으면 그라디언트나 약어가 대신 보이고, 파일을 넣으면 자동으로 교체됩니다.
경로와 파일명만 맞추면 됩니다.

## 생성해야 할 이미지

| 파일 | 쓰이는 곳 | 권장 크기 | 없을 때 |
|---|---|---|---|
| `hero.png` | 히어로 배경 (챗봇 패널 뒤) | 2400×1400↑ 가로형 | 인디고 그라디언트 |
| `profile.png` | About 프로필 | 800×800 정사각 | 이니셜 `DL` |
| `proj-document-understanding.png` | 문서 이해 모델 | 1200×675 (16:9) | `DU` |
| `proj-rag.png` | RAG 파이프라인 | 1200×675 | `RAG` |
| `proj-document-parsing.png` | 문서 파싱 시스템 | 1200×675 | `DP` |
| `proj-watermarking.png` | 비가시적 워터마킹 | 1200×675 | `WM` |
| `proj-walking-robot.png` | 보행 로봇 제어 | 1200×675 | `RL` |
| `proj-psych.png` | 심리 성향 예측 | 1200×675 | `ML` |

## 이미 있는 것

| 파일 | 내용 |
|---|---|
| `proj-aruco.png` | ArUco 마커 검출 → 왜곡 보정 과정 |
| `proj-7segment.png` | 7-segment OCR 과정 (Edge Detection → OpenCV → CNN) |
| `proj-capstone.png` | 앱 ↔ 서버 풀스택 구조도 |
| `proj-satellite.png` | 위성 이미지 |

> ⚠️ 원래 파일명(`labproj` / `capstone` / `7segmentproj`)이 실제 내용과 어긋나 있어
> 내용 기준으로 이름을 바꿨습니다. **`proj-7segment` 와 `proj-capstone` 의 배치는
> 한 번 확인해 주세요** — 둘 다 7-segment 관련이라 그림만으로는 확실하지 않았습니다.
>
> `_` 로 시작하는 파일은 사용하지 않습니다.

## 히어로 이미지 주의사항

챗봇 패널이 그 위에 얹히고 **흰색 반투명 레이어(72~96%)가 덮입니다.** 따라서:

- 대비가 강한 이미지도 옅게 깔리니 **여백이 많은 쪽**이 잘 맞습니다
- 화면 **중앙은 챗봇에 가려지므로** 중요한 요소는 좌우나 위쪽에 두세요
- 액센트가 페리윙클 인디고(`#6C63F5`)라 **보라·청보라 계열**이 자연스럽게 붙습니다

프롬프트 예시:
> abstract soft gradient mesh, periwinkle indigo and lavender, subtle document
> and neural network motifs, generous negative space, light airy background,
> minimal, no text

## 프로젝트 썸네일 톤

카드가 2열로 커졌으니 **1200×675 (16:9)** 를 권합니다.
서로 다른 스타일이 섞이면 산만해지니 **한 가지 톤으로 통일**하세요 —
예: 옅은 배경 + 인디고 계열 도식, 또는 어두운 배경 + 네온 라인.
