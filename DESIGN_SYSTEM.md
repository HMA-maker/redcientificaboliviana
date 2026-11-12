# Website design system

## Color palette

The six base colors are the website's only approved colors. Their values live together at the top of `styles.css` as `--palette-*` variables. To change a color, edit its value there once; the semantic tokens and browser theme colors follow those variables.

| Token | Hex | Intended use |
| --- | --- | --- |
| `--palette-forest-green` | `#285747` | Primary brand color, headings, links, primary buttons, and dark panels. |
| `--palette-muted-brick-red` | `#A64B45` | Small emphasis, focus indicators, and status accents. |
| `--palette-warm-ochre` | `#C49A45` | Decorative highlights and small visual markers. |
| `--palette-warm-white` | `#F8F7F3` | Main page surface and text on dark surfaces. |
| `--palette-pale-sage` | `#EDF2EE` | Alternate surfaces, borders, and quiet decorative details. |
| `--palette-charcoal` | `#26343D` | Main body text and dark neutral details. |

## Rules for additions

- Use semantic CSS tokens such as `--color-primary`, `--color-secondary`, `--color-accent`, `--color-surface`, `--color-surface-muted`, `--color-text`, and `--color-border`.
- Do not add one-off hex, RGB, HSL, or named colors in page styles, HTML, JavaScript, or illustrations. For transparency or shadows, derive the color from a palette variable with `color-mix()`.
- Keep body text charcoal or forest green. Use ochre for decorative accents, not small text on a light surface.
- For inline SVG, use `currentColor` or a palette variable. Keep standalone image assets within the same six colors; photos are the exception.
- The browser tab theme and runtime favicon colors are generated from palette variables in `site.js`. If the approved favicon shape changes, update the SVG markup there and keep `favicon.svg` as the matching standalone fallback.
