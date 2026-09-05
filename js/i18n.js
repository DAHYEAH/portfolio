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
    "hero.eyebrow":      "AI Developer · JiranJigyoSoft",
    "hero.subtitle":     "Building intelligent document AI systems — OCR, RAG, document parsing, and watermarking from research to production.",
    "hero.cta.projects": "View Projects",

    /* ABOUT */
    "section.about":     "About",
    "about.title":       "Who I Am",
    "about.bio":         "AI researcher and developer at JiranJigyoSoft, working on document understanding, OCR, and Large Language Models. I'm passionate about applying NLP and Vision Language Models to real-world document AI problems.",
    "about.email.label": "Email",
    "about.award.label": "Awards",
    "about.award.value": "SW AI Competition 2023 — Excellence Award · Academic Excellence Scholarship (2020–2023)",
    "about.paper.label": "Publication",
    "about.paper.value": "KKITS 2023 — Table Extraction & OCR on Pig Farm Status Boards",
    "about.qual.label":  "Certifications",
    "about.qual.value":  "AICE Professional · Engineer Information Processing · TOEIC 820 · TOEIC Speaking IH",

    /* EXPERIENCE */
    "section.experience":    "Experience",
    "experience.title":      "Work Experience",
    "exp.company":           "JiranJigyoSoft (formerly JiranData)",
    "exp.role":              "AI Developer · AI Research Team",
    "exp.desc":              "AI R&D focused on document intelligence: OCR, Table Structure Recognition, RAG, document parsing, and invisible image watermarking.",
    "exp.proj1.name":        "Document Understanding Model",
    "exp.proj1.detail":      "OCR model training, dataset quality improvement, user-specific adapter, inference optimization (TensorRT / Triton), Table Structure Recognition (TSR)",
    "exp.proj2.name":        "Retrieval-Augmented Generation (RAG)",
    "exp.proj2.detail":      "Internal PDF RAG pipeline, Korean embeddings, ChromaDB/FAISS, MultiQuery Retriever",
    "exp.proj3.name":        "Document Parsing",
    "exp.proj3.detail":      "OOXML, PDF, Hancom Docs, ODT parsing · de-identification · document reconstruction",
    "exp.proj4.name":        "Invisible Image Watermarking",
    "exp.proj4.detail":      "Frequency-domain watermarking · image transformation robustness",

    /* ACADEMIC PROJECTS */
    "section.academic":      "Academic Projects",
    "academic.title":        "External Research Projects",
    "acad1.company":         "Hanbat National University DfX Lab",
    "acad1.role":            "Undergraduate Researcher · OCR Research",
    "acad1.desc":            "Developed a pig farm status-board OCR system, won a DACON competition award, and presented a first-author paper at the KKITS 2023 Spring Conference.",

    /* EDUCATION */
    "section.education": "Education",
    "edu.name":          "Hanbat National University",
    "edu.degree":        "B.S. in Computer Engineering · Advisor: Prof. Hyunbean Yi",

    /* PROJECTS — JIRANSOFT */
    "section.jiransoft":  "JiranJigyoSoft Projects",
    "jiransoft.title":    "Work Projects",
    "jp1.period":         "2023.10 — Present",
    "jp1.title":          "Document Understanding Model Development",
    "jp1.desc":           "OCR model training & dataset quality improvement, user-specific adapter, inference optimization with TensorRT/Triton, Table Structure Recognition (TSR).",
    "jp2.period":         "2024.07 — 2024.10",
    "jp2.title":          "Retrieval-Augmented Generation (RAG)",
    "jp2.desc":           "RAG pipeline for internal PDFs using Korean embeddings, ChromaDB/FAISS, MultiQuery Retriever, and similarity-search experiments.",
    "jp3.period":         "2026.01 — Present",
    "jp3.title":          "Document Parsing System",
    "jp3.desc":           "Format-specific parsing for OOXML, PDF, Hancom Docs, and ODT, with OCR/Regex de-identification and layout-preserving reconstruction.",
    "jp4.period":         "2026.06 — Present",
    "jp4.title":          "Invisible Image Watermarking",
    "jp4.desc":           "Frequency-domain watermarking with robustness against image transformation attacks.",

    /* PROJECTS — ACADEMIC */
    "section.projects":  "Academic Projects",
    "projects.title":    "University Projects",
    "proj1.period":      "2023.01 — 2023.12 · Capstone",
    "proj1.title":       "7-Segment-based Pig Farm Status Board Handwritten Digit OCR App",
    "proj1.badge":       "Capstone Project",
    "proj1.gallery":     "Capstone project image gallery",
    "proj1.image.overview": "Project overview",
    "proj1.image.system":   "System architecture",
    "proj1.image.ocrflow":  "7-segment OCR pipeline",
    "proj1.image.main":     "App login & main screens",
    "proj1.image.camera":   "OCR camera & correction",
    "proj1.image.list":     "Status board records",
    "proj1.image.chart":    "Statistics & goals",
    "carousel.prev":        "Previous image",
    "carousel.next":        "Next image",
    "proj1.desc":        "Algorithm to separate overlapping handwritten digit detection regions. Full-stack: server, backend, and Flutter app.",
    "proj3.period":      "2022.01 — 2022.12 · Lab Project",
    "proj3.title":       "ArUco Marker + OCR Status Board App",
    "proj3.badge":       "Lab Project · Korean Paper",
    "proj3.desc":        "Table detection and handwritten text recognition from pig farm boards using ArUco markers and OCR.",

    /* COMPETITIONS */
    "section.contests":  "Competitions",
    "contests.title":    "AI Competitions",
    "contest1.period":   "2023.08 · SW AI Competition (DACON)",
    "contest1.title":    "Satellite Image Building Segmentation",
    "contest1.desc":     "Building area segmentation from satellite imagery. Data preprocessing and semantic segmentation model training.",
    "contest2.period":   "2022.08 · SW AI Competition (DACON) — Preliminary",
    "contest2.title":    "Psychological Tendency Prediction",
    "contest2.desc":     "Ensemble algorithm to predict psychological tendencies from psychometric test data.",

    /* PUBLICATION */
    "section.publication": "Publication",
    "publication.title":   "Publication & Award",
    "pub1.venue":          "Domestic Conference Paper",
    "pub1.title":          "Development of an Application for Table Extraction and Handwritten Character Recognition on Pig Farm Status Boards Using ArUco Marker and OCR",
    "pub1.firstBadge":     "First Author",
    "pub1.dateLabel":      "Published",
    "pub1.date":           "July 2023",
    "pub1.societyLabel":   "Society",
    "pub1.society":        "Korea Knowledge Information Technology Society",
    "pub1.conferenceLabel":"Conference / Proceedings",
    "pub1.conference":     "2023 KKITS Spring Conference Proceedings",
    "pub1.firstAuthor":    "Dahye Lee (First Author)",
    "pub1.coauthors":      ", Yujeong Shin, Heejin Ahn, Hanaro Ma, Ingyu Lee, Hyunbean Yi",
    "pub1.summary":        "A mobile application that uses ArUco markers to correct perspective and extract the table area from photographed pig farm status boards, then recognizes handwritten entries with OCR and digitizes them. The system reduces repetitive manual data entry and input errors in farm operations.",
    "pub1.awardLabel":     "Award",
    "pub1.award":          "Convergence Outstanding Paper Award · July 2023",

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
    "contest1.slides":   "Presentation slides (PPTX) ↓",
    "contest.page":      "DACON competition →",
    "proj3.paper":       "Korean paper (PDF) ↓",
    "pub1.pdf":          "Read the full paper (PDF) →",
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
    "hero.eyebrow":      "AI 개발자 · 지란지교소프트",
    "hero.subtitle":     "OCR, RAG, 문서 파싱, 워터마킹까지 — 연구부터 실서비스까지 문서 AI 시스템을 만듭니다.",
    "hero.cta.projects": "프로젝트 보기",

    /* ABOUT */
    "section.about":     "소개",
    "about.title":       "이다혜입니다",
    "about.bio":         "지란지교소프트 AI 연구팀에서 문서 이해, OCR, LLM을 연구개발하고 있습니다. NLP와 Vision Language Model을 실제 문서 AI 문제에 적용하는 것에 열정을 가지고 있습니다.",
    "about.email.label": "이메일",
    "about.award.label": "수상",
    "about.award.value": "SW 중심대학 AI 경진대회 2023 — SW 중심대학협의회장상 · 학업우수장학금 (2020–2023)",
    "about.paper.label": "논문",
    "about.paper.value": "KKITS 2023 — 돈사 현황판 표 추출 및 수기 문자 인식",
    "about.qual.label":  "자격증",
    "about.qual.value":  "AICE Professional · 정보처리기사 · TOEIC 820 · TOEIC Speaking IH",

    /* EXPERIENCE */
    "section.experience":    "경력",
    "experience.title":      "경력 사항",
    "exp.company":           "지란지교소프트 (구 지란지교데이터)",
    "exp.role":              "AI 개발자 · AI 연구팀",
    "exp.desc":              "문서 지능 AI 연구개발: OCR, 표 구조 인식, RAG, 문서 파싱, 비가시성 이미지 워터마킹.",
    "exp.proj1.name":        "문서 이해 모델 개발",
    "exp.proj1.detail":      "OCR 모델 학습, 데이터셋 품질 개선, 사용자별 어댑터 학습, 추론 최적화 (TensorRT / Triton), 표 구조 인식 (TSR)",
    "exp.proj2.name":        "검색 증강 생성 (RAG)",
    "exp.proj2.detail":      "사내 PDF RAG 파이프라인, 한국어 임베딩, ChromaDB/FAISS, MultiQuery Retriever",
    "exp.proj3.name":        "문서 파싱",
    "exp.proj3.detail":      "OOXML, PDF, 한컴 문서, ODT 파싱 · 비식별화 · 문서 재구성",
    "exp.proj4.name":        "비가시성 이미지 워터마킹",
    "exp.proj4.detail":      "주파수 도메인 워터마킹 · 이미지 변환 강건성",

    /* ACADEMIC PROJECTS */
    "section.academic":      "학부 연구 프로젝트",
    "academic.title":        "외부 연구 프로젝트",
    "acad1.company":         "국립한밭대학교 DfX Lab",
    "acad1.role":            "학부연구생 · OCR 연구",
    "acad1.desc":            "돈사 현황판 OCR 시스템을 개발하고 DACON 대회에서 수상했으며, 제1저자 논문을 KKITS 2023 춘계학술대회에서 발표했습니다.",

    /* EDUCATION */
    "section.education": "학력",
    "edu.name":          "국립한밭대학교",
    "edu.degree":        "컴퓨터공학과 학사 · 지도교수: 이현빈",

    /* PROJECTS — JIRANSOFT */
    "section.jiransoft":  "지란지교소프트 프로젝트",
    "jiransoft.title":    "업무 프로젝트",
    "jp1.period":         "2023.10 — 현재",
    "jp1.title":          "문서 이해 모델 개발",
    "jp1.desc":           "OCR 모델 학습 및 데이터셋 품질 개선, 사용자별 어댑터 학습, TensorRT/Triton 추론 최적화, 표 구조 인식 (TSR).",
    "jp2.period":         "2024.07 — 2024.10",
    "jp2.title":          "검색 증강 생성 (RAG)",
    "jp2.desc":           "사내 PDF를 대상으로 한국어 임베딩, ChromaDB/FAISS, MultiQuery Retriever와 유사도 검색 실험을 적용한 RAG 시스템.",
    "jp3.period":         "2026.01 — 현재",
    "jp3.title":          "문서 파싱 시스템",
    "jp3.desc":           "OOXML, PDF, 한컴, ODT의 서로 다른 저장 구조를 분석하고, OCR·Regex 비식별화 후에도 서식을 보존해 문서를 재구성.",
    "jp4.period":         "2026.06 — 현재",
    "jp4.title":          "비가시성 이미지 워터마킹",
    "jp4.desc":           "주파수 도메인 기반 워터마킹 및 이미지 변환 공격에 대한 강건성 연구.",

    /* PROJECTS — ACADEMIC */
    "section.projects":  "학부 프로젝트",
    "projects.title":    "대학교 프로젝트",
    "proj1.period":      "2023.01 — 2023.12 · 캡스톤",
    "proj1.title":       "7-segment 기반 돈사 현황판 수기 숫자 OCR 앱",
    "proj1.badge":       "캡스톤 프로젝트",
    "proj1.gallery":     "캡스톤 프로젝트 이미지 갤러리",
    "proj1.image.overview": "프로젝트 개요",
    "proj1.image.system":   "전체 시스템 구성도",
    "proj1.image.ocrflow":  "7-segment OCR 처리 과정",
    "proj1.image.main":     "앱 로그인 및 메인 화면",
    "proj1.image.camera":   "OCR 카메라 및 결과 수정",
    "proj1.image.list":     "현황판 기록 목록",
    "proj1.image.chart":    "통계 그래프 및 목표 관리",
    "carousel.prev":        "이전 이미지",
    "carousel.next":        "다음 이미지",
    "proj1.desc":        "수기숫자 검출영역 중복 분리 알고리즘 개발. 서버구축 및 백엔드·앱 담당.",
    "proj3.period":      "2022.01 — 2022.12 · 연구실 프로젝트",
    "proj3.title":       "ArUco 마커 기반 현황판 OCR 앱",
    "proj3.badge":       "연구실 프로젝트 · 국내 논문",
    "proj3.desc":        "ArUco 마커와 OCR을 이용한 돈사 현황판 표 검출 및 수기 문자 인식 앱 개발.",

    /* COMPETITIONS */
    "section.contests":  "대회",
    "contests.title":    "AI 경진대회",
    "contest1.period":   "2023.08 · SW AI 경진대회 (DACON)",
    "contest1.title":    "위성 이미지 건물 영역 분할",
    "contest1.desc":     "위성 이미지에서 건물 영역 분할. 데이터 전처리 및 Semantic Segmentation 모델 학습.",
    "contest2.period":   "2022.08 · SW AI 경진대회 (DACON) — 예선",
    "contest2.title":    "심리 성향 예측",
    "contest2.desc":     "심리학 테스트 데이터 분석 및 심리 성향 예측 앙상블 알고리즘 개발.",

    /* PUBLICATION */
    "section.publication": "논문",
    "publication.title":   "논문 및 수상",
    "pub1.venue":          "국내 학술대회 논문",
    "pub1.title":          "ArUco 마커와 OCR을 이용한 돈사 현황판 표 검출 및 수기 문자 인식 앱 개발",
    "pub1.firstBadge":     "제1저자",
    "pub1.dateLabel":      "발표 연월",
    "pub1.date":           "2023년 7월",
    "pub1.societyLabel":   "학회",
    "pub1.society":        "한국지식정보기술학회",
    "pub1.conferenceLabel":"학술대회 / 논문집",
    "pub1.conference":     "2023 한국지식정보기술학회 춘계학술대회 발표논문집",
    "pub1.firstAuthor":    "이다혜 (제1저자)",
    "pub1.coauthors":      ", 신유정, 안희진, 마하나로, 이인규, 이현빈",
    "pub1.summary":        "촬영된 돈사 현황판의 네 귀퉁이를 ArUco 마커로 검출해 원근을 보정하고 표 영역을 안정적으로 추출한 뒤, 수기 문자를 OCR로 인식하여 모바일 앱에서 전산화하는 시스템입니다. 반복적인 수작업 입력과 현장 데이터 입력 오류를 줄이는 것을 목표로 개발했습니다.",
    "pub1.awardLabel":     "수상",
    "pub1.award":          "융복합우수논문상 · 2023년 7월",

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
    "contest1.slides":   "결과 발표자료 (PPTX) ↓",
    "contest.page":      "DACON 대회 페이지 →",
    "proj3.paper":       "국내 논문 보기 (PDF) ↓",
    "pub1.pdf":          "논문 전문 보기 (PDF) →",
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

  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
  });
}

/* ── 페이지 로드 시 저장된 언어 적용 ── */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'en';
  setLang(saved);
});
