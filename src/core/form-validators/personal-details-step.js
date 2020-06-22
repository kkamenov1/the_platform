// eslint-disable-next-line import/prefer-default-export
export const validate18YearOldDate = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year + 18, month - 1, day) > new Date()
    ? 'You must be at least 18 years old'
    : undefined;
};
