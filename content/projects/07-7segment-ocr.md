---
id: seven-segment-ocr
title: 7-Segment 타입 숫자 OCR
title_en: 7-Segment Display OCR
category: academic
org: 국립한밭대학교
period: 2023.03 — 2023.05
role: 모델 학습 · 검출 파이프라인
tech: [Python, PARSeq, OpenCV, Flutter]
tags: [OCR, 7세그먼트, 엣지검출, PARSeq, OpenCV, 전산자동화]
links:
  - label: GitHub
    url: https://github.com/DAHYEAH/7SegmentProject
---

# 7-Segment 타입 숫자 OCR

## 한 줄 요약
돈사 전산 기입 자동화를 위해 7-Segment 디스플레이 숫자를 인식하는 OCR 모델을 학습하고, 모바일 카메라로 현황판을 찾아내는 파이프라인을 구성.

## 배경 / 문제
7-Segment 숫자는 일반 폰트와 형태가 달라 범용 OCR 모델이 잘 읽지 못한다.
또 사용자가 카메라로 찍으면 화면 안에서 현황판 위치를 먼저 찾아야 인식할 수 있다.

## 내가 한 일
- **7-Segment OCR 모델 학습** (PARSeq)
- **Edge Detection 기반 현황판 검출 파이프라인** 구성 (OpenCV)
- Flutter 앱에서 카메라 입력 처리

## 사용 기술
Python · PARSeq · OpenCV · Flutter

## 성과
> 📝 채워넣기: 인식 정확도, 학습 데이터 규모, 합성 데이터 사용 여부

## 배운 점 / 어려웠던 점
> 📝 채워넣기: 예) 7-Segment 학습 데이터 확보 방법, 조명/각도 변화 대응
