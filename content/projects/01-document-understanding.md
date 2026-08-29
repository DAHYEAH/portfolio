---
id: doc-understanding
title: 문서 이해 모델 개발
title_en: Document Understanding Model Development
category: work
org: 지란소프트
period: 2023.10 — 현재
role: AI 개발자 (모델 학습 · 추론 최적화)
tech: [Python, PyTorch, TensorRT, Triton Inference Server, OCR, TSR]
tags: [OCR, 문서이해, 표구조인식, 추론최적화, 어댑터, 데이터셋]
links: []
---

# 문서 이해 모델 개발

## 한 줄 요약
문서 이미지에서 텍스트와 표 구조를 읽어내는 OCR·TSR 모델을 학습하고, 실제 서비스에 태울 수 있도록 추론까지 최적화한 프로젝트.

## 배경 / 문제
문서 이미지를 기계가 읽으려면 (1) 글자를 정확히 읽고 (2) 표·레이아웃 구조를 이해해야 한다.
범용 OCR 모델은 실제 고객 문서(특정 서식, 특정 필체, 스캔 품질)에서 정확도가 떨어지고,
연구용 모델을 그대로 서비스에 올리면 추론 속도가 요구 수준을 못 맞춘다.

## 내가 한 일
- **OCR 모델 학습**: 문서 도메인 OCR 모델 학습 및 성능 개선
- **데이터셋 품질 개선**: 학습 데이터 정제/검수 파이프라인으로 라벨 품질 향상
- **사용자별 어댑터 학습**: 고객·문서 유형별 어댑터를 붙여 범용 모델을 개별 도메인에 적응
- **추론 최적화**: TensorRT로 모델 변환·경량화, Triton Inference Server로 서빙 구성
- **표 구조 인식 (TSR)**: 표의 행/열/셀 구조를 복원하는 모델 적용

## 사용 기술
Python · PyTorch · TensorRT · Triton Inference Server

## 성과
> 📝 채워넣기: 정확도 개선 수치(before → after), 추론 속도 개선 배수, 처리량(QPS), 적용된 제품/고객 수

## 배운 점 / 어려웠던 점
> 📝 채워넣기: 예) 데이터 품질이 모델 구조 개선보다 효과가 컸던 경험, TensorRT 변환 시 정확도 손실 트레이드오프 등
