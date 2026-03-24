# Changelog

## [1.0.0] - 2026-03-24

### Breaking Changes

- Package renamed from `parse-ingredients` to `@magrinj/parse-ingredients`
- Locale imports changed from `parse-ingredients/lib/locale/fr` to `@magrinj/parse-ingredients/locale/fr`

### Added

- ESM support (dual CJS/ESM publishing)
- `exports` map in package.json for proper module resolution
- TypeScript type declarations included
- CI/CD with GitHub Actions (lint, typecheck, test, build)
- Automated releases with release-it and conventional changelog
- Documentation site with Docusaurus and TypeDoc
- Comprehensive README with API documentation

### Changed

- Migrated from Yarn to Bun
- Upgraded TypeScript to 5.7
- Upgraded ESLint to 9 with flat config
- Upgraded Jest to 29
- Upgraded Prettier to 3
- Removed deprecated dependencies (tslint, babel-eslint)

### Previous Releases (as `parse-ingredients`)

- **0.2.8** - Fix accentuation problem with articles
- **0.2.7** - Handle prepositions for range expressions
- **0.2.6** - Add dosing cup unit
- **0.2.5** - Fix liter orthographic error
- **0.2.4** - Handle special case teaspoon/tablespoon in French
