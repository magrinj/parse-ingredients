---
sidebar_position: 3
---

# Pretty Printing

The `pretty` function converts an `Ingredient` object back into a human-readable string, with intelligent fraction formatting.

## Usage

```typescript
import {pretty} from '@magrinj/parse-ingredients';

pretty({
  quantity: '1.5',
  unit: 'cup',
  ingredient: 'milk',
  article: 'of',
  symbol: 'c',
  minQty: '1.5',
  maxQty: '1.5',
});
// "1 1/2 cups of milk"
```

## Fraction Conversion

Decimals are automatically converted to readable fractions:

| Decimal | Output |
|---------|--------|
| `0.25` | `1/4` |
| `0.333` | `1/3` |
| `0.5` | `1/2` |
| `0.666` | `2/3` |
| `0.75` | `3/4` |
| `1.5` | `1 1/2` |
| `1.333` | `1 1/3` |
| `2.666` | `2 2/3` |

The function handles common recurring fractions (1/3, 2/3, 1/6, 1/9, 5/6) using a lookup table, and reduces other fractions using GCD.

## Output Format

The output follows the pattern: `[quantity] [unit] [article] [ingredient]`

- Quantity `1` → singular unit form
- Quantity > 1 → plural unit form
- No quantity → just the ingredient name
- No unit → `[quantity] [ingredient]`
