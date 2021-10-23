import {Locale} from '../types/general';
import {defineLocale} from '../locales';

const locale: Locale = {
  units: {
    cup: ['c', 'c.', 'cup', 'cups'],
    gallon: ['gal', 'gallon', 'gallons'],
    ounce: ['oz', 'oz.', 'ounce', 'ounces'],
    pint: ['pt', 'pts', 'pt.', 'pint', 'pints'],
    pound: ['lb', 'lb.', 'lbs', 'lbs.', 'pound', 'pounds'],
    quart: ['qt', 'qt.', 'qts', 'qts.', 'quart', 'quarts'],
    tablespoon: [
      'tbs',
      'tbs.',
      'tbsp',
      'tbspn',
      'T',
      'T.',
      'tablespoon',
      'tablespoons',
    ],
    teaspoon: ['tsp', 'tsp.', 'tspn', 't', 't.', 'teaspoon', 'teaspoons'],
    gram: ['g', 'g.', 'gram', 'grams'],
    kilogram: ['kg', 'kg.', 'kilogram', 'kilograms'],
    liter: ['l', 'l.', 'liter', 'liters'],
    centiliter: ['cl', 'cl.', 'centiliter', 'centiliters'],
    milligram: ['mg', 'mg.', 'milligram', 'milligrams'],
    milliliter: ['ml', 'ml.', 'milliliter', 'milliliters'],
    package: ['pkg', 'pkgs', 'package', 'packages'],
    stick: ['stick', 'sticks'],
    piece: ['pcs', 'pcs.', 'piece', 'pieces'],
    pinch: ['pinch', 'pinches'],
    clove: ['clove', 'cloves'],
    slice: ['slice', 'slices'],
    can: ['can', 'cans'],
    box: ['box', 'boxes'],
    bag: ['bag', 'bags'],
    small: ['small'],
    medium: ['medium'],
    large: ['large'],
  },
  translations: {
    cup: ['cup', 'cups'],
    gallon: ['gallon', 'gallons'],
    ounce: ['ounce', 'ounces'],
    pint: ['pint', 'pints'],
    pound: ['pound', 'pounds'],
    quart: ['quart', 'quarts'],
    tablespoon: ['tablespoon', 'tablespoons'],
    teaspoon: ['teaspoon', 'teaspoons'],
    gram: ['gram', 'grams'],
    kilogram: ['kilogram', 'kilograms'],
    liter: ['liter', 'liters'],
    centiliter: ['centiliter', 'centiliters'],
    milligram: ['milligram', 'milligrams'],
    milliliter: ['milliliter', 'milliliters'],
    package: ['package', 'packages'],
    stick: ['stick', 'sticks'],
    piece: ['piece', 'pieces'],
    pinch: ['pinch', 'pinchs'],
    clove: ['clove', 'cloves'],
    slice: ['slice', 'slices'],
    can: ['can', 'cans'],
    box: ['box', 'boxes'],
    bag: ['bag', 'bags'],
    small: ['small', 'small'],
    medium: ['medium', 'medium'],
    large: ['large', 'large'],
  },
  symbols: {
    cup: 'c',
    gallon: 'gal',
    ounce: 'oz',
    pint: 'pt',
    pound: 'lb',
    quart: 'qt',
    tablespoon: 'tbs',
    teaspoon: 'tsp',
    gram: 'g',
    kilogram: 'kg',
    liter: 'lt',
    centiliter: 'cl',
    milligram: 'mg',
    milliliter: 'ml',
    package: '',
    stick: '',
    piece: '',
    pinch: '',
    clove: '',
    slice: '',
    can: '',
    box: '',
    bag: '',
    small: '',
    medium: '',
    large: '',
  },
  articles: ['an', 'a', 'of'],
};

export default defineLocale('en', locale);
