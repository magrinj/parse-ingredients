export interface Options {
  language: {
    from: string;
    to: string;
  };
}
export interface Units<T> {
  cup: T;
  gallon: T;
  ounce: T;
  pint: T;
  pound: T;
  quart: T;
  tablespoon: T;
  coffeespoon: T;
  teaspoon: T;
  gram: T;
  kilogram: T;
  liter: T;
  centiliter: T;
  milligram: T;
  milliliter: T;
  package: T;
  stick: T;
  piece: T;
  pinch: T;
  clove: T;
  slice: T;
  can: T;
  box: T;
  bag: T;
  leaf: T;
  sprig: T;
  unit: T;
  packet: T;
  dose: T;
  drop: T;
  cube: T;
  small: T;
  medium: T;
  large: T;
}

export interface Locale {
  units: Units<string[]>;
  translations: Units<[string, string]>;
  symbols: Units<string>;
  articles: string[];
}

export interface Ingredient {
  ingredient: string;
  quantity: string | null;
  unit: string | null;
  article: string | null;
  symbol: string | null;
  minQty: string | null;
  maxQty: string | null;
}
