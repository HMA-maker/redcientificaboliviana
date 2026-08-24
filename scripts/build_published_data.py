#!/usr/bin/env python3
"""Build the approved public JSON dataset from reviewed public CSV exports."""

import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLISHED = ROOT / "data" / "published"
OUTPUT = ROOT / "data" / "published-records.json"
SOURCES = {
    "people.csv": "person",
    "institutions.csv": "institution",
    "problems.csv": "problem",
    "projects.csv": "project",
    "resources.csv": "resource",
}
REQUIRED = {"record_id", "record_type", "published", "summary_es", "summary_en", "status_es", "status_en"}
PRIVATE_FIELDS = {"email", "phone", "reviewer", "review_notes", "submitter", "private", "document"}
IDENTIFIER = re.compile(r"^[a-z]+-[a-z0-9-]+$")
PERSON_CONSENTS = {
    "consent_name": ("name",),
    "consent_affiliation": ("institution",),
    "consent_biography": ("biography_es", "biography_en"),
    "consent_research_areas": ("research_areas_es", "research_areas_en", "disciplines_es", "disciplines_en", "theme_es", "theme_en"),
    "consent_professional_links": ("orcid_url", "website_url", "google_scholar_url", "linkedin_url"),
    "consent_photograph": ("photo_url",),
    "consent_location": ("country", "city_region", "public_location_label_es", "public_location_label_en"),
    "consent_role": ("role_es", "role_en"),
}
PERSON_REQUIRED_CONSENTS = set(PERSON_CONSENTS) | {"consent_languages", "consent_participation_interests", "consent_project_interests"}


def fail(message):
    raise ValueError(message)


def boolean(value, location):
    normalized = value.strip().lower()
    if normalized == "true":
        return True
    if normalized == "false":
        return False
    fail(f"{location}: expected true or false")


def consent(value, location):
    normalized = value.strip().lower()
    if normalized == "yes":
        return True
    if normalized == "no":
        return False
    fail(f"{location}: consent values must be Yes or No")


def number(value, location):
    try:
        return float(value)
    except ValueError as error:
        raise ValueError(f"{location}: expected a number") from error


def clean(row):
    return {key: value.strip() for key, value in row.items() if key and value and value.strip()}


def validate_headers(headers, filename, expected_type):
    missing = REQUIRED - set(headers)
    if missing:
        fail(f"{filename}: missing required headers: {', '.join(sorted(missing))}")
    prohibited = [header for header in headers if any(word in header.lower() for word in PRIVATE_FIELDS)]
    if prohibited:
        fail(f"{filename}: prohibited private headers: {', '.join(prohibited)}")
    if expected_type == "person":
        missing_consents = PERSON_REQUIRED_CONSENTS - set(headers)
        if missing_consents:
            fail(f"{filename}: missing consent headers: {', '.join(sorted(missing_consents))}")


def transform(row, filename, line, expected_type):
    location = f"{filename}:{line}"
    if row.get("record_type") != expected_type:
        fail(f"{location}: record_type must be {expected_type}")
    record_id = row.get("record_id", "")
    if not IDENTIFIER.fullmatch(record_id):
        fail(f"{location}: invalid record_id {record_id!r}")
    row["published"] = boolean(row.get("published", ""), location)
    if not row["published"]:
        fail(f"{location}: public CSV files may contain approved records only (published must be true)")
    if expected_type == "person":
        for consent_field, public_fields in PERSON_CONSENTS.items():
            approved = consent(row.get(consent_field, ""), f"{location} {consent_field}")
            if not approved and any(row.get(field) for field in public_fields):
                fail(f"{location}: {consent_field} is No but a related public field is populated")
            row.pop(consent_field, None)
        for consent_field in ("consent_languages", "consent_participation_interests", "consent_project_interests"):
            consent(row.get(consent_field, ""), f"{location} {consent_field}")
            row.pop(consent_field, None)
    for field in ("research_areas_es", "research_areas_en", "disciplines_es", "disciplines_en"):
        if field in row:
            row[field] = [item.strip() for item in row[field].split(";") if item.strip()]
    if "map_visible" in row:
        row["map_visible"] = boolean(row["map_visible"], location)
        if row["map_visible"]:
            if not row.get("public_latitude") or not row.get("public_longitude"):
                fail(f"{location}: map-visible records require public_latitude and public_longitude")
            row["public_latitude"] = number(row["public_latitude"], location)
            row["public_longitude"] = number(row["public_longitude"], location)
            if not -90 <= row["public_latitude"] <= 90 or not -180 <= row["public_longitude"] <= 180:
                fail(f"{location}: public coordinates are outside valid ranges")
    for field in ("related_project_ids", "related_problem_ids"):
        if field in row:
            row[field] = [item.strip() for item in row[field].split(";") if item.strip()]
    return row


def main():
    records = []
    seen_ids = set()
    for filename, expected_type in SOURCES.items():
        path = PUBLISHED / filename
        if not path.exists():
            fail(f"Missing required public CSV: {path.relative_to(ROOT)}")
        with path.open(encoding="utf-8", newline="") as source:
            reader = csv.DictReader(source)
            if not reader.fieldnames:
                fail(f"{filename}: missing header row")
            validate_headers(reader.fieldnames, filename, expected_type)
            for line, raw_row in enumerate(reader, start=2):
                row = transform(clean(raw_row), filename, line, expected_type)
                if row["record_id"] in seen_ids:
                    fail(f"{filename}:{line}: duplicate record_id {row['record_id']}")
                seen_ids.add(row["record_id"])
                records.append(row)
    payload = {
        "dataset_notice": "Synthetic demonstration data only. Do not replace with raw form responses.",
        "records": records,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {OUTPUT.relative_to(ROOT)} with {len(records)} approved public records.")


if __name__ == "__main__":
    try:
        main()
    except ValueError as error:
        print(f"Data build failed: {error}", file=sys.stderr)
        sys.exit(1)
