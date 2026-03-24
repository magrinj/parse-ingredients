import { Locale } from './types/general';

const locales = {} as { [key: string]: Locale };

export const defineLocale = (key: string, config: Locale) => {
  locales[key] = config;
};

export default locales;
