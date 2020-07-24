import { GaWorker } from "../src/ga/GaWorker";
import { runAnalysis, getAverageFitness } from "./StatisticalAnalysis";
import { runGaTrials } from "./Utils";
import { getDiversityMetric } from "./Diversity"

describe("GA Parameter Optimization Tests", () => {
  test("GA increases fitness function", () => {
    // const config = GaWorker.defaultConfig();
    // const trials = 1000;

    // const results1 = runGaTrials({ ...config, iterations: 0 }, getAverageFitness, trials);
    // const analysis1 = runAnalysis(results1);
    // console.log(`Pregenerated melody set, fitnesses: ${JSON.stringify(analysis1, null, 2)}`);

    // const results2 = runGaTrials(config, getAverageFitness, trials);
    // const analysis2 = runAnalysis(results2);
    // console.log(`Default config, fitnesses:, ${JSON.stringify(analysis2, null, 2)}`);

    // console.log(`Improvement in average fitness: ${analysis2.average - analysis1.average}`);
  });

  test("Optimal parameters", () => {
    let trials = 1000;

    for (var points = 0.1 ; points <= 0.30; points += 0.05) {

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
      let analysis1 = runAnalysis(results1);

      console.log(`At Mutation Rate ${points}: Uniqueness fraction = ${1 - diversityPercentage} , Avg Fitness Score = ${analysis1.average}`);
    }

    for (var size = 10 ; size <= 20; size += 2) {

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
      let analysis1 = runAnalysis(results1);

      console.log(`At Population Size ${size}: Uniqueness fraction = ${1 - diversityPercentage} , Avg Fitness Score = ${analysis1.average}`);
    }
  });
});
