import { GaWorker } from "../src/ga/GaWorker";
import { Bot } from "../src/models/Bot";

test("Duplicate Count", () => {
    // TODO: pass different parameters to see how duplicate probability changes.
    // Default config yields ~12%.
    let worker = new GaWorker();

    let numDuplicates = 0;
    let countBots = 0;

    for (var i = 0; i < 100; i++) {
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
    console.log(`Percentage of duplicates: ${percentage}`);

});
