(() => {
  const config = window.SITE_CONFIG;
  const content = window.SITE_CONTENT;
  const talks = window.TALKS;
  const storedLanguage = sessionStorage.getItem('rcb-language');
  let language = storedLanguage === 'en' ? 'en' : 'es';
  let records = [];
  let mapBounds = null;
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

  function renderTalks(copy) {
    const container = document.querySelector('#talks-content');
    if (!talks.length) { container.innerHTML = `<div class="empty-state"><h3>${copy.noTalksTitle}</h3><p>${copy.noTalksText}</p></div>`; return; }
    const renderCard = (talk) => `<article class="talk-card"><p class="talk-topic">${escape(talk.topic)}</p><h3>${escape(language === 'es' ? talk.titleEs : talk.titleEn)}</h3><p>${escape(talk.speaker)} · ${escape(talk.date)}</p>${talk.recordingUrl ? `<a class="text-link" href="${escape(talk.recordingUrl)}" target="_blank" rel="noopener noreferrer">${copy.recording} <span aria-hidden="true">→</span></a>` : ''}</article>`;
    const upcoming = talks.filter((talk) => talk.status === 'upcoming'); const past = talks.filter((talk) => talk.status !== 'upcoming');
    container.innerHTML = `${upcoming.length ? `<div class="talk-group"><h3>${copy.upcoming}</h3>${upcoming.map(renderCard).join('')}</div>` : ''}${past.length ? `<div class="talk-group"><h3>${copy.past}</h3>${past.map(renderCard).join('')}</div>` : ''}`;
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
    const title = localized(record, 'title') || record.name; const disciplines = list(record, 'disciplines'); const related = [...(record.related_project_ids || []), ...(record.related_problem_ids || [])].join(', ');
    return `<article class="record-card"><p class="record-type">${escape(copy[record.record_type])}</p><h3>${escape(title)}</h3><p>${escape(localized(record, 'summary'))}</p><dl><div><dt>${copy.recordLabels.disciplines}</dt><dd>${escape(disciplines.join(', ')) || '—'}</dd></div><div><dt>${copy.recordLabels.location}</dt><dd>${escape(localized(record, 'public_location_label')) || '—'}</dd></div><div><dt>${copy.recordLabels.status}</dt><dd>${escape(localized(record, 'status')) || '—'}</dd></div></dl><details><summary>${copy.details}</summary><p>${escape(localized(record, 'biography') || localized(record, 'description') || localized(record, 'summary'))}</p>${record.institution ? `<p><strong>${copy.recordLabels.institution}:</strong> ${escape(record.institution)}</p>` : ''}${localized(record, 'role') ? `<p><strong>${copy.recordLabels.role}:</strong> ${escape(localized(record, 'role'))}</p>` : ''}${related ? `<p><strong>${copy.recordLabels.related}:</strong> ${escape(related)}</p>` : ''}${record.public_link ? `<a class="text-link" href="${escape(record.public_link)}" target="_blank" rel="noopener noreferrer">${copy.recordLabels.external} <span aria-hidden="true">→</span></a>` : ''}</details></article>`;
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
    document.querySelector('#objectives-list').innerHTML = copy.objectives.map((item) => `<li>${item}</li>`).join(''); document.querySelector('#activities-grid').innerHTML = copy.activities.map((activity, index) => `<article class="activity-card"><span class="activity-number">0${index + 1}</span><h3>${activity.title}</h3><p>${activity.text}</p></article>`).join(''); renderTalks(copy); document.querySelector('#join-action').innerHTML = formAction('join', copy); document.querySelector('#record-submit-action').innerHTML = formAction('submit', copy);
    document.querySelectorAll('[data-config-link="talkFormUrl"]').forEach((element) => setLink(element, config.talkFormUrl)); document.querySelectorAll('[data-config-link="contactEmail"]').forEach((element) => setLink(element, config.contactEmail, true)); renderPublicData(copy); sessionStorage.setItem('rcb-language', language);
  }

  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => render(button.dataset.language)));
  ['#record-search', '#filter-type', '#filter-discipline', '#filter-department', '#filter-status'].forEach((selector) => document.querySelector(selector).addEventListener('input', () => renderPublicData(content[language]))); document.querySelectorAll('.map-layer-filter').forEach((input) => input.addEventListener('change', () => renderPublicData(content[language])));
  document.querySelector('#map-markers').addEventListener('click', (event) => { const marker = event.target.closest('[data-record-id]'); if (!marker) return; const record = records.find((item) => item.record_id === marker.dataset.recordId); if (!record) return; const copy = content[language]; document.querySelector('#map-detail').innerHTML = `<h4>${escape(localized(record, 'title'))}</h4><p>${escape(localized(record, 'summary'))}</p><p><strong>${copy.recordLabels.location}:</strong> ${escape(localized(record, 'public_location_label'))}</p><p><strong>${copy.recordLabels.status}:</strong> ${escape(localized(record, 'status'))}</p>`; });
  const menuButton = document.querySelector('.menu-toggle'); const nav = document.querySelector('#site-nav'); menuButton.addEventListener('click', () => { const expanded = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!expanded)); menuButton.setAttribute('aria-label', content[language][expanded ? 'openMenu' : 'closeMenu']); nav.classList.toggle('is-open', !expanded); }); nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); })); document.querySelector('#current-year').textContent = new Date().getFullYear();
  Promise.all([fetch('data/published-records.json'), fetch('data/bolivia-departments.geojson')]).then(async ([datasetResponse, boundariesResponse]) => { if (!datasetResponse.ok || !boundariesResponse.ok) throw new Error('Public data unavailable'); const [dataset, boundaries] = await Promise.all([datasetResponse.json(), boundariesResponse.json()]); records = dataset.records.filter((record) => record.published === true); renderBoundaries(boundaries); render(language); }).catch(() => render(language));
})();
