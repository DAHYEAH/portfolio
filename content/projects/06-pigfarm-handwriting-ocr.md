---
id: pigfarm-capstone
title: 7-segment 기반 돈사 현황판 수기 숫자 OCR 앱
title_en: 7-Segment-based Pig Farm Status Board Handwritten Digit OCR App
category: academic
org: 국립한밭대학교 캡스톤디자인
period: 2023.01 — 2023.12
role: 서버 구축 · 백엔드 · 앱 개발 · 검출 알고리즘
tech: [Python, PyTorch, Flask, Flutter, AWS]
tags: [OCR, 수기인식, 손글씨, 캡스톤, 돈사, 7-segment, 풀스택, 검출영역분리]
links:
  - label: GitHub
    url: https://github.com/HBNU-SWUNIV/come-capstone23-accuracy100
---

# 7-segment 기반 돈사 현황판 수기 숫자 OCR 앱

## 한 줄 요약
돈사 현황판에 손으로 쓴 숫자를 카메라로 찍어 자동 전산화하는 앱. 서버·백엔드·앱까지 풀스택으로 구현.

## 배경 / 문제
농장에서는 외국인 노동자를 포함한 여러 작업자가 현황판에 숫자를 손으로 기록하고, 이를 사람이 다시 컴퓨터에 옮겨 적는다.
작성자마다 필체가 달라 인식 난도가 높고, 수기 숫자가 칸을 넘나들며 겹쳐 쓰이면 검출 영역의 중복으로 인식이 틀어진다.
이 프로젝트는 다양한 수기체의 인식률을 높이고, 인식 결과를 DB에 자동 입력해 반복적인 전산 업무를 자동화하는 것을 목표로 했다.
또한 모바일 촬영 과정에서 발생하는 기울어짐과 원근 왜곡을 보정해야 했다.

## 내가 한 일
- **수기 숫자 검출영역 중복 분리 알고리즘 개발** (핵심 기여)
- 다양한 작업자의 수기 숫자를 인식할 수 있도록 OCR 데이터와 인식 과정 개선
- Edge Detection과 ArUco Marker를 활용한 현황판 영역 검출 및 촬영 왜곡 보정
- OCR 결과를 DB에 자동 입력하는 업무 자동화 흐름 구현
- 서버 구축 (AWS)
- 백엔드 개발 (Flask)
- Flutter 모바일 앱 개발

## 사용 기술
Python · PyTorch · Flask · Flutter · AWS

## 성과
모바일에서 현황판을 촬영하면 수기 숫자를 인식하고 결과를 DB에 자동 저장하는 end-to-end 시스템을 구현했다.
현장 기록의 수기 입력부터 전산 등록까지 이어지던 반복 업무를 자동화할 수 있는 형태로 완성했다.

## 배운 점 / 어려웠던 점
작성자마다 다른 필체와 셀 경계를 넘어 겹치는 숫자를 안정적으로 인식하는 것이 가장 어려웠다.
OCR 모델만 개선하는 데 그치지 않고 촬영 왜곡 보정, 검출영역 분리, 모바일 앱과 DB 연동까지 전체 파이프라인 관점에서 문제를 해결했다.
