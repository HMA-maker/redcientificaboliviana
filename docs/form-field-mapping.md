# Form field mapping

Visible Google Form question labels may change. Keep the private-sheet headers below stable and map them to the listed public dataset fields only after approval.

| Form/question | Stable private header | Public dataset field | Private by default | Approval required | Empty handling | Display language |
| --- | --- | --- | --- | --- | --- | --- |
| Form 1: Full name | `full_name` | `name` | Yes | Yes, explicit name consent | Do not publish | `name` is not translated |
| Preferred name | `preferred_name` | `name` | Yes | Yes | Use approved full name only | Not translated |
| Email address | `email_private` | None | Yes | N/A | Never export | N/A |
| Affiliation | `affiliation` | `institution` | Yes | Yes | Omit | Not translated |
| Roles | `roles` | `role_es`, `role_en` | Yes | Yes | Omit | Translate display labels |
| Disciplines/interests | `disciplines` | `disciplines_es`, `disciplines_en` | Yes | Yes | Empty array | Translate display labels |
| Short biography | `biography` | `biography_es`, `biography_en` | Yes | Yes | Omit | Reviewed translation |
| Professional links | `professional_links` | `public_link` | Yes | Yes | Omit | Link unchanged |
| Approximate location | `region_private` | `department`, `public_location_label_*` | Yes | Yes | Omit map location | Translate label |
| Form 2: Title | `title` | `title_es`, `title_en` | Yes | Yes | Reject as incomplete | Reviewed translation |
| Short summary | `summary` | `summary_es`, `summary_en` | Yes | Yes | Reject as incomplete | Reviewed translation |
| Description | `description` | `description_es`, `description_en` | Yes | Yes | Omit if unnecessary | Reviewed translation |
| Theme/disciplines | `theme`, `disciplines` | `theme_*`, `disciplines_*` | Yes | Yes | Empty array only for disciplines | Translate labels |
| Department/municipality/coordinates | `department`, `municipality_private`, `coordinates_private` | `department`, `public_location_label_*`, optional public coordinates | Yes | Yes | No marker | Translate label |
| Links/documents | `links_private` | `public_link` | Yes | Yes | Omit | Link unchanged |
| Publication permission | `publication_permission` | `published` | Yes | Yes | `false` | N/A |

For Form 2 type-specific questions, map approved project/problem/institution/resource information to the same public schema. Never create a field in the public export merely because it exists on the intake form.
