export const toEuroString = (value: number | string, format?: string) => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  const formatter = new Intl.NumberFormat(format ?? 'it-IT', {
    style: 'currency',
    currency: 'EUR',
  });
  const euroValue = parseFloat(value.toFixed(2));
  return formatter.format(euroValue);
};

export const toStandardDate = (
  stringDate: string,
  month?: 'short' | 'long' | 'numeric' | '2-digit' | 'narrow',
) => {
  const date = new Date(stringDate);
  if (isNaN(date.valueOf())) return '';
  return date.toLocaleString('default', {
    day: 'numeric',
    month: month ?? 'numeric',
    year: 'numeric',
  });
};
