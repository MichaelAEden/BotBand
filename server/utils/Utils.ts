export const selectRandomWeighted = (items, getFitness, n) => {
  let sum = 0;
  let segments = new Array();
  for (let i = 0; i < items.length; i++) {
    sum += getFitness(items[i]);
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
