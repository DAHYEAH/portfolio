---
id: aruco-ocr
title: ArUco 마커 기반 현황판 OCR 앱
title_en: ArUco Marker + OCR Status Board App
category: academic
org: 지팜 (농업법인) 산학 프로젝트
period: 2022.01 — 2022.12
role: 표 검출 · OCR · 앱 개발
tech: [Python, Flask, OpenCV, PyTorch, ArUco]
tags: [OCR, ArUco, 마커, 표검출, 수기인식, 논문, KKITS]
links:
  - label: GitHub
    url: https://github.com/DAHYEAAAH/OCR
---

# ArUco 마커 기반 현황판 OCR 앱

## 한 줄 요약
ArUco 마커로 현황판의 표 영역을 정확히 잡아내고, 그 안의 수기 문자를 OCR로 인식하는 앱. KKITS 2023 논문으로 발표.

## 배경 / 문제
카메라로 찍은 현황판은 각도가 기울고 왜곡되어 표의 셀 위치를 정확히 잡기 어렵다.
현황판 네 귀퉁이에 ArUco 마커를 붙이면 기준점이 생겨 원근 보정과 표 영역 추출이 안정적으로 된다.

## 내가 한 일
- ArUco 마커 기반 표 영역 검출 및 원근 보정
- 셀 단위 분할 후 수기 문자 OCR 인식
- Flask 백엔드 + 앱 연동
- **KKITS 2023 논문 제1저자**

## 사용 기술
Python · Flask · OpenCV · PyTorch · ArUco 마커

## 관련 논문
ArUco 마커와 OCR을 이용한 돈사 현황판 표 추출 및 수기 문자 인식 앱 개발 (KKITS 2023)
이다혜, 신유정, 안희진, 마하나로, 이인규, 이현빈

## 성과
> 📝 채워넣기: 표 검출 성공률, 문자 인식 정확도, 실제 농장 적용 여부
