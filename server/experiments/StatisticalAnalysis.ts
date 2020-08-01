import { Bot } from "../src/models/Bot";
import { getMusicalFitness } from "../src/ga/Fitness";
import { sqrt, square, mean as getMean, std as getStd } from "mathjs";

interface ConfidenceInterval {
  lower: number;
  upper: number;
}

interface StatisticalAnalysis {
  n: number;
  min: number;
  max: number;
  range: number;
  mean: number;
  std: number;
}

export const getAnalysis = (arr: number[]): StatisticalAnalysis => {
  const n = arr.length;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min;
  const mean = getMean(arr);
  const std = getStd(arr);
  return {
    n,
    min,
    max,
    range,
    mean,
    std,
  };
};

// Compute an interval for a difference of means with a 95% confidence
export const diffMeansInterval95 = (
  control: StatisticalAnalysis,
  test: StatisticalAnalysis
): ConfidenceInterval => {
  const diff = test.mean - control.mean;
  const err = sqrt(square(test.std) / test.n + square(control.std) / control.n);
  const interval = getTValue95(Math.max(test.n, control.n)) * err;
  return {
    lower: diff - interval,
    upper: diff + interval,
  };
};

export const getAverageFitness = (bots: Bot[]) => getMean(bots.map(getMusicalFitness));

const getTValue95 = (degrees) => {
  if (degrees <= 1) return 12.706;
  else if (degrees <= 2) return 4.303;
  else if (degrees <= 3) return 3.182;
  else if (degrees <= 4) return 2.776;
  else if (degrees <= 5) return 2.571;
  else if (degrees <= 6) return 2.447;
  else if (degrees <= 7) return 2.365;
  else if (degrees <= 8) return 2.306;
  else if (degrees <= 9) return 2.262;
  else if (degrees <= 10) return 2.228;
  else if (degrees <= 11) return 2.201;
  else if (degrees <= 12) return 2.179;
  else if (degrees <= 13) return 2.16;
  else if (degrees <= 14) return 2.145;
  else if (degrees <= 15) return 2.131;
  else if (degrees <= 16) return 2.12;
  else if (degrees <= 17) return 2.11;
  else if (degrees <= 18) return 2.101;
  else if (degrees <= 19) return 2.093;
  else if (degrees <= 20) return 2.086;
  else if (degrees <= 21) return 2.08;
  else if (degrees <= 22) return 2.074;
  else if (degrees <= 23) return 2.069;
  else if (degrees <= 24) return 2.064;
  else if (degrees <= 25) return 2.06;
  else if (degrees <= 26) return 2.056;
  else if (degrees <= 27) return 2.052;
  else if (degrees <= 28) return 2.048;
  else if (degrees <= 29) return 2.045;
  else if (degrees <= 30) return 2.042;
  else if (degrees <= 31) return 2.04;
  else if (degrees <= 32) return 2.037;
  else if (degrees <= 33) return 2.035;
  else if (degrees <= 34) return 2.032;
  else if (degrees <= 35) return 2.03;
  else if (degrees <= 36) return 2.028;
  else if (degrees <= 37) return 2.026;
  else if (degrees <= 38) return 2.024;
  else if (degrees <= 39) return 2.023;
  else if (degrees <= 40) return 2.021;
  else if (degrees <= 42) return 2.018;
  else if (degrees <= 44) return 2.015;
  else if (degrees <= 46) return 2.013;
  else if (degrees <= 48) return 2.011;
  else if (degrees <= 50) return 2.009;
  else if (degrees <= 60) return 2.0;
  else if (degrees <= 70) return 1.994;
  else if (degrees <= 80) return 1.99;
  else if (degrees <= 90) return 1.987;
  else if (degrees <= 100) return 1.984;
  else if (degrees <= 120) return 1.98;
  else if (degrees <= 150) return 1.976;
  else if (degrees <= 200) return 1.972;
  else if (degrees <= 300) return 1.968;
  else if (degrees <= 500) return 1.965;
  else return 1.96;
};
