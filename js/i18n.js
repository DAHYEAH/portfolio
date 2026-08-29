/* =====================================================
   i18n — 한/영 번역 데이터 및 언어 토글
   언어 추가 시 translations 객체에 새 key 추가
   ===================================================== */

const translations = {
  en: {
    /* NAV */
    "nav.about":      "About",
    "nav.experience": "Experience",
    "nav.projects":   "Projects",
    "nav.skills":     "Skills",
    "nav.contact":    "Contact",

    /* HERO */
    "hero.eyebrow":      "AI Developer · JiranSoft",
    "hero.subtitle":     "Building intelligent document AI systems — OCR, RAG, document parsing, and watermarking from research to production.",
    "hero.cta.projects": "View Projects",

    /* ABOUT */
    "section.about":     "About",
    "about.title":       "Who I Am",
    "about.bio":         "AI researcher and developer at JiranSoft, working on document understanding, OCR, and Large Language Models. I'm passionate about applying NLP and Vision Language Models to real-world document AI problems.",
    "about.email.label": "Email",
    "about.award.label": "Awards",
    "about.award.value": "SW AI Competition 2023 — Excellence Award · Academic Excellence Scholarship (2020–2023)",
    "about.paper.label": "Publication",
    "about.paper.value": "KKITS 2023 — Table Extraction & OCR on Pig Farm Status Boards",
    "about.qual.label":  "Certifications",
    "about.qual.value":  "AICE Professional · Engineer Information Processing · TOEIC 820",

    /* EXPERIENCE */
    "section.experience":    "Experience",
    "experience.title":      "Work Experience",
    "exp.company":           "JiranSoft (formerly JiranData)",
    "exp.role":              "AI Developer · AI Research Team",
    "exp.desc":              "AI R&D focused on document intelligence: OCR, Table Structure Recognition, RAG, document parsing, and invisible image watermarking.",
    "exp.proj1.name":        "Document Understanding Model",
    "exp.proj1.detail":      "OCR model training, dataset quality improvement, user-specific adapter, inference optimization (TensorRT / Triton), Table Structure Recognition (TSR)",
    "exp.proj2.name":        "Retrieval-Augmented Generation (RAG)",
    "exp.proj2.detail":      "RAG pipeline, vector database (FAISS), prompt engineering, embedding",
    "exp.proj3.name":        "Document Parsing",
    "exp.proj3.detail":      "OOXML, PDF, Hancom Docs, ODT parsing · de-identification · document reconstruction",
    "exp.proj4.name":        "Invisible Image Watermarking",
    "exp.proj4.detail":      "Frequency-domain watermarking · image transformation robustness",

    /* ACADEMIC PROJECTS */
    "section.academic":      "Academic Projects",
    "academic.title":        "External Research Projects",
    "acad1.company":         "Gfarm (agricultural corporation)",
    "acad1.role":            "OCR-based Pig Farm Status Board Recognition & DB Update System",
    "acad1.desc":            "OCR pipeline for pig farm status boards, mobile app, and database/API server.",
    "acad2.company":         "U-RE, Korea",
    "acad2.role":            "Walking Robot Stability Control Algorithm",
    "acad2.desc":            "Simulation-based reinforcement learning control algorithm for walking robot stability. Object detection with YOLO.",

    /* EDUCATION */
    "section.education": "Education",
    "edu.name":          "Hanbat National University",
    "edu.degree":        "B.S. in Computer Engineering · Advisor: Prof. Hyunbean Yi",

    /* PROJECTS — JIRANSOFT */
    "section.jiransoft":  "JiranSoft Projects",
    "jiransoft.title":    "Work Projects",
    "jp1.period":         "2023.10 — Present",
    "jp1.title":          "Document Understanding Model Development",
    "jp1.desc":           "OCR model training & dataset quality improvement, user-specific adapter, inference optimization with TensorRT/Triton, Table Structure Recognition (TSR).",
    "jp2.period":         "2024.07 — 2024.10",
    "jp2.title":          "Retrieval-Augmented Generation (RAG)",
    "jp2.desc":           "End-to-end RAG pipeline with vector database (FAISS), prompt engineering, and embedding for enterprise document Q&A.",
    "jp3.period":         "2026.01 — Present",
    "jp3.title":          "Document Parsing System",
    "jp3.desc":           "Multi-format document parsing (OOXML, PDF, Hancom Docs, ODT), de-identification via OCR + Regex, document reconstruction.",
    "jp4.period":         "2026.06 — Present",
    "jp4.title":          "Invisible Image Watermarking",
    "jp4.desc":           "Frequency-domain watermarking with robustness against image transformation attacks.",

    /* PROJECTS — ACADEMIC */
    "section.projects":  "Academic Projects",
    "projects.title":    "University Projects",
    "proj0.period":      "2023.03 — 2023.09 · U-RE, Korea",
    "proj0.title":       "Walking Robot Stability Control Algorithm",
    "proj0.desc":        "Simulation-based reinforcement learning control algorithm for walking stability. Object detection with YOLO.",
    "proj1.period":      "2023.01 — 2023.12 · Capstone",
    "proj1.title":       "Pig Farm Status Board Handwritten OCR App",
    "proj1.desc":        "Algorithm to separate overlapping handwritten digit detection regions. Full-stack: server, backend, and Flutter app.",
    "proj2.period":      "2023.03 — 2023.05",
    "proj2.title":       "7-Segment Display OCR",
    "proj2.desc":        "OCR model for 7-segment numeric displays. Edge detection pipeline to locate status boards via mobile camera.",
    "proj3.period":      "2022.01 — 2022.12",
    "proj3.title":       "ArUco Marker + OCR Status Board App",
    "proj3.desc":        "Table detection and handwritten text recognition from pig farm boards using ArUco markers and OCR.",

    /* COMPETITIONS */
    "section.contests":  "Competitions",
    "contests.title":    "AI Competitions",
    "contest1.period":   "2023.08 · SW AI Competition (DACON)",
    "contest1.title":    "Satellite Image Building Segmentation",
    "contest1.desc":     "Building area segmentation from satellite imagery. Data preprocessing and semantic segmentation model training.",
    "contest2.period":   "2022.08 · SW AI Competition — Preliminary",
    "contest2.title":    "Psychological Tendency Prediction",
    "contest2.desc":     "Ensemble algorithm to predict psychological tendencies from psychometric test data.",

    /* PUBLICATION */
    "section.publication": "Publication",
    "pub1.venue":          "KKITS 2023",
    "pub1.title":          "Development of an Application for Table Extraction and Handwritten Character Recognition on Pig Farm Status Boards Using ArUco Marker and OCR",
    "pub1.authors":        "Dahye Lee, Yujeong Shin, Heejin Ahn, Hanaro Ma, Ingyu Lee, Hyunbean Yi",

    /* SKILLS */
    "section.skills":    "Skills",
    "skills.title":      "Technical Skills",
    "skills.ai":         "AI / ML",
    "skills.lang":       "Languages",
    "skills.infra":      "Backend / Infra",
    "skills.mobile":     "Mobile",
    "skills.cert":       "Certifications",

    /* CONTACT */
    "section.contact":   "Contact",
    "contact.title":     "Get in Touch",
    "contact.heading":   "Let's connect",
    "contact.desc":      "Interested in collaboration, research opportunities, or just want to chat about AI? Feel free to reach out anytime.",
    "contact.send":      "Send Message",
    "hero.scroll":       "Scroll",
    "contest1.award":    "Excellence Award",
    "contact.ph.email":  "Your email",
    "contact.ph.message":"Your message",
    "footer.note":       "Built as a static site with a RAG chatbot on Cloudflare Workers.",
  },

  ko: {
    /* NAV */
    "nav.about":      "소개",
    "nav.experience": "경력",
    "nav.projects":   "프로젝트",
    "nav.skills":     "스킬",
    "nav.contact":    "연락",

    /* HERO */
    "hero.eyebrow":      "AI 개발자 · 지란소프트",
    "hero.subtitle":     "OCR, RAG, 문서 파싱, 워터마킹까지 — 연구부터 실서비스까지 문서 AI 시스템을 만듭니다.",
    "hero.cta.projects": "프로젝트 보기",

    /* ABOUT */
    "section.about":     "소개",
    "about.title":       "이다혜입니다",
    "about.bio":         "지란소프트 AI 연구팀에서 문서 이해, OCR, LLM을 연구개발하고 있습니다. NLP와 Vision Language Model을 실제 문서 AI 문제에 적용하는 것에 열정을 가지고 있습니다.",
    "about.email.label": "이메일",
    "about.award.label": "수상",
    "about.award.value": "SW 중심대학 AI 경진대회 2023 — SW 중심대학협의회장상 · 학업우수장학금 (2020–2023)",
    "about.paper.label": "논문",
    "about.paper.value": "KKITS 2023 — 돈사 현황판 표 추출 및 수기 문자 인식",
    "about.qual.label":  "자격증",
    "about.qual.value":  "AICE Professional · 정보처리기사 · TOEIC 820",

    /* EXPERIENCE */
    "section.experience":    "경력",
    "experience.title":      "경력 사항",
    "exp.company":           "지란소프트 (구 지란지교데이터)",
    "exp.role":              "AI 개발자 · AI 연구팀",
    "exp.desc":              "문서 지능 AI 연구개발: OCR, 표 구조 인식, RAG, 문서 파싱, 비가시적 이미지 워터마킹.",
    "exp.proj1.name":        "문서 이해 모델 개발",
    "exp.proj1.detail":      "OCR 모델 학습, 데이터셋 품질 개선, 사용자별 어댑터 학습, 추론 최적화 (TensorRT / Triton), 표 구조 인식 (TSR)",
    "exp.proj2.name":        "검색 증강 생성 (RAG)",
    "exp.proj2.detail":      "RAG 파이프라인, 벡터 DB (FAISS), 프롬프트 엔지니어링, 임베딩",
    "exp.proj3.name":        "문서 파싱",
    "exp.proj3.detail":      "OOXML, PDF, 한컴 문서, ODT 파싱 · 비식별화 · 문서 재구성",
    "exp.proj4.name":        "비가시적 이미지 워터마킹",
    "exp.proj4.detail":      "주파수 도메인 워터마킹 · 이미지 변환 강건성",

    /* ACADEMIC PROJECTS */
    "section.academic":      "학부 연구 프로젝트",
    "academic.title":        "외부 연구 프로젝트",
    "acad1.company":         "지팜 (농업법인)",
    "acad1.role":            "돈사 현황판 OCR 인식 및 DB 자동 업데이트 시스템",
    "acad1.desc":            "돈사 현황판 OCR 파이프라인, 모바일 앱, DB 및 API 서버 개발.",
    "acad2.company":         "유알이 (U-RE), 한국",
    "acad2.role":            "보행 로봇 안정성 제어 알고리즘",
    "acad2.desc":            "보행 로봇 안정성을 위한 시뮬레이션 기반 강화학습 제어 알고리즘 개발. YOLO 객체 탐지 활용.",

    /* EDUCATION */
    "section.education": "학력",
    "edu.name":          "국립한밭대학교",
    "edu.degree":        "컴퓨터공학과 학사 · 지도교수: 이현빈",

    /* PROJECTS — JIRANSOFT */
    "section.jiransoft":  "지란소프트 프로젝트",
    "jiransoft.title":    "업무 프로젝트",
    "jp1.period":         "2023.10 — 현재",
    "jp1.title":          "문서 이해 모델 개발",
    "jp1.desc":           "OCR 모델 학습 및 데이터셋 품질 개선, 사용자별 어댑터 학습, TensorRT/Triton 추론 최적화, 표 구조 인식 (TSR).",
    "jp2.period":         "2024.07 — 2024.10",
    "jp2.title":          "검색 증강 생성 (RAG)",
    "jp2.desc":           "벡터 DB(FAISS) 기반 RAG 파이프라인, 프롬프트 엔지니어링, 임베딩을 활용한 기업 문서 Q&A 시스템.",
    "jp3.period":         "2026.01 — 현재",
    "jp3.title":          "문서 파싱 시스템",
    "jp3.desc":           "다양한 포맷(OOXML, PDF, 한컴, ODT) 문서 파싱, OCR+Regex 기반 비식별화, 문서 재구성.",
    "jp4.period":         "2026.06 — 현재",
    "jp4.title":          "비가시적 이미지 워터마킹",
    "jp4.desc":           "주파수 도메인 기반 워터마킹 및 이미지 변환 공격에 대한 강건성 연구.",

    /* PROJECTS — ACADEMIC */
    "section.projects":  "학부 프로젝트",
    "projects.title":    "대학교 프로젝트",
    "proj0.period":      "2023.03 — 2023.09 · 유알이 (U-RE), 한국",
    "proj0.title":       "보행 로봇 안정성 제어 알고리즘",
    "proj0.desc":        "보행 로봇 안정성을 위한 시뮬레이션 기반 강화학습 제어 알고리즘. YOLO 객체 탐지 적용.",
    "proj1.period":      "2023.01 — 2023.12 · 캡스톤",
    "proj1.title":       "돈사 현황판 수기 숫자 OCR 앱",
    "proj1.desc":        "수기숫자 검출영역 중복 분리 알고리즘 개발. 서버구축 및 백엔드·앱 담당.",
    "proj2.period":      "2023.03 — 2023.05",
    "proj2.title":       "7-Segment 타입 숫자 OCR",
    "proj2.desc":        "돈사 전산기입 자동화를 위한 7-Segment OCR 모델 학습. Edge Detection으로 현황판 검출.",
    "proj3.period":      "2022.01 — 2022.12",
    "proj3.title":       "ArUco 마커 기반 현황판 OCR 앱",
    "proj3.desc":        "ArUco 마커와 OCR을 이용한 돈사 현황판 표 검출 및 수기 문자 인식 앱 개발.",

    /* COMPETITIONS */
    "section.contests":  "대회",
    "contests.title":    "AI 경진대회",
    "contest1.period":   "2023.08 · SW AI 경진대회 (DACON)",
    "contest1.title":    "위성 이미지 건물 영역 분할",
    "contest1.desc":     "위성 이미지에서 건물 영역 분할. 데이터 전처리 및 Semantic Segmentation 모델 학습.",
    "contest2.period":   "2022.08 · SW AI 경진대회 — 예선",
    "contest2.title":    "심리 성향 예측",
    "contest2.desc":     "심리학 테스트 데이터 분석 및 심리 성향 예측 앙상블 알고리즘 개발.",

    /* PUBLICATION */
    "section.publication": "논문",
    "pub1.venue":          "KKITS 2023",
    "pub1.title":          "ArUco 마커와 OCR을 이용한 돈사 현황판 표 추출 및 수기 문자 인식 앱 개발",
    "pub1.authors":        "이다혜, 신유정, 안희진, 마하나로, 이인규, 이현빈",

    /* SKILLS */
    "section.skills":    "스킬",
    "skills.title":      "기술 스택",
    "skills.ai":         "AI / ML",
    "skills.lang":       "프로그래밍 언어",
    "skills.infra":      "백엔드 / 인프라",
    "skills.mobile":     "모바일",
    "skills.cert":       "자격증",

    /* CONTACT */
    "section.contact":   "연락",
    "contact.title":     "연락하기",
    "contact.heading":   "함께 이야기해요",
    "contact.desc":      "협업, 연구 관련 문의, 혹은 AI에 대해 이야기 나누고 싶으시다면 편하게 연락주세요.",
    "contact.send":      "메시지 보내기",
    "hero.scroll":       "아래로",
    "contest1.award":    "SW중심대학협의회장상",
    "contact.ph.email":  "이메일 주소",
    "contact.ph.message":"메시지를 남겨주세요",
    "footer.note":       "정적 사이트 + Cloudflare Workers 기반 RAG 챗봇으로 만들었습니다.",
  }
};

/* ── 언어 적용 ── */
function setLang(lang) {
  localStorage.setItem('lang', lang);
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-ko').classList.toggle('active', lang === 'ko');
  document.documentElement.lang = lang;

  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // input/textarea 의 placeholder 도 함께 번역한다
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });
}

/* ── 페이지 로드 시 저장된 언어 적용 ── */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'en';
  setLang(saved);
});
