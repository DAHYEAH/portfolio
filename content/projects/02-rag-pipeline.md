---
id: rag-pipeline
title: 검색 증강 생성 (RAG) 파이프라인
title_en: Retrieval-Augmented Generation (RAG)
category: work
org: 지란소프트
period: 2024.07 — 2024.10
role: AI 개발자 (RAG 파이프라인 설계·구현)
tech: [Python, LangChain, FAISS, FastAPI, OpenAI API]
tags: [RAG, LLM, 벡터DB, FAISS, 임베딩, 프롬프트엔지니어링, 문서QA]
links: []
---

# 검색 증강 생성 (RAG) 파이프라인

## 한 줄 요약
기업 내부 문서를 대상으로 질문하면 근거와 함께 답하는 RAG 기반 문서 Q&A 시스템을 end-to-end로 구축.

## 배경 / 문제
LLM은 사내 문서 내용을 모르고, 모르는 것을 그럴듯하게 지어낸다(할루시네이션).
사내 문서를 검색해 근거로 주입해야 실무에서 쓸 수 있는 답변이 나온다.

## 내가 한 일
- **문서 수집·청킹**: 문서를 검색 단위로 분할하는 청킹 전략 설계
- **임베딩 & 벡터 DB**: 임베딩 모델로 벡터화하고 FAISS 인덱스 구축
- **검색(Retrieval)**: 질의 임베딩 기반 유사도 검색으로 관련 청크 상위 K개 회수
- **프롬프트 엔지니어링**: 회수한 근거를 넣어 답변하게 하는 프롬프트 설계, 근거 없을 때 모른다고 답하도록 제약
- **API 서빙**: FastAPI로 질의응답 API 구성

## 사용 기술
Python · LangChain · FAISS · FastAPI · OpenAI API

## 성과
> 📝 채워넣기: 답변 정확도/만족도 평가 방식과 결과, 처리 문서 규모, 응답 지연시간

## 배운 점 / 어려웠던 점
> 📝 채워넣기: 예) 청킹 크기/오버랩이 검색 품질에 미친 영향, 한국어 임베딩 모델 선택 기준, 검색 실패 케이스 대응
