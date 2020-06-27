import { Bot } from '../models/Bot';
import { Rule } from '../models/Rule';
import { BotFitness } from '../models/BotFitness';

export class GaWorker {
    
    rules: Rule[];

    generateNewBots(oldGeneration: Bot[]): Bot[] {
        // create new pool of bots
        let newGeneration: Bot[] = this.selectPool(this.evaluateFitness(oldGeneration));

        // apply mutations in accordance with ruleset
        this.mutateBots(newGeneration);

        return newGeneration;
    }

    private evaluateFitness(oldGeneration: Bot[]): BotFitness[] {
        return new Array<BotFitness>();
    }

    // uses weights to psuedo-random select the next generation bots
    private selectPool(ratings: BotFitness[]): Bot[] {
        return new Array<Bot>();
    }

    private mutateBots(bots: Bot[]) {
        bots.forEach(bot => {
            this.applyRuleSet(bot);
        });
    }

    private applyRuleSet(bot: Bot) {
        // let startSet = this.createStartSet();
        console.log("Applying rules to bots...");
    }

    // helper function to generate 3 octaves of notes.
    createStartSet(): Array<String> {
        let startSet = new Array<String>();

        new Array<String>('A', 'B', 'C', 'D', 'E', 'F', 'G').forEach(s => {
            startSet.push(s + '3');
            startSet.push(s + '4');
            startSet.push(s + '5');
        });

        return startSet;
    }
}