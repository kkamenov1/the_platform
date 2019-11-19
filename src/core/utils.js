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
