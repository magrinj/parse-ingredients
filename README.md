# parse-ingredients (This documentation is not complete yet)
Natural language parser for recipes and lists of ingredients. Can parse a string into an object and also combine an array of these ingredient objects.
## About
This project was built on top of code written by [mackenziefernandez](https://github.com/mackenziefernandez/recipe-parser). 

## To install
`yarn add parse-ingredients`

## To use
`import parse from 'parse-ingredients';`

And then use on a string, for example:
`parse('1 teaspoon basil');`

Will return an object:
```
{
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil',
  minQty: 1,
  maxQty: 1
};
```

### Combine ingredient objects
```
combine([{
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil',
  minQty: 1,
  maxQty: 2,
},
{
  quantity: 2,
  unit: 'teaspoon',
  ingredient: 'basil',
  minQty: 2,
  maxQty: 2
}]);
```

Will return
```
[{
  quantity: 3,
  unit: 'teaspoon',
  ingredient: 'basil',
  minQty: 3,
  maxQty: 4
}]
```


### Unicode Fractions
Will also correctly parse unicode fractions into the proper amount

### Development	
Clone the repo and `yarn` to install packages. If `yarn test` comes back good after your code changes, give yourself a pat on the back.	
	
### Publishing	
Checkout https://docs.npmjs.com/getting-started/publishing-npm-packages for more info
