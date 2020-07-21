import { GaWorker } from "../src/ga/GaWorker";
import { Bot } from "../src/models/Bot";

const getNoteHash = (bot: Bot) => {
    let score = 0;
    let index = 1;

    bot.melody.notes.forEach(note => {

        score += note.code * index;
        index *= 100;

    });

    return score;
}

test("Duplicate Count", () => {
    // TODO: pass different parameters to see how duplicate probability changes.
    // Default config yields ~15%.
    let worker = new GaWorker();

    let numDuplicates = 0;
    let countBots = 0;

    for (var i = 0; i < 100; i++) {
        let newBots = worker.generateNewBots(worker.initialBots());
    
        let hashset = [];

        newBots.forEach((bot) => {
          
            let hash = getNoteHash(bot);

            if (hashset.includes(hash)) {
                numDuplicates++;
            }

            hashset.push(getNoteHash(bot));
            countBots++;
        });
    }

    let percentage = numDuplicates / countBots;
    console.log(`Percentage of duplicates: ${percentage}`);

});
