# Red Científica Boliviana — Phase 1

A small, static, bilingual public website for Red Científica Boliviana. It uses no build tools or runtime dependencies, so it can be hosted on GitHub Pages or any static-file host.

## Local preview

No dependency installation is required. Open `index.html` in a browser, or serve the directory with any static web server. For example, if Python 3 is available:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Content updates

All public content is in `content.js`:

- `SITE_CONFIG` contains the contact email and external form URLs.
- `SITE_CONTENT.es` and `SITE_CONTENT.en` hold every Spanish and English interface string.
- `TALKS` is the list of talks.

### Add the join form

Set `joinFormUrl` in `SITE_CONFIG` to the approved Google Form URL. Until a URL is supplied, the site displays a public “available soon” message instead of a broken or misleading link.

### Add a talk

Add an object to `TALKS`, using confirmed information only:

```js
{
  titleEs: 'Título en español',
  titleEn: 'English title',
  speaker: 'Confirmed speaker name',
  date: 'Confirmed date',
  topic: 'Topic',
  descriptionEs: 'Optional Spanish description',
  descriptionEn: 'Optional English description',
  recordingUrl: 'https://example.org/recording-or-material',
  status: 'upcoming',
}
```

Use an empty string for an optional recording URL or description; do not invent missing details. Current rendering intentionally handles an empty talks list.

### Update translations

Change the matching `es` and `en` values in `SITE_CONTENT` together. Spanish is the initial language, and the selection is retained for the browser session.

## Validation

There is no package manager, linter, test runner, type checker, or production build because the site is dependency-free static HTML, CSS, and JavaScript. Before publishing, check the following:

```sh
git diff --check
python3 -m http.server 8080
```

In a browser, test the navigation, both language buttons, mobile menu, contact email, external form URLs, and keyboard focus outlines.

## Deployment

The included [GitHub Pages workflow](.github/workflows/deploy-pages.yml) deploys the root static files whenever `main` receives a push.

1. Push the `phase-1-launch` branch and open a pull request into `main`.
2. In GitHub repository settings, open **Pages** and set **Source** to **GitHub Actions**.
3. Merge the pull request. The workflow will publish the site and provide its preview URL in the Actions run.
4. Test that URL before pointing the custom domain to it.

### Domain and DNS: `redcientificaboliviana.org`

In GitHub Pages settings, add `redcientificaboliviana.org` as the custom domain and enable HTTPS after DNS has propagated. At the DNS provider, configure either:

- Apex domain: four `A` records for `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
- `www`: a `CNAME` record to `julio-chavez.github.io` (or the exact GitHub Pages host displayed by GitHub).

DNS records and custom-domain steps should be verified against GitHub’s current Pages domain documentation before applying them. Do not create conflicting records.

## Known limitations / Phase 2

Phase 1 deliberately contains no user accounts, researcher or institution directories, database, search, forum, messaging, custom CMS, or administrative dashboard. Later phases can introduce those features after the public content and participation model have been validated.
