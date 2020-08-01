import { getAnalysis, diffMeansInterval95 } from "../experiments/StatisticalAnalysis";

test("get statistical analysis of provided data set", () => {
  const data = [3.1, 5.2, 4.3, 2.1, 9.0];

  const analysis = getAnalysis(data);
  expect(analysis.min).toBeCloseTo(2.1);
  expect(analysis.max).toBeCloseTo(9.0);
  expect(analysis.range).toBeCloseTo(9.0 - 2.1);
  expect(analysis.n).toBe(5);
  expect(analysis.mean).toBeCloseTo(4.74);
  expect(analysis.std).toBeCloseTo(2.66);
});

test("get difference of means interval with 95% confidence between two data sets", () => {
  const data1 = [3.1, 5.2, 4.3, 2.1, 9.0];
  const data2 = [1.9, 0.1, 4.6, 3.2, 9.1];

  const analysis1 = getAnalysis(data1);
  const analysis2 = getAnalysis(data2);

  const diffMeans = diffMeansInterval95(analysis1, analysis2);

  expect(diffMeans.lower).toBeCloseTo(-5.93);
  expect(diffMeans.upper).toBeCloseTo(4.01);
});
