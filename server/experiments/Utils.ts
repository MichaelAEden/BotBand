import * as _ from "lodash";

import { GaWorkerConfig, GaWorker } from "../src/ga/GaWorker";
import { Bot } from "../src/models/Bot";

export const runGaTrials = (
  config: GaWorkerConfig,
  evaluator: (bots: Bot[]) => number,
  trials: number
): number[] => {
  const gaWorker = new GaWorker(config);
  return _.times(trials, () => {
    const initialBots = gaWorker.initialBots();
    const newBots = gaWorker.generateNewBots(initialBots);
    return evaluator(newBots);
  });
};
