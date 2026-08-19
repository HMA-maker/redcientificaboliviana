(() => {
  const config = window.SITE_CONFIG;
  const content = window.SITE_CONTENT;
  const talks = window.TALKS;
  const storedLanguage = sessionStorage.getItem('rcb-language');
  let language = storedLanguage === 'en' ? 'en' : 'es';

  const setLink = (element, value, isEmail = false) => {
    if (!value) return;
    element.href = isEmail ? `mailto:${value}` : value;
    if (isEmail) element.textContent = value;
  };

  function renderTalks(copy) {
    const container = document.querySelector('#talks-content');
    if (!talks.length) {
      container.innerHTML = `<div class="empty-state"><h3>${copy.noTalksTitle}</h3><p>${copy.noTalksText}</p></div>`;
      return;
    }
    const renderCard = (talk) => {
      const title = language === 'es' ? talk.titleEs : talk.titleEn;
      const description = language === 'es' ? talk.descriptionEs : talk.descriptionEn;
      return `<article class="talk-card"><p class="talk-topic">${talk.topic}</p><h3>${title}</h3><p>${talk.speaker} · ${talk.date}</p>${description ? `<p>${description}</p>` : ''}${talk.recordingUrl ? `<a class="text-link" href="${talk.recordingUrl}" target="_blank" rel="noopener noreferrer">${copy.recording} <span aria-hidden="true">→</span></a>` : ''}</article>`;
    };
    const upcoming = talks.filter((talk) => talk.status === 'upcoming');
    const past = talks.filter((talk) => talk.status !== 'upcoming');
    container.innerHTML = `${upcoming.length ? `<div class="talk-group"><h3>${copy.upcoming}</h3>${upcoming.map(renderCard).join('')}</div>` : ''}${past.length ? `<div class="talk-group"><h3>${copy.past}</h3>${past.map(renderCard).join('')}</div>` : ''}`;
  }

  function render(languageCode) {
    language = languageCode;
    const copy = content[language];
    document.documentElement.lang = language;
    document.title = language === 'es' ? 'Red Científica Boliviana' : 'Bolivian Scientific Network';
    document.querySelector('meta[name="description"]').content = copy.metaDescription;
    document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = copy[element.dataset.i18n]; });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => { element.setAttribute('aria-label', copy[element.dataset.i18nAriaLabel]); });
    document.querySelectorAll('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    document.querySelector('#objectives-list').innerHTML = copy.objectives.map((item) => `<li>${item}</li>`).join('');
    document.querySelector('#activities-grid').innerHTML = copy.activities.map((activity, index) => `<article class="activity-card"><span class="activity-number">0${index + 1}</span><h3>${activity.title}</h3><p>${activity.text}</p></article>`).join('');
    renderTalks(copy);
    const joinAction = document.querySelector('#join-action');
    joinAction.innerHTML = config.joinFormUrl
      ? `<a class="button button-primary" href="${config.joinFormUrl}" target="_blank" rel="noopener noreferrer">${copy.joinCta}</a>`
      : `<p class="form-unavailable">${copy.joinUnavailable}</p>`;
    document.querySelectorAll('[data-config-link="talkFormUrl"]').forEach((element) => setLink(element, config.talkFormUrl));
    document.querySelectorAll('[data-config-link="contactEmail"]').forEach((element) => setLink(element, config.contactEmail, true));
    sessionStorage.setItem('rcb-language', language);
  }

  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => render(button.dataset.language)));
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', content[language][expanded ? 'openMenu' : 'closeMenu']);
    nav.classList.toggle('is-open', !expanded);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }));
  document.querySelector('#current-year').textContent = new Date().getFullYear();
  render(language);
})();
