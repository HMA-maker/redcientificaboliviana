# Public dataset and privacy rules

`data/published-records.json` is an approved public dataset, not an intake database. It must contain only records with `published: true` after an administrator verifies `Approved` moderation status, publication consent, completeness, approved fields, and location safety.

Do not include email, phone, private submitter information, internal notes, raw attachments, rejected records, private photographs, or exact sensitive coordinates. People must not receive map markers. Problems, projects, institutions, and institutional resources may have a marker only when `map_visible: true` and the location is approved and generalized.

Use the schema and CSV templates in `data/`. Validate JSON, confirm every record is synthetic or approved, and perform a manual privacy review before publishing.
