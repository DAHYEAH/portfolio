---
id: aruco-ocr
title: ArUco 마커 기반 현황판 OCR 앱
title_en: ArUco Marker + OCR Status Board App
category: academic
org: 국립한밭대학교 DfX Lab 연구실 프로젝트 (지팜 산학)
period: 2022.01 — 2022.12
role: 표 검출 · OCR · 앱 개발
tech: [Python, Flask, OpenCV, PyTorch, ArUco]
tags: [OCR, ArUco, 마커, 표검출, 수기인식, 연구실 프로젝트, 국내 논문, KKITS]
links:
  - label: GitHub
    url: https://github.com/DAHYEAAAH/OCR
  - label: 논문 PDF
    url: files/kkits2023-pigfarm-aruco-ocr.pdf
---

# ArUco 마커 기반 현황판 OCR 앱

## 한 줄 요약
ArUco 마커로 현황판의 표 영역을 정확히 잡아내고, 그 안의 수기 문자를 OCR로 인식하는 앱. KKITS 2023 논문으로 발표.

## 배경 / 문제
카메라로 찍은 현황판은 각도가 기울고 왜곡되어 표의 셀 위치를 정확히 잡기 어렵다.
현황판 네 귀퉁이에 ArUco 마커를 붙이면 기준점이 생겨 원근 보정과 표 영역 추출이 안정적으로 된다.
모바일 환경에서 촬영된 이미지를 처리해야 했기 때문에 Edge Detection도 함께 적용해 현황판과 표 경계를 찾고 촬영 왜곡을 보정했다.

## 내가 한 일
- ArUco 마커 기반 표 영역 검출 및 원근 보정
- Edge Detection을 결합한 모바일 촬영 이미지의 경계 검출
- 셀 단위 분할 후 수기 문자 OCR 인식
- 다양한 작업자의 필체를 고려한 수기 숫자 인식 개선
- Flask 백엔드 + 앱 연동
- 인식 결과의 DB 자동 입력을 통한 현장 기록 전산화
- **KKITS 2023 논문 제1저자**: 프로젝트 개발과 논문 작성을 주도하고 학술대회에서 직접 발표

## 사용 기술
Python · Flask · OpenCV · PyTorch · ArUco 마커

## 관련 논문
ArUco 마커와 OCR을 이용한 돈사 현황판 표 검출 및 수기 문자 인식 앱 개발 (KKITS 2023)
이다혜, 신유정, 안희진, 마하나로, 이인규, 이현빈
논문 전문 PDF: files/kkits2023-pigfarm-aruco-ocr.pdf (사이트에서 바로 열람/다운로드 가능)

## 성과
모바일 촬영부터 왜곡 보정, 표·셀 검출, 수기 문자 인식, DB 입력까지 연결되는 현장 업무 자동화 방식을 구현했다.
연구 결과를 국내 학술대회 논문으로 발표했으며, 제1저자로 개발과 논문 작성을 주도하고 발표까지 직접 진행해 융복합우수논문상을 수상했다.
