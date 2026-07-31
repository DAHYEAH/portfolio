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
    "hero.eyebrow":       "AI Developer",
    "hero.subtitle":      "Building intelligent vision systems — OCR, object detection, and document AI from research to production.",
    "hero.cta.projects":  "View Projects",

    /* ABOUT */
    "section.about":      "About",
    "about.title":        "Who I Am",
    "about.bio":          "AI researcher and developer at Jiranjigyodata, specializing in Computer Vision and document intelligence. I love making AI practical — from training models to shipping production systems.",
    "about.email.label":  "Email",
    "about.award.label":  "Awards",
    "about.award.value":  "SW AI Competition 2023 — Excellence Award",
    "about.paper.label":  "Paper",
    "about.paper.value":  "Outstanding Paper Award, Spring 2023",

    /* EXPERIENCE */
    "section.experience":   "Experience",
    "experience.title":     "Work Experience",
    "exp.company":          "Jiranjigyodata (지란지교데이터)",
    "exp.role":             "AI Research & Development Engineer",
    "exp.desc":             "AI R&D focused on Computer Vision and document intelligence. Developing OCR pipelines, object detection systems, and document analysis solutions.",

    /* EDUCATION */
    "section.education":  "Education",
    "edu.name":           "Hanbat National University (국립한밭대학교)",
    "edu.degree":         "B.S. in Computer Science and Engineering",

    /* PROJECTS */
    "section.projects":   "Projects",
    "projects.title":     "Selected Work",
    "proj1.period":       "2023.01 — 2023.12 · Capstone",
    "proj1.title":        "Pig Farm Status Board Handwritten OCR App",
    "proj1.desc":         "Algorithm to separate overlapping handwritten digit detection regions. Full-stack: server, backend, and Flutter app.",
    "proj2.period":       "2023.03 — 2023.05",
    "proj2.title":        "7-Segment Display OCR",
    "proj2.desc":         "OCR model for 7-segment numeric displays. Edge detection pipeline to locate status boards via mobile camera.",
    "proj3.period":       "2022.01 — 2022.12",
    "proj3.title":        "ArUco Marker + OCR Status Board App",
    "proj3.desc":         "Table detection and handwritten text recognition from pig farm boards using ArUco markers and OCR.",

    /* CONTESTS */
    "section.contests":   "Competitions",
    "contests.title":     "AI Competitions",
    "contest1.period":    "2023.07 · SW AI Competition — 🥇 Excellence Award",
    "contest1.title":     "Satellite Image Building Segmentation",
    "contest1.desc":      "Building area segmentation from satellite imagery. Data preprocessing and semantic segmentation model training.",
    "contest2.period":    "2022.08 · SW AI Competition — Preliminary",
    "contest2.title":     "Psychological Tendency Prediction",
    "contest2.desc":      "Ensemble algorithm to predict psychological tendencies from psychometric test data.",

    /* SKILLS */
    "section.skills":   "Skills",
    "skills.title":     "Technical Skills",
    "skills.ai":        "AI / ML",
    "skills.lang":      "Languages",
    "skills.infra":     "Backend / Infra",
    "skills.mobile":    "Mobile",

    /* CONTACT */
    "section.contact":    "Contact",
    "contact.title":      "Get in Touch",
    "contact.heading":    "Let's connect",
    "contact.desc":       "Interested in collaboration, research opportunities, or just want to chat about AI? Feel free to reach out anytime.",
    "contact.send":       "Send Message",
  },

  ko: {
    /* NAV */
    "nav.about":      "소개",
    "nav.experience": "경력",
    "nav.projects":   "프로젝트",
    "nav.skills":     "스킬",
    "nav.contact":    "연락",

    /* HERO */
    "hero.eyebrow":       "AI 개발자",
    "hero.subtitle":      "Computer Vision, OCR, 문서 AI로 연구부터 실서비스까지 — 실용적인 AI 시스템을 만듭니다.",
    "hero.cta.projects":  "프로젝트 보기",

    /* ABOUT */
    "section.about":      "소개",
    "about.title":        "이다혜입니다",
    "about.bio":          "지란지교데이터에서 AI 연구개발을 담당하고 있습니다. Computer Vision과 문서 지능 분야를 전문으로 하며, 모델 학습부터 서비스 배포까지 AI를 실용적으로 만드는 것에 열정을 가지고 있습니다.",
    "about.email.label":  "이메일",
    "about.award.label":  "수상",
    "about.award.value":  "SW 중심대학 공동 AI 경진대회 2023 — SW 중심대학협의회장상",
    "about.paper.label":  "논문",
    "about.paper.value":  "2023 춘계학술대회 융복합우수논문상",

    /* EXPERIENCE */
    "section.experience":   "경력",
    "experience.title":     "경력 사항",
    "exp.company":          "지란지교데이터",
    "exp.role":             "AI 연구개발",
    "exp.desc":             "Computer Vision 및 문서 AI 연구개발. OCR 파이프라인, 객체 검출 시스템, 문서 분석 솔루션 개발.",

    /* EDUCATION */
    "section.education":  "학력",
    "edu.name":           "국립한밭대학교",
    "edu.degree":         "컴퓨터공학과 학사",

    /* PROJECTS */
    "section.projects":   "프로젝트",
    "projects.title":     "주요 프로젝트",
    "proj1.period":       "2023.01 — 2023.12 · 캡스톤",
    "proj1.title":        "돈사 현황판 수기 숫자 OCR 앱",
    "proj1.desc":         "수기숫자 검출영역이 중복될 때 두 문자를 분리하는 알고리즘 개발. 서버구축 및 백엔드·앱 담당.",
    "proj2.period":       "2023.03 — 2023.05",
    "proj2.title":        "7-Segment 타입 숫자 OCR",
    "proj2.desc":         "돈사 전산기입 자동화를 위한 7-Segment OCR 모델 학습. Edge Detection으로 현황판 검출.",
    "proj3.period":       "2022.01 — 2022.12",
    "proj3.title":        "ArUco 마커 기반 현황판 OCR 앱",
    "proj3.desc":         "ArUco 마커와 OCR을 이용한 돈사 현황판 표 검출 및 수기 문자 인식 앱 개발.",

    /* CONTESTS */
    "section.contests":   "대회",
    "contests.title":     "AI 경진대회",
    "contest1.period":    "2023.07 · SW AI 경진대회 — 🥇 SW 중심대학협의회장상",
    "contest1.title":     "위성 이미지 건물 영역 분할",
    "contest1.desc":      "위성 이미지에서 건물 영역 분할. 데이터 전처리 및 Semantic Segmentation 모델 학습.",
    "contest2.period":    "2022.08 · SW AI 경진대회 — 예선",
    "contest2.title":     "심리 성향 예측",
    "contest2.desc":      "심리학 테스트 데이터 분석 및 심리 성향 예측 앙상블 알고리즘 개발.",

    /* SKILLS */
    "section.skills":   "스킬",
    "skills.title":     "기술 스택",
    "skills.ai":        "AI / ML",
    "skills.lang":      "프로그래밍 언어",
    "skills.infra":     "백엔드 / 인프라",
    "skills.mobile":    "모바일",

    /* CONTACT */
    "section.contact":    "연락",
    "contact.title":      "연락하기",
    "contact.heading":    "함께 이야기해요",
    "contact.desc":       "협업, 연구 관련 문의, 혹은 AI에 대해 이야기 나누고 싶으시다면 편하게 연락주세요.",
    "contact.send":       "메시지 보내기",
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
}

/* ── 페이지 로드 시 저장된 언어 적용 ── */
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || 'en';
  setLang(saved);
});
