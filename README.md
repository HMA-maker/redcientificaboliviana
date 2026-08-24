# Red Científica Boliviana

Red Científica Boliviana is a bilingual (Spanish/English) static public website for a network connecting people interested in science and research related to Bolivia. It is intentionally a lightweight informational site with a reviewed public directory, a generalized map, and an activities calendar. It has no accounts, database, or automatic Google Forms/Sheets synchronization.

## Local use and validation

The site has no runtime dependencies or frontend build step. Python 3 is needed only to regenerate the public-data JSON.

```sh
# Serve the site locally, then open http://localhost:8080/#/home
python3 -m http.server 8080

# Regenerate the approved public dataset
python3 scripts/build_published_data.py
# Equivalent when npm is installed
npm run build:data

# Static validation available in this repository
git diff --check
python3 -m json.tool data/published-records.json
```

There is no development command, linter, type checker, test runner, production build command, or production preview command configured in `package.json`. Browser validation is the production-equivalent check: test each route, both languages, the menu at a narrow viewport, form links, keyboard focus, directory, map, and activity calendar. A GitHub Pages deployment is triggered automatically by a successful push to `main`; do not manually deploy unless that workflow is intentionally changed.

## Site views and navigation

Top-level navigation uses hash views, rather than a continuous scrolling page:

| View | Route |
| --- | --- |
| Home | `#/home` |
| Network | `#/network` |
| Activities | `#/activities` |
| Directory | `#/directory` |
| Map | `#/map` |
| Contact | `#/contact` |

`#/talks` is retained as a compatibility route and redirects to `#/activities`. Talks and other events are deliberately combined into Activities.

Spanish is the default language. The visible language selector persists the choice for the browser session. All public interface strings and site settings live in [`content.js`](content.js): `SITE_CONTENT.es`, `SITE_CONTENT.en`, and `SITE_CONFIG`. When adding a string, add the same key to both language objects, attach it to markup with `data-i18n` (or the appropriate aria/placeholder variant), then test both language buttons on every affected view. Never leave a fallback Spanish key visible in English or vice versa.

## Repository structure

| Path | Purpose |
| --- | --- |
| `index.html` | Static shell and view markup. |
| `site.js` | View routing, language selection, directory, map, and calendar rendering. |
| `styles.css` | Responsive site styles. |
| `content.js` | Bilingual content, public form URLs, activities, and coordinator names. |
| `data/published/*.csv` | Approved public source records by record type. |
| `data/published-records.json` | Generated public dataset used by the website; do not edit by hand. |
| `data/bolivia-departments.geojson` | Generalized map boundaries. |
| `data/templates/` | Header templates for approved data exports and private review mapping. |
| `scripts/build_published_data.py` | CSV validation and JSON generator. |
| `docs/` | Data governance, field mapping, Forms, map, and public-data workflow documentation. |
| `.github/workflows/deploy-pages.yml` | GitHub Pages deployment on pushes to `main`. |

## Activities and calendar

Activities are maintained in `window.ACTIVITIES` in [`content.js`](content.js). It is currently empty because no approved public activities have been supplied; the empty state is intentional.

Add an approved activity as an object with these fields:

```js
{
  id: 'stable-activity-id',
  published: true,
  date: 'YYYY-MM-DD',
  type: 'seminar', // seminar, talk, workshop, meeting, or other
  title_es: 'Título aprobado',
  title_en: 'Approved title',
  description_es: 'Descripción aprobada',
  description_en: 'Approved description',
  registration_url: 'https://example.org/registration', // optional
  recording_url: 'https://example.org/recording', // optional
}
```

Use only approved titles, descriptions, dates, and links. Edit the same object to update it. To remove an activity from the public view while retaining the entry locally, set `published: false`; do not represent an archive with invented public text. An activity with a valid `date` and no `published: false` is displayed. Activities before the visitor's local calendar day are classified as past; the calendar adds `is-past` and renders those entries in the muted past-event style. Future and current-day entries are upcoming.

Month controls work with mouse, touch, and keyboard because they are native buttons. When activities exist, each calendar event is also a native button: its browser tooltip supplies the hover label, and click, tap, Enter, or Space shows its title, type, and approved description below the calendar. Optional registration and recording links appear only when supplied.

## Public data, moderation, and consent

Google Form responses remain private. The public site must consume only the generated, approved dataset—not raw response exports, private Sheets, moderation notes, or intake links.

Current intake forms are configured in `SITE_CONFIG.forms`:

- Join database form: `https://forms.gle/78z4KXUd22RLJPcg7`
- Submit problem, project, institution, or resource: `https://forms.gle/2RrBAQgNgHHPqehM6`

Review records privately with these moderation statuses: **Pending**, **Needs changes**, **Approved**, **Rejected**, and **Archived**. Only approved, publication-safe data belongs in `data/published/` and must use `published=true`.

To update a public person, institution, problem, project, or resource:

1. Review the private submission and moderation status outside this repository.
2. Copy only approved public fields to the matching CSV in `data/published/`.
3. For people, use the review mapping/template and all required consent columns.
4. Run `python3 scripts/build_published_data.py`.
5. Inspect the generated JSON diff and test the Directory and Map locally.
6. Commit the edited CSV and generated `data/published-records.json` together.

`data/published/people.csv`, `institutions.csv`, `problems.csv`, `projects.csv`, and `resources.csv` are source files. `data/published-records.json` is generated. The generator rejects private-looking CSV headers, invalid public data, duplicate IDs, and unsafe map coordinates; see [`docs/published-data-workflow.md`](docs/published-data-workflow.md) for the complete workflow.

Consent is field-level: approval for one field does not authorize another. Missing or unclear consent is private. Email addresses, raw form responses, internal moderation notes, languages, participation interests, and project interests are never published by this workflow. A biography, research area, professional link, role, location, or photograph needs its own explicit consent. Omit fields without consent entirely—never render “Private”, “No consent”, or empty public labels.

Store an approved public photograph as a committed public website asset before setting `photo_url` to its public site path. Do not use raw/private Google Drive URLs, and do not publish a photo unless photograph consent is affirmative. If no approved asset exists, leave `photo_url` blank so the existing no-photo behavior is used.

## Network and map maintenance

The Network coordinators/founders list is `window.COORDINATORS` in [`content.js`](content.js). It currently contains only the authorized public names: Julio Chávez, Kenji Shoji, and Natalia Machaca. Update that small list only with approved public information; do not add contact details or unapproved biographies.

The map displays only records with `map_visible=true`, valid public latitude/longitude, and an approved generalized location. People should not appear as individual or precise map markers by default; the current Julio Chávez person record is intentionally map-hidden. Before enabling a map-visible record, verify that its location is approved, generalized, and safe, then update its matching public CSV and regenerate JSON. Never use a home address, personal location, or unapproved precise coordinate.

## Maintenance checklist

Before merging a content update:

1. Confirm every public record, image, activity, and link is approved.
2. Regenerate the data JSON after CSV changes.
3. Run `git diff --check` and validate the JSON.
4. Test all six routes, legacy `#/talks`, ES/EN, forms, directory, map, and keyboard navigation locally.
5. Search the diff for private emails, raw Drive URLs, response data, notes, and secrets.
6. Confirm generated JSON and source CSV updates are committed together.
7. Push `main` and check the GitHub Pages workflow result.

## Troubleshooting

- **Missing records:** run the data generator; confirm the matching CSV row is `published=true`, has all required headers, and its record type is correct.
- **Missing activities or empty calendar:** confirm the item is in `window.ACTIVITIES`, has a valid `YYYY-MM-DD` date, and is not `published: false`. An empty calendar is expected when no activities are approved.
- **Empty map:** verify the JSON loaded, the map layer is checked, and the record has `map_visible=true` plus valid approved generalized coordinates.
- **Translation problem or mixed language:** add the same key to both `SITE_CONTENT` objects and switch ES/EN through every affected route.
- **Broken route:** use one of the documented `#/…` hashes; `#/talks` redirects to Activities.
- **Invalid CSV or JSON:** run `python3 scripts/build_published_data.py` and `python3 -m json.tool data/published-records.json`; correct the reported source CSV rather than hand-editing generated JSON.
- **Missing photograph:** leave `photo_url` blank until an approved public asset is committed; never substitute a Drive response URL.
- **Private data appears publicly:** remove it from the source CSV, regenerate JSON, check the diff, and halt publication until consent is rechecked.
- **Failed build:** there is no frontend build. Check Python availability and run the data generator directly; if npm is unavailable, use `python3 scripts/build_published_data.py`.
- **Failed Git push:** inspect `git status`, `git remote -v`, and the remote branch state; fetch, resolve only understood changes, and never force-push or reset shared work.

## Deployment

The GitHub Actions workflow publishes the repository root to GitHub Pages when `main` is pushed. Configure Pages to use **GitHub Actions**, then set the custom domain in GitHub Pages settings only after DNS is configured and verified. For domain-specific DNS guidance, verify current GitHub Pages documentation before making changes.
