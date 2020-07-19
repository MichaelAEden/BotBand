import { GaWorker } from "../src/ga/GaWorker";
import { runAnalysis, getAverageFitness } from "./StatisticalAnalysis";
import { runGaTrials } from "./Utils";

describe("GA Parameter Optimization Tests", () => {
  test("GA increases fitness function", () => {
    const config = GaWorker.defaultConfig();
    const trials = 1000;

    const results1 = runGaTrials({ ...config, iterations: 0 }, getAverageFitness, trials);
    const analysis1 = runAnalysis(results1);
    console.log(`Pregenerated melody set, fitnesses: ${JSON.stringify(analysis1, null, 2)}`);

    const results2 = runGaTrials(config, getAverageFitness, trials);
    const analysis2 = runAnalysis(results2);
    console.log(`Default config, fitnesses:, ${JSON.stringify(analysis2, null, 2)}`);

    console.log(`Improvement in average fitness: ${analysis2.average - analysis1.average}`);
  });
});
