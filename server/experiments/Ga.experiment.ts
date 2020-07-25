import { GaWorker } from "../src/ga/GaWorker";
import { getAnalysis, diffMeansInterval95, getAverageFitness } from "./StatisticalAnalysis";
import { runGaTrials } from "./Utils";
import { getDiversityMetric } from "./Diversity";

describe("GA Parameter Optimization Tests", () => {
  test("Pregenerated initial melodies yield greater fitness than random", () => {
    const config = GaWorker.defaultConfig();
    const trials = 1000;

    const controlResults = runGaTrials(
      { ...config, randomInitial: true },
      getAverageFitness,
      trials
    );
    const controlAnalysis = getAnalysis(controlResults);
    console.log(`Random initial melodies, fitnesses: ${JSON.stringify(controlAnalysis, null, 2)}`);

    const testResults = runGaTrials({ ...config, randomInitial: false }, getAverageFitness, trials);
    const testAnalysis = getAnalysis(testResults);
    console.log(
      `Pregenerated initial melodies, fitnesses:, ${JSON.stringify(testAnalysis, null, 2)}`
    );

    const diffMeans = diffMeansInterval95(controlAnalysis, testAnalysis);

    console.log(`Difference of means (95% confidence): ${JSON.stringify(diffMeans, null, 2)}`);
  });

  test("Increasing population size will increase fitness", () => {
    const config = GaWorker.defaultConfig();
    const trials = 1000;

    const controlResults = runGaTrials(config, getAverageFitness, trials);
    const controlAnalysis = getAnalysis(controlResults);
    console.log(`Control GA, fitnesses: ${JSON.stringify(controlAnalysis, null, 2)}`);

    const testResults = runGaTrials({ ...config, populationSize: 100 }, getAverageFitness, trials);
    const testAnalysis = getAnalysis(testResults);
    console.log(`Population of 100, fitnesses:, ${JSON.stringify(testAnalysis, null, 2)}`);

    const diffMeans = diffMeansInterval95(controlAnalysis, testAnalysis);

    console.log(`Difference of means (95% confidence): ${JSON.stringify(diffMeans, null, 2)}`);
  });

  test("Optimal parameters", () => {
    let trials = 1000;

    for (var points = 0.1; points <= 0.3; points += 0.05) {
      let config = {
        iterations: 5,
        mutationRate: points,
        noFavourateWeight: 0.5,
        musicalFitnessWeight: 1,
        randomInitial: false,
        populationSize: 10,
        selectionSize: 7,
      };
      let worker = new GaWorker(config);

      let diversityPercentage = getDiversityMetric(config, trials);
      let results1 = runGaTrials(config, getAverageFitness, trials);
      let analysis1 = getAnalysis(results1);

      console.log(
        `At Mutation Rate ${points}: Uniqueness fraction = ${
          1 - diversityPercentage
        } , Avg Fitness Score = ${analysis1.average}`
      );
    }

    for (var size = 10; size <= 20; size += 2) {
      let config = {
        iterations: 5,
        mutationRate: 0.15,
        noFavourateWeight: 0.5,
        musicalFitnessWeight: 1,
        randomInitial: false,
        populationSize: size,
        selectionSize: 7,
      };
      let worker = new GaWorker(config);

      let diversityPercentage = getDiversityMetric(config, trials);
      let results1 = runGaTrials(config, getAverageFitness, trials);
      let analysis1 = getAnalysis(results1);

      console.log(
        `At Population Size ${size}: Uniqueness fraction = ${
          1 - diversityPercentage
        } , Avg Fitness Score = ${analysis1.average}`
      );
    }
  });
});
