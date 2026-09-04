---
id: psych-prediction
title: 심리 성향 예측
title_en: Psychological Tendency Prediction
category: competition
org: SW 중심대학 AI 경진대회
period: 2022.08
role: 데이터 분석 · 모델링
tech: [Python, RandomForest, Ensemble, Google Colab]
tags: [머신러닝, 앙상블, 랜덤포레스트, 정형데이터, 대회, 심리, 선거, 투표, MACH-IV, TIPI, 설문]
links:
  - label: GitHub
    url: https://github.com/DAHYEAH/SW_AI_CONTEST
---

# 심리 성향 예측

## 한 줄 요약
심리학 설문 응답으로 **국가 선거 투표자와 미투표자의 심리 성향**을 예측하는 앙상블 모델 개발. (2022 SW AI 경진대회 예선)

## 배경 / 문제
심리학 테스트가 다루는 범주가 넓어지면서, 그 영역의 데이터를 어떻게 분석할지가 과제가 됐다.
대회 주제는 그중 **선거 투표 여부와 심리 성향의 관계**로, 설문 응답만으로 투표자/미투표자를 구분하는 문제였다.
설문 기반 정형 데이터는 결측·응답 편향이 많고, 변수 간 상관이 커서 단일 모델로는 일반화가 잘 안 된다.

## 데이터 구성
- **MACH-IV 마키아벨리즘 척도 (Q1–Q26)** — "필요할 때가 아니면 진짜 이유를 말하지 마라",
  "사람을 다루는 최선의 방법은 듣고 싶어 하는 말을 해주는 것" 같은 진술문에 대한 동의 정도
- **TIPI (Ten-Item Personality Inventory, TIPI1–10)** — Big Five 성격 5요인(외향성·친화성·성실성·
  정서적 안정성·개방성)을 7점 리커트 척도로 측정
- **VCL (어휘 체크리스트, VCL1–16)** — 뜻을 확실히 아는 단어 체크. `florted`, `verdid` 처럼
  실재하지 않는 단어가 섞여 있어 **과잉 응답(부정직한 응답) 탐지 지표**로 쓸 수 있다
- **응답 소요 시간** — introelapse / testelapse / surveyelapse (초 단위). 성의 없는 응답 판별에 유용
- **country** — 응답자의 네트워크 위치

## 내가 한 일
- 심리학 테스트 데이터 탐색 및 전처리
- RandomForest 기반 앙상블 알고리즘 구성
- Google Colab 환경에서 실험

## 사용 기술
Python · RandomForest · 앙상블 · Google Colab

## 성과
> 📝 채워넣기: 예선 성적, 평가 지표 점수, 피처 엔지니어링에서 효과 있었던 것
