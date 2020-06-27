import { Bot } from '../models/Bot';
import { Rule } from '../models/Rule';
import { BotRating } from '../models/BotRating';

export class GaWorker {
    
    rules: Rule[];

    generateNewBots(oldGeneration: Bot[]) {
        let newGeneration: Bot[];

    }

    evaluateFitness(oldGeneration: Bot[]): BotRating[] {
        return new Array<BotRating>();
    }

    // uses weights to psuedo-random select the next generation bots
    selectPool(ratings: BotRating[]): Bot[] {
        return new Array<Bot>();
    }

    mutateBots(bots: Bot[]) {

    }

    applyRuleSet(bot: Bot) {
        
    }

    // helper function.
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