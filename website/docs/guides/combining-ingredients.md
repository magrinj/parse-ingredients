---
sidebar_position: 2
---

# Combining Ingredients

The `combine` function aggregates duplicate ingredients by summing their quantities. This is useful when merging ingredient lists from multiple recipes.

## Usage

```typescript
import {combine} from '@magrinj/parse-ingredients';

const combined = combine([
  {
    quantity: '1',
    unit: 'teaspoon',
    ingredient: 'basil',
    article: 'of',
    symbol: 'tsp',
    minQty: '1',
    maxQty: '2',
  },
  {
    quantity: '2',
    unit: 'teaspoon',
    ingredient: 'basil',
    article: 'of',
    symbol: 'tsp',
    minQty: '2',
    maxQty: '2',
  },
]);
// [{
//   quantity: '3',
//   unit: 'teaspoon',
//   ingredient: 'basil',
//   symbol: 'tsp',
//   minQty: '3',
//   maxQty: '4'
// }]
```

## Behavior

- **Matching**: Ingredients are combined when they have the same name **and** the same unit
- **Quantities**: Summed together, including `minQty` and `maxQty` ranges
- **Sorting**: Results are returned sorted alphabetically by ingredient name
- **Different units**: Ingredients with the same name but different units are kept separate (e.g., `1 cup flour` and `2 tablespoons flour` won't be combined)
- **No quantity**: Ingredients without quantities are returned as-is
- **Empty arrays**: Returns an empty array
