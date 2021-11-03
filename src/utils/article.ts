import {Options} from '../types/general';

import removeAccentuation from './removeAccentuation';

import locales from '../locales';

export default function getArticle(
  data: string = '',
  options: Options,
): [string | null, string] {
  const trimmedData = data.trim();
  const input = removeAccentuation(trimmedData);
  const articles = locales[options.language.from].articles;

  for (const articleRegex of articles) {
    const match = input.match(articleRegex);

    if (match?.[1]) {
      const article = match?.[1]?.toLocaleLowerCase?.() ?? '';
      const restOfIngredient = trimmedData.replace(article, '').trim();

      return [article?.toLowerCase?.()?.trim?.() || null, restOfIngredient];
    }
  }

  return [null, input];
}
