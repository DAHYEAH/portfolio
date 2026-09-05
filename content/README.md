# content/ — 포트폴리오 지식 베이스

챗봇(RAG)의 원본 소스이자, 포트폴리오 페이지 내용의 단일 진실 공급원(single source of truth).
사람이 읽기 좋고, 기계가 청킹하기 좋은 형태로 유지합니다.

## 구조

```
content/
├── README.md            ← 이 파일 (인덱스)
├── profile.md           ← 소개 · 연락처 · 수상/자격 요약
├── experience.md        ← 경력 · 학부 연구 · 학력
├── skills.md            ← 기술 스택
├── publications.md      ← 논문 · 수상
└── projects/
    ├── 01-document-understanding.md   지란지교소프트 · 2023.10–현재
    ├── 02-rag-pipeline.md             지란지교소프트 · 2024.07–2024.10
    ├── 03-document-parsing.md         지란지교소프트 · 2026.01–현재
    ├── 04-invisible-watermarking.md   지란지교소프트 · 2026.06–현재
    ├── 06-pigfarm-handwriting-ocr.md  캡스톤 · 2023.01–2023.12
    ├── 08-aruco-ocr-app.md            지팜 산학 · 2022.01–2022.12
    ├── 09-satellite-segmentation.md   대회 수상 · 2023.08
    └── 10-psychological-prediction.md 대회 · 2022.08
```

## 작성 규칙

각 프로젝트 파일은 **YAML frontmatter + 고정된 섹션 순서**를 지킵니다.
챗봇이 메타데이터로 필터링하고 섹션 단위로 청킹할 수 있게 하기 위함입니다.

```yaml
---
id: 고유 식별자 (kebab-case)
title: 한글 제목
title_en: 영문 제목
category: work | academic | competition | publication | profile
org: 소속
period: YYYY.MM — YYYY.MM
role: 내 역할
award: (있을 때만)
tech: [기술, 목록]
tags: [검색용, 키워드]
links: [{label, url}]
---
```

본문 섹션 순서: `한 줄 요약` → `배경 / 문제` → `내가 한 일` → `사용 기술` → `성과` → `배운 점 / 어려웠던 점`

## 📝 채워넣어야 할 것

`> 📝 채워넣기:` 로 표시된 부분은 사이트에 없던 정보라 비워뒀습니다.
**지어내지 않고 비워둔 것**이므로, 직접 채워야 챗봇이 그 질문에 답할 수 있습니다.
특히 면접에서 자주 묻는 것들입니다:

- 정량 성과 (정확도 %, 속도 개선 배수, 처리 규모)
- 기술 선택 이유 (왜 FAISS인지, 왜 PARSeq인지)
- 어려웠던 점과 해결 과정
- 회사 프로젝트는 **공개 가능한 범위**로만 — 사내 지표/고객명은 제외

## 챗봇 연동 시 주의

- 이 폴더는 GitHub Pages로 **공개 배포**됩니다. 비공개 정보를 넣지 마세요.
- 회사 프로젝트 세부 수치는 대외 공개 가능 여부를 먼저 확인하세요.
