---
sidebar_position: 1
---

# Language Support

`@magrinj/parse-ingredients` supports multiple languages through a locale system. English is loaded by default.

## Available Languages

| Language | Locale Code | Import |
|----------|-------------|--------|
| English | `en` | Default (no import needed) |
| French | `fr` | `import '@magrinj/parse-ingredients/locale/fr'` |
| Spanish | `es` | `import '@magrinj/parse-ingredients/locale/es'` |
| Italian | `it` | `import '@magrinj/parse-ingredients/locale/it'` |
| German | `de` | `import '@magrinj/parse-ingredients/locale/de'` |
| Portuguese | `pt` | `import '@magrinj/parse-ingredients/locale/pt'` |

## Using French

Simply import the French locale file — it replaces the active locale globally:

```typescript
import parse from '@magrinj/parse-ingredients';
import '@magrinj/parse-ingredients/locale/fr';

parse('2 cuillères à soupe de sucre');
// {
//   quantity: '2',
//   unit: 'cuillère à soupe',
//   ingredient: 'sucre',
//   article: 'de',
//   symbol: 'c. à s.',
//   minQty: '2',
//   maxQty: '2'
// }
```

### French-Specific Features

- **Articles**: Handles `de`, `d'`, `du`, `des`, `un`, `une`
- **Abbreviations**: Recognizes `c. à s.` (tablespoon), `c. à c.` (teaspoon), `L` (liter), etc.
- **Prepositions**: Range support with `à` (e.g., `"1 à 2 tasses"`)
- **Accents**: Properly handles accented characters

## Adding a New Language

The locale system is extensible. Each locale defines:

- **units**: Array of string patterns to recognize each unit type
- **translations**: Singular and plural forms for each unit
- **symbols**: Abbreviation for each unit
- **prepositions**: Range words (e.g., `"to"` in English, `"à"` in French)
- **articles**: Regex patterns for language-specific articles

To add a new language, create a locale file following the pattern in `src/locale/en.ts` or `src/locale/fr.ts`.
