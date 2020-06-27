import { Bot } from '../models/Bot';
import { Rule } from '../models/Rule';
import { BotFitness } from '../models/BotFitness';
import { Melody } from '../models/Melody';
import { Note } from '../models/Note';

export class GaWorker {
    
    rules: Rule[];

    generateStartingMelody(): Melody[] {
        let melodies = new Array<Melody>();

        melodies.push(new Melody(this.createNoteArray('C4,G4,D4,A4,B4,C5,C5,D5')));
        melodies.push(new Melody(this.createNoteArray('A4,C5,A4,A4,E4,F4,G4,A4')));
        melodies.push(new Melody(this.createNoteArray('B4,C5,F4,F4,E5,F5,B4,G4')));
        melodies.push(new Melody(this.createNoteArray('G3,B4,D4,E4,G3,D5,D5,D5')));
        melodies.push(new Melody(this.createNoteArray('G4,D5,F5,B4,F4,F4,F4,C5')));
        melodies.push(new Melody(this.createNoteArray('B3,A4,G4,G5,E4,B4,D4,E4')));
        melodies.push(new Melody(this.createNoteArray('E5,F4,D4,G4,D5,A4,F4,A4')));
        melodies.push(new Melody(this.createNoteArray('C5,C5,G5,B4,G4,C5,C5,G5')));
        melodies.push(new Melody(this.createNoteArray('G4,C4,F4,B3,G3,B3,D4,E4')));
        melodies.push(new Melody(this.createNoteArray('G5,E5,D5,B4,F4,A4,G4,A4')));

        return melodies;
    }

    private createNoteArray(s: String): Note[] {
        return s.split(',').map(s => new Note(s));
    }

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