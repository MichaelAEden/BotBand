import { Bot } from "../src/models/Bot";
import { getMusicalFitness } from "../src/ga/Fitness";
import { std, sqrt, square } from "mathjs";

interface ConfidenceInterval {
  lower: number;
  upper: number;
}

interface StatisticalAnalysis {
  n: number;
  min: number;
  max: number;
  range: number;
  average: number;
  standardDeviation: number;
}

export const getAnalysis = (arr: number[]): StatisticalAnalysis => {
  const n = arr.length;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min;
  const average = getAverage(arr);
  const standardDeviation = std(arr);
  return {
    n,
    min,
    max,
    range,
    average,
    standardDeviation,
  };
};

// Compute an interval for a difference of means with a 95% confidence
export const diffMeansInterval95 = (
  control: StatisticalAnalysis,
  test: StatisticalAnalysis
): ConfidenceInterval => {
  const diff = test.average - control.average;
  const err = sqrt(
    square(test.standardDeviation) / test.n + square(control.standardDeviation) / control.n
  );
  // We assume n is sufficiently large such that a z-distribution can be used
  // 1.96 is used for 95% confidence
  const interval = 1.96 * err;
  return {
    lower: diff - interval,
    upper: diff + interval,
  };
};

export const getAverage = (arr: number[]) => arr.reduce((sum, n) => sum + n) / arr.length;

// Metrics to measure for each trial
export const getAverageFitness = (bots: Bot[]) => getAverage(bots.map(getMusicalFitness));
// TODO: add metric for diversity
