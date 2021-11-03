import {Options} from '../types/general';

import removeAccentuation from './removeAccentuation';
import getFirstMatch from './getFirstMatch';

import locales from '../locales';

const unicodeObj: {[key: string]: string} = {
  '½': '1/2',
  '⅓': '1/3',
  '⅔': '2/3',
  '¼': '1/4',
  '¾': '3/4',
  '⅕': '1/5',
  '⅖': '2/5',
  '⅗': '3/5',
  '⅘': '4/5',
  '⅙': '1/6',
  '⅚': '5/6',
  '⅐': '1/7',
  '⅛': '1/8',
  '⅜': '3/8',
  '⅝': '5/8',
  '⅞': '7/8',
  '⅑': '1/9',
  '⅒': '1/10',
};

export default function findQuantityAndConvertIfUnicode(
  ingredientLine: string,
  options: Options,
) {
  const language = options.language.from;
  const cleanedLine = removeAccentuation(ingredientLine);
  const numericAndFractionRegex = /^(\d+\/\d+)|(\d+\s\d+\/\d+)|(\d+.\d+)|\d+/g;
  const prepositions = locales[language].prepositions.join('|'); // Get language preposition
  const numericRangeWithSpaceRegex = new RegExp(
    `^(\\d+\\-\\d+)|^(\\d+\\s\\-\\s\\d+)|^(\\d+\\s(${prepositions})\\s\\d+)`,
    'g',
  ); // for ex: "1 to 2" or "1 - 2"
  const unicodeFractionRegex = /\d*[^\u0000-\u007F]+/g;
  const onlyUnicodeFraction = /[^\u0000-\u007F]+/g;

  // found a unicode quantity inside our regex, for ex: '⅝'
  if (ingredientLine.match(unicodeFractionRegex)) {
    const numericPart = getFirstMatch(ingredientLine, numericAndFractionRegex);
    const unicodePart = getFirstMatch(
      ingredientLine,
      numericPart ? onlyUnicodeFraction : unicodeFractionRegex,
    );

    // If there's a match for the unicodePart in our dictionary above
    if (unicodeObj[unicodePart]) {
      return [
        `${numericPart} ${unicodeObj[unicodePart]}`,
        ingredientLine
          .replace(getFirstMatch(ingredientLine, unicodeFractionRegex), '')
          .trim(),
      ];
    }
  }

  // found a quantity range, for ex: "2 to 3"
  if (cleanedLine.match(numericRangeWithSpaceRegex)) {
    const quantity = getFirstMatch(cleanedLine, numericRangeWithSpaceRegex);
    const cleanedQuantity = quantity
      .replace(new RegExp(`(${prepositions})`), '-')
      .split(' ')
      .join('');
    const restOfIngredient = ingredientLine.slice(quantity.length).trim();
    return [cleanedQuantity, restOfIngredient];
  }

  // found a numeric/fraction quantity, for example: "1 1/3"
  else if (ingredientLine.match(numericAndFractionRegex)) {
    const quantity = getFirstMatch(ingredientLine, numericAndFractionRegex);
    const restOfIngredient = ingredientLine
      .replace(getFirstMatch(ingredientLine, numericAndFractionRegex), '')
      .trim();
    return [
      ingredientLine.match(numericAndFractionRegex) && quantity,
      restOfIngredient,
    ];
  }

  // no parse-able quantity found
  else {
    return [null, ingredientLine];
  }
}
