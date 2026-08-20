# Google Forms integration

The public site never reads Google Form response sheets. Forms are private intake only; administrators export reviewed public fields to `data/published-records.json`.

## Forms

| Purpose | Spanish | English |
| --- | --- | --- |
| Form 1 — Join the database | https://forms.gle/78z4KXUd22RLJPcg7 | Pending |
| Form 2 — Submit a problem, project, institution, resource, or contribution | https://forms.gle/2RrBAQgNgHHPqehM6 | Pending |

The URLs live once in `SITE_CONFIG.forms` in `content.js`. Add an English URL by replacing the relevant `en: null` value; no component edit is required.

## Response-sheet headers

Use stable administrator-managed headers, even if visible Google Form wording changes. Form 1: `submitted_at`, `full_name`, `preferred_name`, `email_private`, `country`, `region_private`, `affiliation`, `roles`, `disciplines`, `interests`, `biography`, `professional_links`, `publication_consent_*`, `contact_consent`, `accuracy_confirmation`.

Form 2: `submitted_at`, `submitter_name_private`, `submitter_email_private`, `submission_type`, `title`, `summary`, `description`, `theme`, `disciplines`, `department`, `municipality_private`, `coordinates_private`, `related_records`, `links_private`, `contact_permission`, `publication_permission`, `sensitivity`, `location_generalization`, `right_to_share_confirmation`.

## Private versus publishable data

Always private: emails, submitter identity, raw documents, reviewer identity, review notes, rejected records, exact sensitive locations, and photographs without explicit approval. Potentially public after review: approved name/title, summary, approved biography, discipline, theme, role, institution, generalized location, professional public link, and approved image.

## Review and export

1. Keep a private `Moderation` sheet alongside each response sheet.
2. Record `moderation_status`, `publication_consent`, `reviewer`, `review_date`, `review_notes_private`, `public_fields_approved`, `location_sensitivity`, `requested_changes`, and `publication_date`.
3. Approve only complete records with explicit publication consent and no unreviewed sensitive material.
4. Copy only selected public fields to a separate `Published` sheet.
5. Export that sheet as CSV/JSON and replace the approved dataset after validation.

Never import raw responses into the site.
