---
id: satellite-segmentation
title: 위성 이미지 건물 영역 분할 (SW AI 경진대회 우수상)
title_en: Satellite Image Building Segmentation
category: competition
org: SW 중심대학 AI 경진대회 (DACON)
period: 2023.08
role: 데이터 전처리 · 모델 학습
award: SW 중심대학협의회장상 (우수상)
tech: [Python, UNet, Docker, Semantic Segmentation]
tags: [세그멘테이션, UNet, 위성이미지, 대회, 수상, DACON, 건물검출]
links:
  - label: Notion
    url: https://www.notion.so/DACON-2023-SW-AI-e23aaab8a2374c808740e206e5121fd0
---

# 위성 이미지 건물 영역 분할

## 한 줄 요약
위성 이미지에서 건물 영역을 픽셀 단위로 분할하는 대회. SW 중심대학협의회장상(우수상) 수상.

## 배경 / 문제
위성 이미지의 건물은 크기·밀도·그림자·해상도 편차가 크고, 배경 대비 건물 픽셀 비율이 낮아 클래스 불균형이 심하다.

## 내가 한 일
- 데이터 전처리 (타일링, 증강 등)
- Semantic Segmentation 모델(UNet) 학습
- Docker 기반 재현 가능한 학습 환경 구성

## 사용 기술
Python · UNet · Docker

## 성과
- **SW 중심대학 AI 경진대회 2023 — SW 중심대학협의회장상 (우수상)**
> 📝 채워넣기: 최종 순위, 평가 지표(Dice/IoU) 점수

## 배운 점 / 어려웠던 점
> 📝 채워넣기: 예) 클래스 불균형 손실함수, 증강 전략, 앙상블 여부
