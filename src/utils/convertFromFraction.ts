function keepThreeDecimals(val: number) {
  const strVal = val.toString();
  const parts = strVal.split('.');

  return parts[1] ? parts[0] + '.' + parts[1].substring(0, 3) : parts[0];
}

export default function convertFromFraction(value: string) {
  // number comes in, for example: 1 1/3
  if (value && value.split(' ').length > 1) {
    const [whole, fraction] = value.split(' ');
    const [a, b] = fraction.split('/');
    const remainder = parseFloat(a) / parseFloat(b);
    const wholeAndFraction = parseInt(whole, 10)
      ? parseInt(whole, 10) + remainder
      : remainder;

    return keepThreeDecimals(wholeAndFraction);
  } else if (!value || value.split('-').length > 1) {
    return value;
  } else {
    const [a, b] = value.split('/');

    return b ? keepThreeDecimals(parseFloat(a) / parseFloat(b)) : a;
  }
}
