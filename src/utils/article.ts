import {Options} from '../types/general';

import getFirstMatch from './getFirstMatch';

import locales from '../locales';

export default function getArticle(
  data: string = '',
  options: Options,
): [string | null, string] {
  const input = data.trim();
  const articles = locales[options.language.from].articles;
  const regex = new RegExp(`^(${articles.join('|')}) `, 'i');

  if (getFirstMatch(`${input} `, regex)) {
    const article = getFirstMatch(`${input} `, regex);
    const restOfIngredient = input.replace(article, '').trim();

    return [article?.toLowerCase?.()?.trim?.() || null, restOfIngredient];
  }

  return [null, input];
}
