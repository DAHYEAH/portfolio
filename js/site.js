/* =====================================================
   사이트 인터랙션 — 네비게이션 상태 / 모바일 메뉴 / 스크롤 스파이
   ===================================================== */

const nav      = document.getElementById('nav');
const burger   = document.getElementById('nav-burger');
const navList  = document.querySelector('.nav-links');
const navLinks = [...document.querySelectorAll('.nav-links a')];

/* ── 스크롤하면 네비에 경계선을 준다 ── */
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 12);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── 모바일 메뉴 ── */
function closeMenu() {
  navList.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}

burger?.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

navLinks.forEach(a => a.addEventListener('click', closeMenu));

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

/* ── 스크롤 스파이 ──
   IntersectionObserver 로 화면에 보이는 섹션 중 가장 위쪽 것을 현재로 표시한다.
   rootMargin 위쪽을 네비 높이만큼 밀어 고정 네비에 가려진 부분을 제외한다. */
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if (sections.length) {
  const visible = new Set();

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    }

    // 문서 순서상 가장 먼저 나오는 보이는 섹션을 고른다
    const currentId = sections.find(s => visible.has(s.id))?.id;
    navLinks.forEach(a => {
      a.classList.toggle('current', a.getAttribute('href') === `#${currentId}`);
    });
  }, {
    rootMargin: `-${68 + 24}px 0px -55% 0px`,
    threshold: 0,
  });

  sections.forEach(s => observer.observe(s));
}
