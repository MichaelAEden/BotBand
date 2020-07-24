import { GaWorker, GaWorkerConfig } from "../src/ga/GaWorker";
import { Bot } from "../src/models/Bot";

export const getDiversityMetric = (config: GaWorkerConfig, trials: number = 1000) => {
    let numDuplicates = 0;
    let countBots = 0;

    let worker = new GaWorker(config);

    for (var i = 0; i < trials; i++) {
        let newBots = worker.generateNewBots(worker.initialBots());
    
        let hashset = [];

        newBots.forEach((bot: Bot) => {
          
            let hash = bot.getHash();

            if (hashset.includes(hash)) {
                numDuplicates++;
            }

            hashset.push(bot.getHash());
            countBots++;
        });
    }

    let percentage = numDuplicates / countBots;
    return percentage;
}
