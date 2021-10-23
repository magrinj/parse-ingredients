# parse-ingredients

[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-downloads-url]
[![MIT License][license-image]][license-url]

[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/parse-ingredients
[npm-version-image]: https://img.shields.io/npm/v/parse-ingredients.svg?style=flat

[npm-downloads-image]: https://img.shields.io/npm/dm/parse-ingredients.svg?style=flat
[npm-downloads-url]: https://npmcharts.com/compare/parse-ingredients?minimal=true


Parser for recipes and lists of ingredients. Can parse a string into an object and also combine an array of these ingredient objects.

## About

This project was rewrite on top of code written by [mackenziefernandez](https://github.com/mackenziefernandez/recipe-parser). 

## To install

`yarn add parse-ingredients`

## To use

```typescript
import parse from 'parse-ingredients';

console.log(parse('1 teaspoon of basil'));
/*
{
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil',
  article: 'of',
  minQty: 1,
  maxQty: 1
};
*/
```

`import parse from 'parse-ingredients';`

### Language

This package currenly support french and english.
By default english is imported.
If you want to use another language do the following:

```typescript
import parse from 'parse-ingredients';

// import 'parse-ingredients/lib/locale/{LOCALE_NAME}'
import 'parse-ingredients/lib/locale/fr'

console.log(parse('1 c. à café de basilique'));
/*
{
  quantity: 1,
  unit: 'cuillère à café',
  ingredient: 'basilique',
  article: 'de',
  minQty: 1,
  maxQty: 1
};
*/
```

### Combine ingredient objects

```typescript
import {combine} from 'parse-ingredients';

console.log(combine([{
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil',
  article: 'of',
  minQty: 1,
  maxQty: 2,
},
{
  quantity: 2,
  unit: 'teaspoon',
  ingredient: 'basil',
  article: 'of',
  minQty: 2,
  maxQty: 2
}]));
/*
[{
  quantity: 3,
  unit: 'teaspoon',
  ingredient: 'basil',
  minQty: 3,
  maxQty: 4
}]
*/
```

### Prettify ingredient

```typescript
import {pretty} from 'parse-ingredients';

console.log(pretty({
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil',
  article: 'of',
  minQty: 1,
  maxQty: 1,
}));
/*
1 teaspoon of basil
*/
```

### Unicode Fractions
Will also correctly parse unicode fractions into the proper amount

### Development	
Clone the repo and `yarn` to install packages. If `yarn test` comes back good after your code changes, give yourself a pat on the back.	
