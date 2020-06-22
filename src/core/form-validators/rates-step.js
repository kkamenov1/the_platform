// eslint-disable-next-line import/prefer-default-export
export const checkMethodsForEmptyPricesMethods = (methods) => {
  const selectedMethods = methods.filter((method) => method.selected);

  const isThereInvalidPrice = selectedMethods.some((method) => {
    const priceParsed = +method.price;
    return isNaN(priceParsed) || priceParsed <= 0;
  });

  return isThereInvalidPrice
    ? 'Please provide valid price for all selected methods'
    : undefined;
};
