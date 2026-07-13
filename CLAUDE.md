# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

`unb_lib_theme` is a Drupal 8/9/10/11 theme that sub-classes Bootstrap Barrio 5.1.x (which uses Bootstrap 4). It is **not used standalone** — it's a parent theme consumed by downstream UNB Libraries project subthemes via Composer, providing UNB Libraries-branded header/footer/banner/nav markup and styling. Licensed MIT.

## No build/test tooling in this repo

There is nothing to build, lint, or test in isolation here:

- No `package.json`, gulpfile/webpack config, phpcs config, eslint/stylelint config, or test suite exists in this repository.
- `dist/` is gitignored — SCSS is **not compiled here**. Compilation happens in a downstream consuming project, because `src/scss/_import.scss` reaches out via a fixed relative path (`../../../../../vendor/twbs/bootstrap/scss/...`), assuming this theme is installed at a specific depth under a host site's Composer `vendor/`/`web/themes/contrib/` tree.
- `js/*.min.js` files are checked in pre-minified; there's no build step to regenerate them. If you change behavior in a `.js` source file, hand-edit its `.min.js` counterpart too.
- Changes are validated by installing/using this theme as a dependency in a downstream Drupal site, not by running anything in this repo directly.

## Branching convention

Branch names encode `<Drupal-major>.x-<Bootstrap-major>.x`: `8.x-4.x`, `9.x-4.x` (repo default/upstream branch), `10.x-4.x`, `11.x-4.x` (current branch), `11.x-5.x`. Bootstrap Barrio 5.1.x (this theme's base) uses Bootstrap 4; Barrio 5.5.x uses Bootstrap 5. Downstream projects must pin `twbs/bootstrap: ~4.5.3` as a `require-dev` dependency (not `~4.6.x`) to match what Barrio 5.1.10/5.1.12 bundles.

**Current branch (`11.x-4.x`):** Drupal 11 compatible, still on Bootstrap 4 / Bootstrap Barrio 5.1.x (`core_version_requirement: ^11` in `unb_lib_theme.info.yml`; `_import.scss` and the CDN'd Bootstrap bundle in `unb_lib_theme.libraries.yml` are still Bootstrap 4). This branch is the output of a two-phase migration: Phase 1 (Drupal 11 API compatibility, landed here) was deliberately split from Phase 2 (the Bootstrap 5 rewrite) so the Drupal-11 fixes could land on their own without also taking on the much larger Bootstrap 4→5 markup/JS/SCSS migration risk.

**`11.x-5.x` branch:** reserved for Phase 2 — migrating this Drupal-11-compatible base onto Bootstrap 5 / Bootstrap Barrio 5.5.x. Not yet started as of this branch's current state; expect it to look identical to `11.x-4.x` until that work lands.

## Architecture

- **`unb_lib_theme.info.yml`** — theme metadata; declares `base theme: bootstrap_barrio` and the full custom region set (`top_header`, `header`, banner-adjacent regions, `footer_top_first/second/third`, `footer_middle`, `footer_bottom_first/second`, etc.) that the templates below rely on.
- **`unb_lib_theme.libraries.yml`** — defines the single `global-styling` library: Bootstrap JS bundle from CDN plus `focus-ring`/`animated-focus-ring`/`global` JS, depending on `core/jquery` and the downstream `calendar_hours_client/calendar-hours` module. Auto-attached via `libraries:` in `info.yml`.
- **`unb_lib_theme.theme`** — preprocess hooks:
  - `unb_lib_theme_preprocess_page()` is the key one: sets an environment-indicator banner for dev/local hosts, computes `is_front`, resolves login/logout links, and implements the **random banner image** logic. `_unb_lib_theme_get_random_file()` searches `img/banner/<url-subpath>` for a matching subdirectory (deepest matching URL segment wins; `front` and `disabled` subdirs are excluded from that scan, `front` is used only when `is_front`), falling back to the base theme's own `img/banner` if the active (sub)theme has none.
  - `unb_lib_theme_form_system_theme_settings_alter()` adds "User Account" (top-header login/logout toggle) and "Banner Settings" sections to the theme settings form.
- **`src/scss/_import.scss`** — the SCSS entry sequencing: Bootstrap functions/variables → `custom/variables` + `overrides/variables` (to override Bootstrap `!default`s) → full Bootstrap → this theme's `custom/*` components → `overrides/*` (Barrio/Bootstrap component overrides). New SCSS work goes in `custom/` (net-new UI pieces/utilities) or `overrides/` (tweaking Barrio/Bootstrap output) and must be added to this import list to take effect.
- **`src/scss/style.scss`** — hand-written CSS-like SCSS (outside the `custom`/`overrides` partial system) for typography, header/navbar, skip-link accessibility, `.theme-dark` tab/accordion styling, and misc list utilities. Imports `_import.scss` at the top.
- **`templates/page.html.twig`** — the central template: header (emergency banner via `alert_scheduler_client`, top utility nav, main navbar via `includes/navbar.html.twig`, collapsible library-hours banner via `calendar_hours_client`), main content/sidebars, and full footer (link columns, social nav, copyright/accessibility nav), plus an environment-indicator ribbon.
- **`templates/includes/navbar.html.twig`** — the mega-menu markup (Search & Borrow / Study & Learn / Research & Data / Teaching Resources / Media & Making / About & Help). Extracted into its own include specifically so downstream sites can pull in nav updates independently of the rest of `page.html.twig`. Most nav-content commits touch only this file.
- **`config/install/unb_lib_theme.settings.yml`** + **`config/schema/unb_lib_theme.schema.yml`** — default Bootstrap Barrio layout/behavior settings shipped with the theme.
- Utility CSS classes (defined in `src/scss/custom/_utility.scss`, documented in README): `hover-grow`/`hover-grow-h`/`hover-grow-v`, `header-icon-h` (accordion caret icons), `img-link`, `opacity-{25,50,75,80,85,90,95}`, `wrapper-list-inline`. The `theme-dark` class (styled in `style.scss`) is the standardized dark-container treatment used for webforms.

## External dependencies this theme assumes downstream

From the README: `drupal/bootstrap_barrio` 5.1.12, `unb-libraries/alert_scheduler`, `unb-libraries/calendar_hours`, and the Font Awesome module (2.x branch, free **Solid** + **Brand** icon subset only — loading the non-free icon font causes it to take precedence and break icons used in the header/footer).
