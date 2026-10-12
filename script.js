/**
 * Alejandro Villafranco Desiderio — Portafolio Profesional
 * JavaScript nativo ligero, rápido y accesible. Cero dependencias externas.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initVideoModal();
});

/* ================= 1. SELECTOR BILINGÜE (ES / EN) ================= */
function initLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  const storedLang = localStorage.getItem('site_lang');
  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase().startsWith('en') ? 'en' : 'es';
  
  const currentLang = langParam || storedLang || browserLang || 'es';
  setLanguage(currentLang, false);

  const btnEs = document.getElementById('lang-btn-es');
  const btnEn = document.getElementById('lang-btn-en');

  if (btnEs) btnEs.addEventListener('click', () => setLanguage('es', true));
  if (btnEn) btnEn.addEventListener('click', () => setLanguage('en', true));
}

function setLanguage(lang, updateStorage = true) {
  const targetLang = lang === 'en' ? 'en' : 'es';
  document.documentElement.lang = targetLang;
  
  if (updateStorage) {
    localStorage.setItem('site_lang', targetLang);
  }

  // Actualizar estado activo de los botones
  const btnEs = document.getElementById('lang-btn-es');
  const btnEn = document.getElementById('lang-btn-en');
  if (btnEs && btnEn) {
    if (targetLang === 'es') {
      btnEs.classList.add('active');
      btnEn.classList.remove('active');
      btnEs.setAttribute('aria-pressed', 'true');
      btnEn.setAttribute('aria-pressed', 'false');
    } else {
      btnEn.classList.add('active');
      btnEs.classList.remove('active');
      btnEn.setAttribute('aria-pressed', 'true');
      btnEs.setAttribute('aria-pressed', 'false');
    }
  }

  // Actualizar título formal de la página
  if (targetLang === 'en') {
    document.title = 'Alejandro Villafranco Desiderio | Software Engineer';
  } else {
    document.title = 'Alejandro Villafranco Desiderio | Ingeniero de Software';
  }
}

/* ================= 2. ALTERNADOR DE TEMA VISUAL (EDITORIAL) ================= */
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('site_theme');
  
  // Por defecto estética clara editorial (marfil/blanco cálido), salvo guardado previo
  const activeTheme = storedTheme || 'light';
  applyTheme(activeTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('site_theme', nextTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ================= 3. REPRODUCTOR MODAL DE VIDEO ================= */
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video-player');
  const modalTitle = document.getElementById('modal-video-title');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalVideo) return;

  // Abrir modal con botón de muestra
  document.querySelectorAll('[data-video-src]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const videoSrc = btn.getAttribute('data-video-src');
      const titleEs = btn.getAttribute('data-title-es') || 'Demostración de video';
      const titleEn = btn.getAttribute('data-title-en') || 'Video demonstration';
      const isEn = document.documentElement.lang === 'en';

      modalTitle.textContent = isEn ? titleEn : titleEs;
      modalVideo.src = videoSrc;
      modal.classList.add('open');
      modalVideo.play().catch(() => {});
    });
  });

  // Cerrar modal y detener reproducción
  const closeModal = () => {
    modal.classList.remove('open');
    modalVideo.pause();
    modalVideo.src = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Cerrar al pulsar el fondo exterior
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}
