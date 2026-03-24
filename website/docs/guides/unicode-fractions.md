---
sidebar_position: 4
---

# Unicode Fractions

`@magrinj/parse-ingredients` automatically converts Unicode fraction characters to their decimal equivalents during parsing.

## Supported Fractions

| Unicode | Character | Decimal |
|---------|-----------|---------|
| U+00BC | `¼` | 0.25 |
| U+00BD | `½` | 0.5 |
| U+00BE | `¾` | 0.75 |
| U+2150 | `⅐` | 0.142 |
| U+2151 | `⅑` | 0.111 |
| U+2152 | `⅒` | 0.1 |
| U+2153 | `⅓` | 0.333 |
| U+2154 | `⅔` | 0.666 |
| U+2155 | `⅕` | 0.2 |
| U+2156 | `⅖` | 0.4 |
| U+2157 | `⅗` | 0.6 |
| U+2158 | `⅘` | 0.8 |
| U+2159 | `⅙` | 0.166 |
| U+215A | `⅚` | 0.833 |
| U+215B | `⅛` | 0.125 |
| U+215C | `⅜` | 0.375 |
| U+215D | `⅝` | 0.625 |
| U+215E | `⅞` | 0.875 |

## Mixed Numbers

Unicode fractions can be combined with whole numbers:

```typescript
import parse from '@magrinj/parse-ingredients';

parse('2½ cups flour');
// { quantity: '2.5', unit: 'cup', ingredient: 'flour', ... }

parse('1¾ teaspoons salt');
// { quantity: '1.75', unit: 'teaspoon', ingredient: 'salt', ... }
```

These are commonly found in recipe content copied from websites, PDFs, or cookbooks that use special typography.
