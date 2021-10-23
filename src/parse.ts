import {Options, Ingredient} from './types/general';

import convertFromFraction from './utils/convertFromFraction';
import getFirstMatch from './utils/getFirstMatch';
import findQuantityAndConvertIfUnicode from './utils/findQuantityAndCovertIfUnicode';
import getUnit from './utils/unit';
import getArticle from './utils/article';

import locales from './locales';

const defaultOptions: Options = {
  language: {
    from: 'en',
    to: 'en',
  },
};

export default function parse(
  line: string,
  options: Options = defaultOptions,
): Ingredient {
  if (!locales[options?.language?.from] || !locales[options?.language?.to]) {
    throw new Error('One of the locale you have provided is not supported.');
  }

  // removes leading and trailing whitespace
  const ingredientLine = line.trim();

  /* restOfIngredient represents rest of ingredient line.
  For example: "1 pinch salt" --> quantity: 1, restOfIngredient: pinch salt */
  let [quantity, restOfIngredient] = findQuantityAndConvertIfUnicode(
    ingredientLine,
  ) as string[];

  quantity = convertFromFraction(quantity);

  /* extraInfo will be any info in parantheses. We'll place it at the end of the ingredient.
  For example: "sugar (or other sweetener)" --> extraInfo: "(or other sweetener)" */
  let extraInfo;
  if (getFirstMatch(restOfIngredient, /\(([^\)]+)\)/)) {
    extraInfo = getFirstMatch(restOfIngredient, /\(([^\)]+)\)/);
    restOfIngredient = restOfIngredient.replace(extraInfo, '').trim();
  }

  // grab unit and turn it into non-plural version, for ex: "Tablespoons" OR "Tsbp." --> "tablespoon"
  const unit = getUnit(restOfIngredient, options);
  // remove unit from the ingredient if one was found and trim leading and trailing whitespace
  let ingredient = unit?.match
    ? restOfIngredient.replace(unit.match, '').trim()
    : restOfIngredient;

  // grab article
  let article: string | null = null;
  [article, ingredient] = getArticle(ingredient, options);

  let minQty = quantity; // default to quantity
  let maxQty = quantity; // default to quantity
  let plural = false;

  // if quantity is non-nil and is a range, for ex: "1-2", we want to get minQty and maxQty
  if (quantity && quantity.includes('-')) {
    [minQty, maxQty] = quantity.split('-');
  }

  // @ts-ignore
  if (!isNaN(maxQty)) {
    plural = parseFloat(maxQty) > 1;
  }

  return {
    quantity,
    unit: (plural ? unit?.plural : unit?.singular) || null,
    symbol: unit?.symbol || null,
    ingredient: extraInfo ? `${ingredient} ${extraInfo}` : ingredient,
    article,
    minQty,
    maxQty,
  };
}
