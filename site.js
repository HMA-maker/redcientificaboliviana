(() => {
  const config = window.SITE_CONFIG;
  const content = window.SITE_CONTENT;
  const activities = window.ACTIVITIES || [];
  const coordinators = window.COORDINATORS || [];
  const storedLanguage = sessionStorage.getItem('rcb-language');
  let language = storedLanguage === 'en' ? 'en' : 'es';
  let records = [];
  let mapBounds = null;
  let calendarDate = new Date();
  const escape = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const localized = (record, field) => record[`${field}_${language}`] || record[`${field}_es`] || record[field] || '';
  const list = (record, field) => record[`${field}_${language}`] || record[`${field}_es`] || record[field] || [];
  const setLink = (element, value, isEmail = false) => { if (value) { element.href = isEmail ? `mailto:${value}` : value; if (isEmail) element.textContent = value; } };

  function rings(geometry) { return geometry.type === 'Polygon' ? geometry.coordinates : geometry.coordinates.flat(1); }
  function renderBoundaries(geojson) {
    const points = geojson.features.flatMap((feature) => rings(feature.geometry).flat()); const longitudes = points.map((point) => point[0]); const latitudes = points.map((point) => point[1]); mapBounds = { minLon: Math.min(...longitudes), maxLon: Math.max(...longitudes), minLat: Math.min(...latitudes), maxLat: Math.max(...latitudes) };
    const project = ([lon, lat]) => [((lon - mapBounds.minLon) / (mapBounds.maxLon - mapBounds.minLon)) * 100, ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100];
    const polygon = (ring) => ring.map((point, index) => `${index ? 'L' : 'M'}${project(point).join(' ')}`).join(' ') + 'Z';
    document.querySelector('#department-boundaries').innerHTML = geojson.features.map((feature) => `<path d="${rings(feature.geometry).map(polygon).join(' ')}"><title>${escape(feature.properties.shapeName)}</title></path>`).join('');
  }
  function markerPosition(record) {
    if (!mapBounds || typeof record.public_longitude !== 'number' || typeof record.public_latitude !== 'number') return null;
    return [((record.public_longitude - mapBounds.minLon) / (mapBounds.maxLon - mapBounds.minLon)) * 100, ((mapBounds.maxLat - record.public_latitude) / (mapBounds.maxLat - mapBounds.minLat)) * 100];
  }

  const activityDate = (value) => { const [year, month, day] = String(value || '').split('-').map(Number); return new Date(year, month - 1, day); };
  const isPastActivity = (activity) => activityDate(activity.date) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  const activityTitle = (activity) => activity[`title_${language}`] || activity.title || activity.title_es || '';
  const activityDescription = (activity) => activity[`description_${language}`] || activity.description || activity.description_es || '';

  function renderActivities(copy) {
    const month = calendarDate.getMonth(); const year = calendarDate.getFullYear(); const firstDay = new Date(year, month, 1).getDay(); const days = new Date(year, month + 1, 0).getDate();
    document.querySelector('#calendar-month').textContent = new Intl.DateTimeFormat(language === 'es' ? 'es-ES' : 'en-US', { month: 'long', year: 'numeric' }).format(calendarDate);
    const calendar = document.querySelector('#activity-calendar');
    const published = activities.filter((activity) => activity.published !== false && activity.date);
    calendar.innerHTML = Array.from({ length: firstDay + days }, (_, index) => {
      if (index < firstDay) return '<span class="calendar-day calendar-day-empty" aria-hidden="true"></span>';
      const day = index - firstDay + 1; const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const entries = published.filter((activity) => activity.date === date);
      return `<div class="calendar-day"><span>${day}</span>${entries.map((activity) => `<button type="button" class="calendar-event ${isPastActivity(activity) ? 'is-past' : ''}" data-activity-id="${escape(activity.id)}" title="${escape(activityTitle(activity))}">${escape(activityTitle(activity))}</button>`).join('')}</div>`;
    }).join('');
    const container = document.querySelector('#activities-content');
    if (!published.length) { container.innerHTML = `<div class="empty-state"><h3>${copy.noActivitiesTitle}</h3><p>${copy.noActivitiesText}</p></div>`; return; }
    const card = (activity) => `<article class="talk-card"><p class="talk-topic">${escape(copy.activityTypes[activity.type] || copy.activityTypes.other)}</p><h3>${escape(activityTitle(activity))}</h3><p>${escape(new Intl.DateTimeFormat(language === 'es' ? 'es-ES' : 'en-US', { dateStyle: 'long' }).format(activityDate(activity.date)))}</p><p>${escape(activityDescription(activity))}</p>${activity.registration_url ? `<a class="text-link" href="${escape(activity.registration_url)}" target="_blank" rel="noopener noreferrer">${copy.calendarRegistration} <span aria-hidden="true">→</span></a>` : ''}${activity.recording_url ? `<a class="text-link" href="${escape(activity.recording_url)}" target="_blank" rel="noopener noreferrer">${copy.recording} <span aria-hidden="true">→</span></a>` : ''}</article>`;
    const upcoming = published.filter((activity) => !isPastActivity(activity)); const past = published.filter(isPastActivity);
    container.innerHTML = `${upcoming.length ? `<div class="talk-group"><h3>${copy.upcoming}</h3>${upcoming.map(card).join('')}</div>` : ''}${past.length ? `<div class="talk-group"><h3>${copy.past}</h3>${past.map(card).join('')}</div>` : ''}`;
  }

  function renderCoordinators(copy) {
    document.querySelector('#coordinators-content').innerHTML = coordinators.map((coordinator) => `<article class="coordinator-card"><h3>${escape(coordinator.name)}</h3><p>${copy.coordinatorRole}</p></article>`).join('');
  }

  function formAction(form, copy) {
    const preferred = config.forms[form][language]; const spanish = config.forms[form].es;
    if (preferred) return `<a class="button button-primary" href="${escape(preferred)}" target="_blank" rel="noopener noreferrer">${form === 'join' ? copy.joinCta : copy.recordSubmitCta}</a>`;
    return `<div class="form-language-note"><p>${copy.formSpanishNotice}</p><a class="button button-primary" href="${escape(spanish)}" target="_blank" rel="noopener noreferrer">${copy.formSpanishLink}</a></div>`;
  }

  function filterOptions(id, values, copy) {
    const select = document.querySelector(id); const current = select.value;
    select.innerHTML = `<option value="">${copy.all}</option>${values.map((value) => `<option value="${escape(value)}">${escape(value)}</option>`).join('')}`;
    select.value = values.includes(current) ? current : '';
  }

  function renderFilters(copy) {
    filterOptions('#filter-type', [...new Set(records.map((record) => copy[record.record_type]))], copy);
    filterOptions('#filter-discipline', [...new Set(records.flatMap((record) => list(record, 'disciplines')))].sort(), copy);
    filterOptions('#filter-department', [...new Set(records.map((record) => record.department).filter(Boolean))].sort(), copy);
    filterOptions('#filter-status', [...new Set(records.map((record) => localized(record, 'status')).filter(Boolean))].sort(), copy);
  }

  function visibleRecords() {
    const search = document.querySelector('#record-search').value.trim().toLocaleLowerCase(); const type = document.querySelector('#filter-type').value; const discipline = document.querySelector('#filter-discipline').value; const department = document.querySelector('#filter-department').value; const status = document.querySelector('#filter-status').value;
    return records.filter((record) => {
      const haystack = [record.name, localized(record, 'title'), localized(record, 'summary'), localized(record, 'theme'), ...list(record, 'disciplines')].join(' ').toLocaleLowerCase();
      return (!search || haystack.includes(search)) && (!type || content[language][record.record_type] === type) && (!discipline || list(record, 'disciplines').includes(discipline)) && (!department || record.department === department) && (!status || localized(record, 'status') === status);
    });
  }

  function recordCard(record, copy) {
    const title = record.record_type === 'person' ? record.name : (localized(record, 'title') || record.name); const disciplines = list(record, 'disciplines'); const researchAreas = list(record, 'research_areas'); const related = [...(record.related_project_ids || []), ...(record.related_problem_ids || [])].join(', '); const details = [[copy.recordLabels.disciplines, disciplines.join(', ')], [copy.recordLabels.researchAreas, researchAreas.join(', ')], [copy.recordLabels.location, localized(record, 'public_location_label')], [copy.recordLabels.status, localized(record, 'status')]].filter(([, value]) => value); const professionalLinks = [['ORCID', record.orcid_url], ['Website', record.website_url], ['Google Scholar', record.google_scholar_url], ['LinkedIn', record.linkedin_url]].filter(([, url]) => url);
    return `<article class="record-card">${record.photo_url ? `<img class="profile-photo" src="${escape(record.photo_url)}" alt="" />` : ''}<p class="record-type">${escape(copy[record.record_type])}</p><h3>${escape(title)}</h3><p>${escape(localized(record, 'summary'))}</p>${details.length ? `<dl>${details.map(([label, value]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl>` : ''}<details><summary>${copy.details}</summary>${localized(record, 'biography') || localized(record, 'description') ? `<p>${escape(localized(record, 'biography') || localized(record, 'description'))}</p>` : ''}${record.institution ? `<p><strong>${copy.recordLabels.institution}:</strong> ${escape(record.institution)}</p>` : ''}${localized(record, 'role') ? `<p><strong>${copy.recordLabels.role}:</strong> ${escape(localized(record, 'role'))}</p>` : ''}${related ? `<p><strong>${copy.recordLabels.related}:</strong> ${escape(related)}</p>` : ''}${professionalLinks.length ? `<p><strong>${copy.recordLabels.professionalLinks}:</strong> ${professionalLinks.map(([label, url]) => `<a class="text-link" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}</a>`).join(' · ')}</p>` : ''}${record.public_link ? `<a class="text-link" href="${escape(record.public_link)}" target="_blank" rel="noopener noreferrer">${copy.recordLabels.external} <span aria-hidden="true">→</span></a>` : ''}</details></article>`;
  }

  function renderPublicData(copy) {
    if (!records.length) return;
    renderFilters(copy); const filtered = visibleRecords(); const container = document.querySelector('#records-content');
    container.innerHTML = filtered.length ? filtered.map((record) => recordCard(record, copy)).join('') : `<div class="empty-state"><h3>${copy.noRecordsTitle}</h3><p>${copy.noRecordsText}</p></div>`;
    const enabledLayers = [...document.querySelectorAll('.map-layer-filter:checked')].map((input) => input.value);
    const mapRecords = filtered.filter((record) => record.map_visible && markerPosition(record) && enabledLayers.includes(record.record_type));
    document.querySelector('#map-markers').innerHTML = mapRecords.map((record) => { const [left, top] = markerPosition(record); return `<button class="map-marker ${escape(record.record_type)}" data-record-id="${escape(record.record_id)}" style="left:${left}%;top:${top}%" title="${escape(localized(record, 'title'))}"><span class="sr-only">${escape(localized(record, 'title'))}</span></button>`; }).join('');
    document.querySelector('#map-list').innerHTML = mapRecords.length ? mapRecords.map((record) => `<article><span class="legend-dot ${escape(record.record_type)}"></span><div><strong>${escape(localized(record, 'title'))}</strong><p>${escape(localized(record, 'public_location_label'))}</p></div></article>`).join('') : `<p>${copy.mapNoMarkers}</p>`;
  }

  function render(languageCode) {
    language = languageCode; const copy = content[language]; document.documentElement.lang = language; document.title = language === 'es' ? 'Red Científica Boliviana' : 'Bolivian Scientific Network'; document.querySelector('meta[name="description"]').content = copy.metaDescription;
    document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = copy[element.dataset.i18n]; }); document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => { element.setAttribute('aria-label', copy[element.dataset.i18nAriaLabel]); }); document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => { element.placeholder = copy[element.dataset.i18nPlaceholder]; }); document.querySelectorAll('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    document.querySelector('#objectives-list').innerHTML = copy.objectives.map((item) => `<li>${item}</li>`).join(''); document.querySelector('#activities-grid').innerHTML = copy.activities.map((activity, index) => `<article class="activity-card"><span class="activity-number">0${index + 1}</span><h3>${activity.title}</h3><p>${activity.text}</p></article>`).join(''); renderActivities(copy); renderCoordinators(copy); document.querySelector('#join-action').innerHTML = formAction('join', copy); document.querySelector('#record-submit-action').innerHTML = formAction('submit', copy);
    document.querySelectorAll('[data-config-link="talkFormUrl"]').forEach((element) => setLink(element, config.talkFormUrl)); document.querySelectorAll('[data-config-link="contactEmail"]').forEach((element) => setLink(element, config.contactEmail, true)); renderPublicData(copy); applyView(); sessionStorage.setItem('rcb-language', language);
  }

  function applyView() {
    const aliases = { inicio: 'home', nosotros: 'network', actividades: 'activities', charlas: 'activities', talks: 'activities', directorio: 'directory', mapa: 'map', contacto: 'contact' };
    const requested = location.hash.replace(/^#\/?/, '').split('/')[0]; const view = aliases[requested] || requested || 'home'; const allowed = ['home', 'network', 'activities', 'directory', 'map', 'contact']; const current = allowed.includes(view) ? view : 'home';
    if (requested === 'talks') { history.replaceState(null, '', '#/activities'); }
    document.querySelectorAll('[data-view]').forEach((section) => { section.hidden = section.dataset.view !== current; });
    document.querySelectorAll('[data-route]').forEach((link) => link.toggleAttribute('aria-current', link.dataset.route === current));
  }

  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => render(button.dataset.language)));
  document.querySelector('#calendar-previous').addEventListener('click', () => { calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1); renderActivities(content[language]); });
  document.querySelector('#calendar-next').addEventListener('click', () => { calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1); renderActivities(content[language]); });
  document.querySelector('#activity-calendar').addEventListener('click', (event) => { const trigger = event.target.closest('[data-activity-id]'); if (!trigger) return; const activity = activities.find((item) => item.id === trigger.dataset.activityId); if (!activity) return; document.querySelector('#activities-content').innerHTML = `<article class="talk-card" tabindex="-1"><p class="talk-topic">${escape(content[language].activityTypes[activity.type] || content[language].activityTypes.other)}</p><h3>${escape(activityTitle(activity))}</h3><p>${escape(activityDescription(activity))}</p></article>`; document.querySelector('#activities-content article').focus(); });
  ['#record-search', '#filter-type', '#filter-discipline', '#filter-department', '#filter-status'].forEach((selector) => document.querySelector(selector).addEventListener('input', () => renderPublicData(content[language]))); document.querySelectorAll('.map-layer-filter').forEach((input) => input.addEventListener('change', () => renderPublicData(content[language])));
  document.querySelector('#map-markers').addEventListener('click', (event) => { const marker = event.target.closest('[data-record-id]'); if (!marker) return; const record = records.find((item) => item.record_id === marker.dataset.recordId); if (!record) return; const copy = content[language]; document.querySelector('#map-detail').innerHTML = `<h4>${escape(localized(record, 'title'))}</h4><p>${escape(localized(record, 'summary'))}</p><p><strong>${copy.recordLabels.location}:</strong> ${escape(localized(record, 'public_location_label'))}</p><p><strong>${copy.recordLabels.status}:</strong> ${escape(localized(record, 'status'))}</p>`; });
  const menuButton = document.querySelector('.menu-toggle'); const nav = document.querySelector('#site-nav'); menuButton.addEventListener('click', () => { const expanded = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!expanded)); menuButton.setAttribute('aria-label', content[language][expanded ? 'openMenu' : 'closeMenu']); nav.classList.toggle('is-open', !expanded); }); nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); })); document.querySelector('#current-year').textContent = new Date().getFullYear();
  window.addEventListener('hashchange', applyView); applyView();
  fetch('data/published-records.json').then((response) => response.ok ? response.json() : Promise.reject(response)).then((dataset) => { records = dataset.records.filter((record) => record.published === true); render(language); return fetch('data/bolivia-departments.geojson'); }).then((response) => response.ok ? response.json() : Promise.reject(response)).then((boundaries) => { renderBoundaries(boundaries); renderPublicData(content[language]); }).catch(() => render(language));
})();
