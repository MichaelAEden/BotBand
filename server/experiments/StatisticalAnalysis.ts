import { Bot } from "../src/models/Bot";
import { getMusicalFitness } from "../src/ga/Fitness";

interface StatisticalAnalysis {
  min: number;
  max: number;
  range: number;
  average: number;
}

export const runAnalysis = (arr: number[]): StatisticalAnalysis => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min;
  const average = getAverage(arr);
  return {
    min,
    max,
    range,
    average,
  };
};

export const getAverage = (arr: number[]) => arr.reduce((sum, n) => sum + n) / arr.length;

// Metrics to measure for each trial
export const getAverageFitness = (bots: Bot[]) => getAverage(bots.map(getMusicalFitness));
// TODO: add metric for diversity
