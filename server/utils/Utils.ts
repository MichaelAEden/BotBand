export const selectRandom = (items) => {
  if (!items.length) throw new Error("Empty items!");
  return items[Math.floor(Math.random() * items.length)];
};

export const selectRandomWeighted = (items, weights, n) => {
  if (items.length !== weights.length)
    throw new Error("Items and weights must be same length!");

  // If weights are all 0, set all values to 1
  // Otherwise, array of undefined elements is returned
  if (!weights.some((weight) => weight !== 0))
    weights.map((weight) => weight + 1);

  let sum = 0;
  let segments = new Array();
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    segments.push(sum);
  }

  let choices = new Array();
  for (let i = 0; i < n; i++) {
    const item =
      items[
        segments.filter((segment) => segment <= Math.random() * sum).length
      ];
    choices.push(item);
  }

  return choices;
};
