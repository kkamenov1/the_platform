export const addFirstPossible = (val, arr) => {
  const index = arr.findIndex((obj) => obj.src === null);
  return arr.map((item, idx) => {
    if (idx === index) return val;
    return item;
  });
};

export const addOnPosition = (pos, val, arr) => arr.map((item, idx) => {
  if (idx === pos) return val;
  return item;
});

export const getMinimalPrice = (methods) => Math.min(
  ...methods.map((item) => Number(item.price)),
);

export const formatNumber = (value) => Number(value).toLocaleString();

export const getCategorySlug = (name) => name
  .split(', ')
  .map((item) => item.split(' ').join('-'))
  .join('--');

export const getCategoryName = (slug) => slug
  .split('--')
  .map(decodeURIComponent)
  .map((item) => item.split('-').join(' '))
  .join(', ');
