---
sidebar_position: 1
---

# Getting Started

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

## Basic Usage

```typescript
import parse from '@magrinj/parse-ingredients';

const result = parse('1 teaspoon of basil');
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

## French Support

```typescript
import parse from '@magrinj/parse-ingredients';
import '@magrinj/parse-ingredients/locale/fr';

const result = parse('1 c. à café de basilic');
// {
//   quantity: '1',
//   unit: 'cuillère à café',
//   ingredient: 'basilic',
//   article: 'de',
//   symbol: 'c. à c.',
//   minQty: '1',
//   maxQty: '1'
// }
```

## Output Format

Every call to `parse()` returns an `Ingredient` object:

| Field | Type | Description |
|-------|------|-------------|
| `ingredient` | `string` | The ingredient name |
| `quantity` | `string \| null` | The quantity (e.g., `"1"`, `"1.5"`, `"1/2"`) |
| `unit` | `string \| null` | The unit in full form (e.g., `"teaspoon"`, `"cup"`) |
| `article` | `string \| null` | The article/preposition (e.g., `"of"`, `"de"`) |
| `symbol` | `string \| null` | The unit abbreviation (e.g., `"tsp"`, `"c."`) |
| `minQty` | `string \| null` | Minimum quantity (same as quantity unless a range) |
| `maxQty` | `string \| null` | Maximum quantity (same as quantity unless a range) |

### Quantity Ranges

Ranges like `"1-2"`, `"1 - 2"`, or `"1 to 2"` are automatically parsed:

```typescript
const result = parse('1-2 cups of flour');
// { quantity: '1', minQty: '1', maxQty: '2', ... }
```
