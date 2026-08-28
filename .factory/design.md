# Result Envelope visual thesis

## Direction

Result Envelope looks like a **blueprint drafting sheet** used to specify a data contract. The page is a work surface, not a generic software sales page. Fine grid lines establish scale. Crop marks, revision labels, dimension arrows, and clipped paper corners make the envelope feel measured and inspectable. The live result sits inside a ruled packet with a numbered manifest rail.

This fits the product because the library makes large, vague results bounded and addressable. The visual system turns that promise into visible measurements: rows, bytes, pages, and cursors occupy fixed places.

## Palette

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| `--paper` | `#F4EEDC` | `#071A2A` | drafting sheet background |
| `--sheet` | `#FFFDF5` | `#0C2638` | raised work surface |
| `--ink` | `#10283B` | `#F5EFDC` | body text |
| `--muted` | `#526675` | `#B8C8D2` | secondary copy |
| `--blueprint` | `#075E89` | `#5AC8F5` | rules, links, focus |
| `--blue-deep` | `#063C59` | `#BEEBFF` | headings and strong marks |
| `--signal` | `#B93424` | `#FF8A79` | revision marks and warnings |
| `--success` | `#176B4C` | `#7EE0B2` | valid packet state |
| `--danger` | `#A62D25` | `#FF958B` | input errors |

Light mode is the primary treatment. Dark mode resembles a cyan-line blueprint table. Body text and controls meet WCAG AA contrast in both modes. Color never carries status without a label or shape.

## Type

- Display and labels: `Arial Narrow`, `Aptos Narrow`, `Roboto Condensed`, system sans-serif. Uppercase is reserved for small sheet labels.
- Body and controls: `Inter`, `Aptos`, `Segoe UI`, system sans-serif. No font files or third-party requests are needed.
- Data: `ui-monospace`, `SFMono-Regular`, `Consolas`, monospace. Numbers use tabular figures.
- Scale: 14, 16, 18, 24, 36, and `clamp(42px, 7vw, 78px)`.

## Spacing and shape

The base unit is 8 px. Main gaps use 16, 24, 32, 48, 72, and 96 px. Content stops at 1180 px. Reading copy stops near 66 characters. Corners are clipped rather than rounded: CSS polygons and squared 2 px rules create the packet silhouette. Buttons remain at least 44 px tall.

## Layout rhythm

The header acts as a drawing title block. The first screen uses an offset two-column drafting plate rather than a centered hero. A vertical sheet number anchors each major section. Sections alternate between open paper and blueprint-blue bands. On phones, the sheet rail becomes a horizontal revision strip and secondary annotations drop below the task.

## Interaction grammar

- Primary actions fill with blueprint blue and shift by one drafting-grid unit on press.
- Editable data lives in a ruled textarea. Output parts use literal tabs with arrow-key navigation.
- Cursor copying changes the label to “Copied” and announces the result.
- Errors appear as vermilion revision notes beside the input, with a concrete correction.
- Theme choice follows the device and can be changed from the header.

## Motion policy

The signature motion is a one-time **drafting reveal**: rules scale from their measured origin while the packet fades into place over 220 ms. Output changes cross-fade over 160 ms. Nothing loops. Under `prefers-reduced-motion: reduce`, transforms and smooth scrolling are removed and state changes are instant.

## Original asset plan and provenance

- Hero illustration: an original raster drafting-board still life showing a bounded data packet assembled from manifest, schema, summary, and numbered page sheets. It contains no required text. Generated for this product with `/opt/fleet/lib/gen-image.sh`, then cropped and optimized locally to WebP at or below 300 KB.
- Social card: a 1200×630 crop composed from the same original illustration with live HTML-independent layout.
- Wordmark, favicon, cursor, rulers, and small diagrams: hand-authored SVG/CSS geometry in this repository. No stock icons or external assets.

Generation used the factory-owned `factory-image` deployment at 1536×1024, high quality. The final prompt described a top-down technical-gouache packet, four connected paper components, cream fibers, cyan construction lines, and one vermilion mark. It prohibited readable text, logos, gradients, watermarks, screenshots, and generic technology imagery. The full prompt is stored in `.factory/hero-generation.json`.

The optimized hero is 97 KB WebP. Its social crop is 86 KB WebP. The generated output is original project artwork and uses the repository’s MIT license.

## Accessibility and performance

Focus uses a 3 px cyan/blue outline with a 2 px paper offset. The grid is decorative and low contrast. Decorative images use empty alt text; the explanatory hero has plain alt text. Static dimensions reserve all image space. Initial JavaScript stays below 150 KB gzip; CSS below 50 KB; the hero stays below 300 KB.
