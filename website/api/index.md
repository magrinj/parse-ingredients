# @magrinj/parse-ingredients

[![npm version](https://img.shields.io/npm/v/@magrinj/parse-ingredients.svg)](https://www.npmjs.com/package/@magrinj/parse-ingredients)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/@magrinj/parse-ingredients.svg)](https://npmcharts.com/compare/@magrinj/parse-ingredients?minimal=true)
![CI](https://github.com/magrinj/parse-ingredients/actions/workflows/ci.yml/badge.svg)
[![docs](https://img.shields.io/badge/docs-Documentation-blue)](https://magrinj.github.io/parse-ingredients/)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![zero deps](https://img.shields.io/badge/dependencies-0-brightgreen)

A multi-language recipe ingredient parser. Parse, combine, and format ingredients with zero dependencies.

## Why this library?

- **Multi-language support** — The only maintained npm package that parses French recipe ingredients natively. Extensible locale system makes adding new languages straightforward.
- **Parse + Combine + Pretty** — Three complementary functions for the full ingredient workflow: parse strings into structured objects, combine duplicates across recipes, and format them back into readable text.
- **Zero runtime dependencies** — Pure TypeScript, lightweight and fast. Nothing to audit, nothing to worry about.

## Installation

```bash
# npm
npm install @magrinj/parse-ingredients

# yarn
yarn add @magrinj/parse-ingredients

# pnpm
pnpm add @magrinj/parse-ingredients

# bun
bun add @magrinj/parse-ingredients
```

## Quick Start

```typescript
import parse from '@magrinj/parse-ingredients';

parse('1 teaspoon of basil');
// {
//   quantity: '1',
//   unit: 'teaspoon',
//   ingredient: 'basil',
//   article: 'of',
//   symbol: 'tsp',
//   minQty: '1',
//   maxQty: '1'
// }
```

### French

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

## API

### `parse(line: string, options?: Options): Ingredient`

Parses a single ingredient string into a structured object. Handles quantities (integers, decimals, fractions, ranges, Unicode fractions), units, articles, and ingredient names.

```typescript
parse('1-2 cups of flour');
// { quantity: '1', unit: 'cup', ingredient: 'flour', minQty: '1', maxQty: '2', ... }
```

### `combine(ingredients: Ingredient[]): Ingredient[]`

Aggregates duplicate ingredients by summing quantities. Ingredients match when they have the same name and unit.

```typescript
import {combine} from '@magrinj/parse-ingredients';

combine([
  {quantity: '1', unit: 'cup', ingredient: 'flour', article: 'of', symbol: 'c', minQty: '1', maxQty: '1'},
  {quantity: '2', unit: 'cup', ingredient: 'flour', article: 'of', symbol: 'c', minQty: '2', maxQty: '2'},
]);
// [{ quantity: '3', unit: 'cup', ingredient: 'flour', minQty: '3', maxQty: '3', ... }]
```

### `pretty(ingredient: Ingredient): string`

Formats an `Ingredient` object back into a human-readable string. Converts decimals to fractions (0.5 → 1/2, 0.333 → 1/3, etc.).

```typescript
import {pretty} from '@magrinj/parse-ingredients';

pretty({quantity: '1.5', unit: 'cup', ingredient: 'milk', article: 'of', symbol: 'c', minQty: '1.5', maxQty: '1.5'});
// "1 1/2 cups of milk"
```

## Types

```typescript
interface Ingredient {
  ingredient: string;
  quantity: string | null;
  unit: string | null;
  article: string | null;
  symbol: string | null;
  minQty: string | null;
  maxQty: string | null;
}

interface Options {
  language: {
    from: string;
    to: string;
  };
}
```

## Supported Languages

| Language | Locale Code | Import |
|----------|-------------|--------|
| English | `en` | Default (no import needed) |
| French | `fr` | `import '@magrinj/parse-ingredients/locale/fr'` |

## Documentation

For detailed guides and API reference, visit the [documentation site](https://magrinj.github.io/parse-ingredients/).

## Support

If you find this library useful, consider supporting its development:

<a href="https://buymeacoffee.com/magrinj" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

## License

[MIT](_media/LICENSE)

---

<p align="center">
  Made with ❤️ by <a href="https://www.linkedin.com/in/jeremy-magrin/">Jérémy Magrin</a>
</p>

<p align="center">
  If you find this useful, please star it ⭐ — it helps a lot!
</p>
