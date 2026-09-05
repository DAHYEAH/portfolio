---
id: rag-pipeline
title: 검색 증강 생성 (RAG) 파이프라인
title_en: Retrieval-Augmented Generation (RAG)
category: work
org: 지란지교소프트
period: 2024.07 — 2024.10
role: AI 개발자 (RAG 파이프라인 설계·구현)
tech: [Python, LangChain, ChromaDB, FAISS, 한국어 임베딩 모델, FastAPI, OpenAI API]
tags: [RAG, LLM, 벡터DB, ChromaDB, FAISS, 한국어임베딩, 멀티쿼리, 유사도검색, 프롬프트엔지니어링, PDF, 문서QA]
links: []
---

# 검색 증강 생성 (RAG) 파이프라인

## 한 줄 요약
회사 내부 PDF 문서를 대상으로 질문하면 관련 내용을 검색해 근거와 함께 답하는 RAG 기반 사내 문서 Q&A 시스템을 구축.

## 배경 / 문제
LLM은 회사 내부 PDF 문서의 내용을 알지 못하고, 근거가 부족할 때 사실이 아닌 답을 생성할 수 있다.
사내 PDF를 검색 대상으로 구축하고 질문과 관련된 내용을 정확히 회수해 근거로 주입하는 것이 필요했다.
특히 한국어 질의의 표현 방식이 달라져도 적절한 문서 조각을 찾도록 검색 품질을 높이는 것이 핵심 과제였다.

## 내가 한 일
- **PDF 수집·청킹**: 회사 내부 PDF 문서를 검색 가능한 단위로 분할하는 파이프라인 구성
- **한국어 임베딩**: 한국어 임베딩 모델을 적용해 문서와 질문을 벡터화
- **벡터 DB 비교·적용**: ChromaDB와 FAISS를 이용한 검색 파이프라인 구성 및 비교
- **검색 품질 개선 실험**: 하나의 질문을 여러 관점의 질의로 확장하는 LangChain MultiQuery Retriever 적용
- **유사도 검색 실험**: 유사도 측정 방식을 변경하며 질문과 관련된 문서의 검색 품질 비교
- **프롬프트 엔지니어링**: 회수한 근거를 넣어 답변하게 하는 프롬프트 설계, 근거 없을 때 모른다고 답하도록 제약
- **API 서빙**: FastAPI로 질의응답 API 구성

## 사용 기술
Python · LangChain · ChromaDB · FAISS · 한국어 임베딩 모델 · FastAPI · OpenAI API

## 성과
회사 내부 PDF를 대상으로 한 한국어 문서 검색·질의응답 파이프라인을 구현했다.
단일 검색 설정에 머무르지 않고 ChromaDB·FAISS, MultiQuery Retriever, 여러 유사도 측정 방식을 적용하고 비교하며 검색 품질을 개선했다.

## 배운 점 / 어려웠던 점
사용자의 질문 표현과 문서에 쓰인 표현이 다르면 단순 유사도 검색만으로 관련 근거를 놓칠 수 있다는 점이 어려웠다.
한국어 임베딩 모델을 활용하고 MultiQuery Retriever로 질문을 확장하는 한편, 벡터 DB와 유사도 측정 방식을 다양하게 바꾸어 검색 결과를 비교했다.
