import parse, {combine, pretty} from '../index';

describe('ingredient parser', () => {
  describe('translates the quantity', () => {
    it('of "1 teaspoon water"', () => {
      expect(parse('1 teaspoon water').quantity).toBe('1');
    });
    it('of "1.5 teaspoon water"', () => {
      expect(parse('1.5 teaspoon water').quantity).toBe('1.5');
    });
    it('of "1 1/2 teaspoon water"', () => {
      expect(parse('1 1/2 teaspoon water').quantity).toBe('1.5');
    });
    it('of "1/3 teaspoon water"', () => {
      expect(parse('1/3 cup water').quantity).toBe('0.333');
    });
    it('of "1/2 teaspoon water"', () => {
      expect(parse('1/2 teaspoon water').quantity).toBe('0.5');
    });
    it('of "10 1/2 teaspoon water"', () => {
      expect(parse('10 1/2 teaspoon water').quantity).toBe('10.5');
    });
    it('of "about 1/2 teaspoon water"', () => {
      expect(parse('about 1/2 teaspoon water').quantity).toBe('0.5');
    });

    describe('translates the quantity range', () => {
      it('of "10-20 teaspoon water"', () => {
        expect(parse('10-20 teaspoon water').quantity).toBe('10-20');
      });
      it('of "10 - 20 teaspoon water"', () => {
        expect(parse('10 - 20 teaspoon water').quantity).toBe('10-20');
      });
      it('of "10 to 20 teaspoon water"', () => {
        expect(parse('10 to 20 teaspoon water').quantity).toBe('10-20');
      });
    });

    describe('of unicode fractions', () => {
      const unicodeAmounts = [
        '¼',
        '½',
        '¾',
        '⅐',
        '⅑',
        '⅒',
        '⅓',
        '⅔',
        '⅕',
        '⅖',
        '⅗',
        '⅘',
        '⅙',
        '⅚',
        '⅛',
        '⅜',
        '⅝',
        '⅞',
      ];
      const unicodeExpectedAmounts = [
        '0.25',
        '0.5',
        '0.75',
        '0.142',
        '0.111',
        '0.1',
        '0.333',
        '0.666',
        '0.2',
        '0.4',
        '0.6',
        '0.8',
        '0.166',
        '0.833',
        '0.125',
        '0.375',
        '0.625',
        '0.875',
      ];

      for (let u = 0; u < unicodeAmounts.length; u++) {
        const element = unicodeAmounts[u];
        const expectedAmount = unicodeExpectedAmounts[u];
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} teaspoon water`).quantity).toBe(
            expectedAmount,
          );
        });
      }

      const mixedValues = [
        '1¼',
        '2½',
        '3¾',
        '4⅐',
        '5⅑',
        '6⅒',
        '7⅓',
        '8⅔',
        '9⅕',
        '10⅖',
        '11⅗',
        '12⅘',
        '13⅙',
        '14⅚',
        '15⅛',
        '16⅜',
        '17⅝',
        '18⅞',
      ];
      const mixedExpectedValues = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
      ];

      for (let u = 0; u < mixedValues.length; u++) {
        const element = mixedValues[u];
        const expectedAmount = (
          Number(mixedExpectedValues[u]) + Number(unicodeExpectedAmounts[u])
        ).toString();
        it(`${element} to ${expectedAmount}`, () => {
          expect(parse(`${element} teaspoon water`).quantity).toBe(
            expectedAmount,
          );
        });
      }
    });

    it('150 cl of milk', () => {
      expect(parse('150 cl of milk')).toEqual({
        quantity: '150',
        unit: 'centiliters',
        symbol: 'cl',
        ingredient: 'milk',
        article: 'of',
        minQty: '150',
        maxQty: '150',
      });
    });

    it("doesn't freak out if a strange unicode character is present", () => {
      expect(parse('1/3 cup confectioners’ sugar')).toEqual({
        quantity: '0.333',
        unit: 'cup',
        symbol: 'c',
        ingredient: 'confectioners’ sugar',
        article: null,
        minQty: '0.333',
        maxQty: '0.333',
      });
    });
  });

  describe('translates the literal units', () => {
    it('of "1 cup water"', () => {
      expect(parse('1 cup water').unit).toBe('cup');
    });
    it('of "1 gallon water"', () => {
      expect(parse('1 gallon water').unit).toBe('gallon');
    });
    it('of "1 ounce water"', () => {
      expect(parse('1 ounce water').unit).toBe('ounce');
    });
    it('of "1 pint water"', () => {
      expect(parse('1 pint water').unit).toBe('pint');
    });
    it('of "1 pound water"', () => {
      expect(parse('1 pound water').unit).toBe('pound');
    });
    it('of "1 quart water"', () => {
      expect(parse('1 quart water').unit).toBe('quart');
    });
    it('of "1 tablespoon water"', () => {
      expect(parse('1 tablespoon water').unit).toBe('tablespoon');
    });
    it('of "1 teaspoon water"', () => {
      expect(parse('1 teaspoon water').unit).toBe('teaspoon');
    });
    it('of "1 gram water"', () => {
      expect(parse('1 gram water').unit).toBe('gram');
    });
    it('of "1 kilogram water"', () => {
      expect(parse('1 kilogram water').unit).toBe('kilogram');
    });
    it('of "1 liter water"', () => {
      expect(parse('1 liter water').unit).toBe('liter');
    });
    it('of "1 milligram water"', () => {
      expect(parse('1 milligram water').unit).toBe('milligram');
    });
    it('of "1 milliliter water"', () => {
      expect(parse('1 milliliter water').unit).toBe('milliliter');
    });
    it('of "1 large onion"', () => {
      expect(parse('1 large onion').unit).toBe('large');
    });
    it('of "1 whole onion"', () => {
      expect(parse('1 whole onion').unit).toBe(null);
    });
    it('of "1 clove garlic"', () => {
      expect(parse('1 clove garlic').unit).toBe('clove');
    });
    it('of "1 bag garlic"', () => {
      expect(parse('1 bag garlic').unit).toBe('bag');
    });
    it('of "1 package sausage"', () => {
      expect(parse('1 package sausage').unit).toBe('package');
    });
    it('"1 pinch water"', () => {
      expect(parse('1 pinch salt').unit).toBe('pinch');
    });
    it('"1 (14.5 oz) can tomatoes"', () => {
      expect(parse('1 (14.5 oz) can tomatoes')).toEqual({
        unit: 'can',
        symbol: null,
        quantity: '1',
        ingredient: 'tomatoes (14.5 oz)',
        article: null,
        minQty: '1',
        maxQty: '1',
      });
    });
    it('"25 lb beef stew chunks (or buy a roast and chop into small cubes)"', () => {
      expect(
        parse(
          '25 lb beef stew chunks (or buy a roast and chop into small cubes)',
        ),
      ).toEqual({
        unit: 'pounds',
        symbol: 'lb',
        quantity: '25',
        ingredient:
          'beef stew chunks (or buy a roast and chop into small cubes)',
        article: null,
        minQty: '25',
        maxQty: '25',
      });
    });
    it('"parses ingredient with range: 1 to 2 chicken breasts"', () => {
      expect(parse('1 to 2 chicken breasts')).toEqual({
        unit: null,
        symbol: null,
        quantity: '1-2',
        ingredient: 'chicken breasts',
        article: null,
        minQty: '1',
        maxQty: '2',
      });
    });
    it('"parses ingredient with range: 1 - 2 chicken breasts"', () => {
      expect(parse('1 - 2 chicken breasts')).toEqual({
        unit: null,
        symbol: null,
        quantity: '1-2',
        ingredient: 'chicken breasts',
        article: null,
        minQty: '1',
        maxQty: '2',
      });
    });
    it('"parses ingredient with range: 1-2 chicken breasts"', () => {
      expect(parse('1-2 chicken breasts')).toEqual({
        unit: null,
        symbol: null,
        quantity: '1-2',
        ingredient: 'chicken breasts',
        article: null,
        minQty: '1',
        maxQty: '2',
      });
    });
    it('"1 (16 oz) box pasta"', () => {
      expect(parse('1 (16 oz) box pasta')).toEqual({
        unit: 'box',
        symbol: null,
        quantity: '1',
        ingredient: 'pasta (16 oz)',
        article: null,
        minQty: '1',
        maxQty: '1',
      });
    });
    it('"1 slice cheese"', () => {
      expect(parse('1 slice cheese')).toEqual({
        unit: 'slice',
        symbol: null,
        quantity: '1',
        ingredient: 'cheese',
        article: null,
        minQty: '1',
        maxQty: '1',
      });
    });
  });

  it('translates unit when no unit provided', () => {
    expect(parse('1 tortilla')).toEqual({
      unit: null,
      symbol: null,
      ingredient: 'tortilla',
      article: null,
      quantity: '1',
      minQty: '1',
      maxQty: '1',
    });
  });

  it("doesn't explode when no unit and no quantity provided", () => {
    expect(parse('powdered sugar')).toEqual({
      unit: null,
      symbol: null,
      ingredient: 'powdered sugar',
      article: null,
      quantity: null,
      minQty: null,
      maxQty: null,
    });
  });

  describe('translates the abbreviated units of', () => {
    it('"1 cup water"', () => {
      expect(parse('1 c water').unit).toBe('cup');
      expect(parse('2 c. water').unit).toBe('cups');
      expect(parse('2 cups water').unit).toBe('cups');
    });
    it('"1 gallon water"', () => {
      expect(parse('1 gal water').unit).toBe('gallon');
      expect(parse('1 gallons water').unit).toBe('gallon');
    });
    it('"1 ounce water"', () => {
      expect(parse('1 oz water').unit).toBe('ounce');
      expect(parse('1 oz. water').unit).toBe('ounce');
      expect(parse('2 ounces water').unit).toBe('ounces');
    });
    it('"1 pint water"', () => {
      expect(parse('1 pt water').unit).toBe('pint');
      expect(parse('2 pts water').unit).toBe('pints');
      expect(parse('1 pt. water').unit).toBe('pint');
      expect(parse('2 pints water').unit).toBe('pints');
    });
    it('"1 pound water"', () => {
      expect(parse('1 lb water').unit).toBe('pound');
      expect(parse('1 lb. water').unit).toBe('pound');
      expect(parse('2 lbs water').unit).toBe('pounds');
      expect(parse('2 pounds water').unit).toBe('pounds');
    });
    it('"1 quart water"', () => {
      expect(parse('1 qt water').unit).toBe('quart');
      expect(parse('1 qt. water').unit).toBe('quart');
      expect(parse('1 qts water').unit).toBe('quart');
      expect(parse('1 quarts water').unit).toBe('quart');
    });
    it('"1 tablespoon water"', () => {
      expect(parse('1 T water').unit).toBe('tablespoon');
      expect(parse('1 T. water').unit).toBe('tablespoon');
      expect(parse('1 tbs water').unit).toBe('tablespoon');
      expect(parse('1 tbsp water').unit).toBe('tablespoon');
      expect(parse('1 tbspn water').unit).toBe('tablespoon');
      expect(parse('1 tablespoon water').unit).toBe('tablespoon');
      expect(parse('2 tablespoons water').unit).toBe('tablespoons');
    });
    it('"1 teaspoon water"', () => {
      expect(parse('1 tsp water').unit).toBe('teaspoon');
      expect(parse('1 tspn water').unit).toBe('teaspoon');
      expect(parse('1 t water').unit).toBe('teaspoon');
      expect(parse('1 t. water').unit).toBe('teaspoon');
      expect(parse('2 teaspoons water').unit).toBe('teaspoons');
    });
    it('"1 gram water"', () => {
      expect(parse('1 g water').unit).toBe('gram');
      expect(parse('1 g. water').unit).toBe('gram');
      expect(parse('2 grams water').unit).toBe('grams');
    });
    it('"1 kilogram water"', () => {
      expect(parse('1 kg water').unit).toBe('kilogram');
      expect(parse('1 kg. water').unit).toBe('kilogram');
      expect(parse('2 kilograms water').unit).toBe('kilograms');
    });
    it('"1 liter water"', () => {
      expect(parse('1 l water').unit).toBe('liter');
      expect(parse('1 l. water').unit).toBe('liter');
      expect(parse('2 liters water').unit).toBe('liters');
    });
    it('"1 milligram water"', () => {
      expect(parse('1 mg water').unit).toBe('milligram');
      expect(parse('1 mg. water').unit).toBe('milligram');
      expect(parse('1 milligrams water').unit).toBe('milligram');
    });
    it('"1 milliliter water"', () => {
      expect(parse('1 ml water').unit).toBe('milliliter');
      expect(parse('1 ml. water').unit).toBe('milliliter');
      expect(parse('1 milliliters water').unit).toBe('milliliter');
    });
    it('"1 pinch water"', () => {
      expect(parse('2 pinches salt').unit).toBe('pinchs');
    });
  });

  describe('translates the ingredient of', () => {
    it('"1 teaspoon water"', () => {
      expect(parse('1 teaspoon water').ingredient).toBe('water');
    });
    it('"1 teaspoon milk"', () => {
      expect(parse('1 teaspoon milk').ingredient).toBe('milk');
    });
  });
});

describe('combine ingredients', () => {
  it('accepts an empty array', () => {
    expect(combine([])).toEqual([]);
  });

  it('returns sorted ingredients', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'apples',
        article: null,
        quantity: '2',
        unit: 'pound',
        symbol: 'lb',
        minQty: '2',
        maxQty: '2',
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'apples',
        article: null,
        quantity: '2',
        unit: 'pound',
        symbol: 'lb',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
    ]);
  });

  it('combines two ingredient objects into one', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'butter',
        article: null,
        quantity: '4',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '4',
        maxQty: '4',
      },
    ]);
  });

  it('combines three ingredient objects into one', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'butter',
        article: null,
        quantity: '6',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '6',
        maxQty: '6',
      },
    ]);
  });

  it('combines four ingredient objects into two', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'apple',
        article: null,
        quantity: '2',
        unit: 'pound',
        symbol: 'lb',
        minQty: '2',
        maxQty: '2',
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'apple',
        article: null,
        quantity: '2',
        unit: 'pound',
        symbol: 'lb',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '6',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '6',
        maxQty: '6',
      },
    ]);
  });

  it('combines 2 ingredients that have a quantity range', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '3',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '1',
        maxQty: '2',
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'butter',
        article: null,
        quantity: '4',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '3',
        maxQty: '5',
      },
    ]);
  });

  it('combines 1 ingredient with no range, and 1 with a range', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        article: null,
        quantity: '10',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '1',
        maxQty: '10',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'butter',
        article: null,
        quantity: '12',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '3',
        maxQty: '12',
      },
    ]);
  });

  it('combines 2 ingredient with a range, and 1 different ingredient without a range', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        article: null,
        quantity: '10',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '1',
        maxQty: '10',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'apple',
        article: null,
        quantity: '2',
        unit: null,
        symbol: null,
        minQty: '2',
        maxQty: '2',
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'apple',
        article: null,
        quantity: '2',
        unit: null,
        symbol: null,
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '12',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '3',
        maxQty: '12',
      },
    ]);
  });

  it('does not combine if ingredients have different units (for now)', () => {
    const ingredientArray = [
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '2',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '1',
        unit: 'stick',
        symbol: null,
        minQty: '1',
        maxQty: '1',
      },
      {
        ingredient: 'apple',
        article: null,
        quantity: '2',
        unit: 'pound',
        symbol: 'lb',
        minQty: '2',
        maxQty: '2',
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'apple',
        article: null,
        quantity: '2',
        unit: 'pound',
        symbol: 'lb',
        minQty: '2',
        maxQty: '2',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '4',
        unit: 'tablespoon',
        symbol: 'tbs',
        minQty: '4',
        maxQty: '4',
      },
      {
        ingredient: 'butter',
        article: null,
        quantity: '1',
        unit: 'stick',
        symbol: null,
        minQty: '1',
        maxQty: '1',
      },
    ]);
  });

  it('handles the no-unit case', () => {
    const ingredientArray = [
      {
        ingredient: 'tortilla',
        article: null,
        quantity: '10',
        unit: null,
        symbol: null,
        minQty: '10',
        maxQty: '10',
      },
      {
        ingredient: 'tortilla',
        article: null,
        quantity: '5',
        unit: null,
        symbol: null,
        minQty: '5',
        maxQty: '5',
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'tortilla',
        article: null,
        quantity: '15',
        unit: null,
        symbol: null,
        minQty: '15',
        maxQty: '15',
      },
    ]);
  });

  it('handles the no-unit and no-quantity case', () => {
    const ingredientArray = [
      {
        ingredient: 'Powdered Sugar',
        article: null,
        quantity: null,
        unit: null,
        symbol: null,
        minQty: null,
        maxQty: null,
      },
      {
        ingredient: 'Powdered Sugar',
        article: null,
        quantity: null,
        unit: null,
        symbol: null,
        minQty: null,
        maxQty: null,
      },
    ];
    expect(combine(ingredientArray)).toEqual([
      {
        ingredient: 'Powdered Sugar',
        article: null,
        quantity: null,
        unit: null,
        symbol: null,
        minQty: null,
        maxQty: null,
      },
    ]);
  });
});

describe('pretty printing press', () => {
  const ingredients = [
    {
      ingredient: 'milk',
      article: 'of',
      unit: 'cups',
      symbol: 'c',
      quantity: '1.5',
      minQty: '1.5',
      maxQty: '1.5',
    },
    {
      ingredient: 'milk',
      article: 'of',
      unit: 'cup',
      symbol: 'c',
      quantity: '0.25',
      minQty: '0.25',
      maxQty: '0.25',
    },
    {
      ingredient: 'milk',
      article: 'of',
      unit: 'cup',
      symbol: 'c',
      quantity: '1',
      minQty: '1',
      maxQty: '1',
    },
    {
      ingredient: 'something',
      article: 'of',
      unit: 'boxes',
      symbol: null,
      quantity: '2',
      minQty: '2',
      maxQty: '2',
    },
    {
      ingredient: 'milk',
      article: 'of',
      unit: 'teaspoons',
      symbol: 'tbs',
      quantity: '1.333',
      minQty: '1.333',
      maxQty: '1.333',
    },
    {
      ingredient: 'milk',
      article: 'of',
      unit: 'teaspoons',
      symbol: 'tbs',
      quantity: '1.666',
      minQty: '1.666',
      maxQty: '1.666',
    },
    {
      ingredient: 'milk',
      article: 'of',
      unit: 'teaspoons',
      symbol: 'tbs',
      quantity: '1.111',
      minQty: '1.111',
      maxQty: '1.111',
    },
    {
      ingredient: 'milk',
      article: 'of',
      unit: 'teaspoons',
      symbol: 'tbs',
      quantity: '1.166',
      minQty: '1.166',
      maxQty: '1.166',
    },
    {
      ingredient: 'milk',
      article: 'of',
      unit: 'teaspoons',
      symbol: 'tbs',
      quantity: '1.833',
      minQty: '1.1833',
      maxQty: '1.1833',
    },
    {
      ingredient: 'powdered sugar',
      article: null,
      unit: null,
      symbol: null,
      quantity: null,
      minQty: null,
      maxQty: null,
    },
    {
      ingredient: 'eggs',
      article: null,
      unit: null,
      symbol: null,
      quantity: '18',
      minQty: '18',
      maxQty: '18',
    },
    {
      ingredient: 'large eggs',
      article: null,
      unit: null,
      symbol: null,
      quantity: '18',
      minQty: '18',
      maxQty: '18',
    },
  ];
  const expectedOutcome = [
    '1 1/2 cups of milk',
    '1/4 cup of milk',
    '1 cup of milk',
    '2 boxes of something',
    '1 1/3 teaspoons of milk',
    '1 2/3 teaspoons of milk',
    '1 1/9 teaspoons of milk',
    '1 1/6 teaspoons of milk',
    '1 5/6 teaspoons of milk',
    'powdered sugar',
    '18 eggs',
    '18 large eggs',
  ];
  for (let i = 0; i < ingredients.length; i++) {
    it(`returns expected outcome ${expectedOutcome[i]}`, () => {
      expect(pretty(ingredients[i])).toBe(expectedOutcome[i]);
    });
  }
});
