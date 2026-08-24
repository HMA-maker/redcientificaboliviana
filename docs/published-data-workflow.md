# Approved public data workflow

The website reads only `data/published-records.json`. This file is generated from the approved public CSV files in `data/published/`; never edit it by hand and never import raw Google Form response sheets.

## Review and approval

1. Administrators review private Google Form responses in the private response and moderation sheets.
2. Confirm the record is approved, complete, consented for publication, and safe to publish.
3. Copy only approved public fields into the relevant administration spreadsheet tab: people, institutions, problems, projects, or resources.
4. Export each approved tab as UTF-8 CSV into `data/published/` with its fixed filename.

Private emails, phone numbers, reviewer names, review notes, submitter details, raw documents, rejected/pending records, sensitive locations, and unapproved photographs must never be exported to these CSV files.

## People: field-level consent

For people, the approved CSV includes review-export consent columns. The generator validates them and removes every `consent_*` field from the public JSON. A populated public name, affiliation, biography, research area/discipline, professional link, photograph, location, or role requires its corresponding `consent_*` value to be `Yes`. A `No` value requires its corresponding public fields to remain blank. Languages, participation interests, and project interests are never added to the public JSON by this workflow.

Photographs must be a public repository asset. Never use a raw Google Drive response URL.

Use `data/templates/people-review.csv` as the private administration-sheet column schema. It is a header-only template and must not be populated with raw response data in this repository. Administrators map only consented `public_*` fields into `data/published/people.csv` after approval.

## Build the public dataset

From the repository root, run:

```sh
npm run build:data
```

The command runs `python3 scripts/build_published_data.py`. It checks that all five CSV files exist; validates headers, IDs, record types, booleans, unique IDs, public coordinates, and forbidden private headers; converts semicolon-separated discipline and relationship columns into arrays; and writes `data/published-records.json`.

If npm is not available, use the equivalent command:

```sh
python3 scripts/build_published_data.py
```

## Verify before publishing

```sh
python3 -m json.tool data/published-records.json
git diff --check
```

Review the generated diff. Confirm every record is approved public information and that no prohibited private field appears in the CSV headers or output. Start the static site locally and verify the directory and map before merging.

## Update the website after approval

1. Update only the appropriate `data/published/*.csv` file.
2. Run the data-build command.
3. Review the generated JSON and browser views.
4. Commit both CSV inputs and generated JSON together.

The CSV examples currently contain synthetic demonstration records only. Replace them only with records that completed the private moderation workflow.
