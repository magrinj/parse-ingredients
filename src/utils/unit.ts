import {Locale, Options} from '../types/general';

import removeAccentuation from './removeAccentuation';
import getFirstMatch from './getFirstMatch';

import locales from '../locales';

interface Unit {
  match: string | null;
  singular: string | null;
  plural: string | null;
  symbol: string | null;
}

export default function getUnit(data: string, options: Options): Unit | null {
  // Remove accent
  const input = removeAccentuation(data);
  const units = locales[options.language.from].units;
  const translations = locales[options.language.to].translations;
  const symbols = locales[options.language.to].symbols;
  let result = null;

  for (const key of Object.keys(units)) {
    const unit = key as keyof Locale['units'];

    for (const shorthand of units[unit]) {
      // Escape all special character inside the string
      const regex = shorthand.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      // Test if a match happen in the current input
      const match = getFirstMatch(
        `${input} `,
        new RegExp(`^${regex}\ `),
      )?.trim?.();

      if (match && (result === null || result.match.length < match?.length)) {
        result = {
          match: match ?? null,
          singular: translations[unit][0],
          plural: translations[unit][1],
          symbol: symbols[unit],
        };
      }
    }
  }

  return result;
}
