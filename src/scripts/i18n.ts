const dict: Record<string, string> = {
  // Hero
  'hero-greeting': 'Hi, I\'m',
  'hero-tagline': 'Web Developer',
  'hero-description': 'I build modern digital experiences focused on performance and design.',
  'hero-btn-projects': 'See Projects',
  'hero-btn-resume': '↓ Resume',
  'hero-btn-contact': 'Contact',
  // About
  'about-languages': 'Languages',
  'about-native': 'Native',
  'about-fluent': 'Fluent',
  'about-role-dev': 'Full Stack\nDeveloper',
  'about-role-design': 'Graphic Designer',
  'about-automacoes': 'Automation',
  // Experiences
  'exp-title': 'Experience',
  'exp-role-1': 'Junior Front-End Developer',
  'exp-type-1': 'Freelancer',
  'exp-period-1': 'Current',
  'exp-task-1-1': 'Development and maintenance of modern web interfaces, focused on performance, usability, and code quality.',
  'exp-role-2': 'IT Intern',
  'exp-period-2': 'Oct/2025 – Feb/2026',
  'exp-task-2-1': 'Printer installation and configuration',
  'exp-task-2-2': 'Software bug fixes and remote/phone support',
  'exp-role-3': 'Technical Support',
  'exp-period-3': 'Feb/2025 – Oct/2025',
  'exp-task-3-1': 'System support via remote access',
  'exp-task-3-2': 'Error diagnosis and technical guidance for clients',
  'exp-role-4': 'Apple Sales & Technician',
  'exp-period-4': 'Feb/2024 – Oct/2024',
  'exp-task-4-1': 'Apple hardware diagnostics',
  'exp-task-4-2': 'Basic repairs and user support',
  'exp-role-5': 'Technical Support',
  'exp-period-5': 'May/2023 – Oct/2023',
  'exp-task-5-1': 'SQL database changes and C# commands',
  'exp-task-5-2': 'Partner support via remote access',
  // Projects
  'proj-title': 'Projects',
  'proj-1-name': 'Remind – Final Project',
  'proj-1-desc': 'Full-stack application designed to assist Alzheimer\'s patients, promoting integration between doctors, family members, and patients through monitoring features and cognitive stimulation activities. Implementation of authentication and role-based access control (RBAC), plus cloud file storage.',
  'proj-2-name': 'Incer Institutional Website',
  'proj-2-desc': 'Subcontracted to be part of the institutional website project for Instituto do Cérebro do Sul Fluminense (Incer).',
  'proj-3-name': 'Personal Portfolio',
  'proj-3-desc': 'Bilingual personal portfolio (PT/EN) with GSAP animations, holographic Profile Card effect, interactive particles, per-section scroll pinning, and contact form via EmailJS.',
  'proj-code': 'Code',
  // Contact
  'contact-title': 'Contact',
  'contact-text': 'Have a project in mind or want to chat? Feel free to get in touch.',
  'contact-back': '← Back',
  'contact-name': 'Name',
  'contact-name-ph': 'Your name',
  'contact-email-ph': 'your@email.com',
  'contact-subject': 'Subject',
  'contact-subject-ph': 'Message subject',
  'contact-message': 'Message',
  'contact-message-ph': 'Write your message...',
  'contact-send': 'Send Message',
  'contact-sending': 'Sending...',
  'contact-sending-alt': 'Sending',
  'contact-sent': 'Sent!',
  'contact-error': 'Error!',
  'contact-success-msg': 'Message sent successfully!',
  'contact-error-msg': 'Failed to send. Please try again.',
  // Header
  'nav-about': 'About',
  'nav-exp': 'Experience',
  'nav-proj': 'Projects',
  'nav-contact': 'Contact',
  // Footer
  'footer': 'All rights reserved.',
};

// Store originals before translating
const originals = new Map<HTMLElement, string>();
const originalPlaceholders = new Map<HTMLElement, string>();
const originalImages = new Map<HTMLElement, string>();

function translateToEn() {
  // Save and translate all elements with data-i18n
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    if (dict[key]) {
      if (!originals.has(el)) {
        originals.set(el, el.innerHTML);
      }
      if (dict[key].includes('\n')) {
        el.innerHTML = dict[key].replace(/\n/g, '<br/>');
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // Save and translate placeholders
  document.querySelectorAll<HTMLElement>('[data-i18n-ph]').forEach((el) => {
    const key = el.dataset.i18nPh!;
    const input = el as HTMLInputElement;
    if (dict[key]) {
      if (!originalPlaceholders.has(el)) {
        originalPlaceholders.set(el, input.placeholder);
      }
      input.placeholder = dict[key];
    }
  });

  // Swap project images for EN versions
  document.querySelectorAll<HTMLElement>('[data-image-en]').forEach((el) => {
    const enImage = el.dataset.imageEn;
    if (enImage) {
      if (!originalImages.has(el)) {
        originalImages.set(el, el.dataset.image || '');
      }
      el.dataset.image = enImage;
      if (el.dataset.grid === 'img-1') {
        el.style.backgroundImage = `url('${enImage}')`;
      }
    }
  });

  // Toggle i18n-pt / i18n-en spans
  document.querySelectorAll<HTMLElement>('.i18n-pt').forEach(el => el.style.display = 'none');
  document.querySelectorAll<HTMLElement>('.i18n-en').forEach(el => el.style.display = '');

  // Swap hrefs for EN
  document.querySelectorAll<HTMLAnchorElement>('[data-href-en]').forEach((el) => {
    el.href = el.dataset.hrefEn!;
  });

  document.documentElement.lang = 'en';
  document.documentElement.dataset.lang = 'en';
}

function translateToPt() {
  // Restore original text
  originals.forEach((html, el) => {
    el.innerHTML = html;
  });

  // Restore placeholders
  originalPlaceholders.forEach((ph, el) => {
    (el as HTMLInputElement).placeholder = ph;
  });

  // Restore project images
  originalImages.forEach((img, el) => {
    el.dataset.image = img;
    if (el.dataset.grid === 'img-1') {
      el.style.backgroundImage = `url('${img}')`;
    }
  });

  // Toggle i18n-pt / i18n-en spans
  document.querySelectorAll<HTMLElement>('.i18n-pt').forEach(el => el.style.display = '');
  document.querySelectorAll<HTMLElement>('.i18n-en').forEach(el => el.style.display = 'none');

  // Restore hrefs for PT
  document.querySelectorAll<HTMLAnchorElement>('[data-href-pt]').forEach((el) => {
    el.href = el.dataset.hrefPt!;
  });

  document.documentElement.lang = 'pt-BR';
  document.documentElement.dataset.lang = 'pt';
}

export function initI18n() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  let currentLang: 'pt' | 'en' = 'pt';
  const flagUs = document.getElementById('lang-flag-us');
  const flagBr = document.getElementById('lang-flag-br');

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentLang === 'pt') {
      currentLang = 'en';
      translateToEn();
      btn.title = 'Mudar para Português';
      if (flagUs) flagUs.style.display = 'none';
      if (flagBr) flagBr.style.display = 'block';
    } else {
      currentLang = 'pt';
      translateToPt();
      btn.title = 'Switch to English';
      if (flagBr) flagBr.style.display = 'none';
      if (flagUs) flagUs.style.display = 'block';
    }
  });
}
