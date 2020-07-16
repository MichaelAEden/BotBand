import { Bot } from "../models/Bot";
import { Rule } from "../rules/Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";
import { selectRandom, selectRandomWeighted } from "../utils/Utils";
import evaluateConvention from "./FitnessConvention";
import evaluateUser from "./FitnessUser";

import { LeapRule } from "../rules/LeapRule";
import { TritoneRule } from "../rules/TritoneRule";
import { OctiveRule } from "../rules/OctiveRule";
import { CounterTenorRule } from "../rules/CounterTenorRule";
import { StepwiseRule } from "../rules/StepwiseRule";

export class GaWorker {

  // Default Values
  static ITERATIONS = 5; // Times GA will iterate
  POPULATION_SIZE = 10; // Population size
  static MUTATION_RATE = 0.15; // Probability of mutation

  rules: Rule[];
  // feature flagging
  fitnessFunction: string = "USER";

  constructor(fitnessFunction: string) {
    this.fitnessFunction = fitnessFunction;
    this.rules = [new LeapRule(), new TritoneRule(), new OctiveRule(), new StepwiseRule(), new CounterTenorRule()];

    console.log(`
      Creating GaWorker with configs: 
      iterations - ${GaWorker.ITERATIONS} , 
      mutation_rate - ${GaWorker.MUTATION_RATE}
    `);
  }

  initialBots(): Bot[] {
    return [
      "C4,G4,G4,F4",
      "A4,B4,G4,E4",
      "G4,B4,D5,E5",
      "E4,E4,E4,A4",
      "B4,A4,G4,D4",
      "D4,G4,C5,D5",
      "E4,G4,E4,D4",
      "A4,G3,F3,E3",
      "F3,C4,B4,A4",
      "C4,B4,A4,C4",
      ].map((str) => new Bot(0, Melody.fromString(str)));
  }

  generateNewBots(startingPopulation: Bot[]): Bot[] {
    let generation = startingPopulation;

    // console.log(`Generating new bots, fitness method: ${this.fitnessFunction}`);

    // Number of generations to iterate before returning to client
    for (let i = 0; i < GaWorker.ITERATIONS; i++) {
      // Feature flagging
      let evaluate = this.fitnessFunction === "USER" ? evaluateUser : evaluateConvention;

      // Produce fitness scores from bots
      let fitnesses = evaluate(generation);

      // Normalize the scores to select a new generation
      generation = selectRandomWeighted(generation, fitnesses, this.POPULATION_SIZE);

      // Apply mutations in accordance with ruleset
      generation = generation.map((bot) => this.mutateBot(bot));
    }
    return generation;
  }

  private mutateBot(bot: Bot): Bot {
    // Expected value of ~1 mutation per bot.
    for (var index = 0; index < bot.melody.notes.length; index++) {
      if (Math.random() < GaWorker.MUTATION_RATE) {
        const notes = this.getPossibleNotesFromRules(index, bot);
        const weights = this.assignNoteWeights(index, notes, bot.melody);
        if (!notes.length) {
          return;
        }

        bot.melody.notes[index] = selectRandomWeighted(notes, weights, 1);
      }
    }
    return bot;
  }

  private getPossibleNotesFromRules(index: number, bot: Bot): Array<Note> {
    let set = this.createStartSet();
    this.rules.forEach((rule) => {
      set = rule.apply(index, set, bot.melody);
    });
    return set;
  }

  // Helper function to generate 3 octaves of notes.
  createStartSet(): Array<Note> {
    let startSet = new Array<string>();

    ["E", "F", "F"].forEach((s) => {
      startSet.push(s + "3");
    });

    ["A", "B", "C", "D", "E", "F", "G"].forEach((s) => {
      startSet.push(s + "4");
    });

    ["A", "B", "C", "D", "E"].forEach((s) => {
      startSet.push(s + "5");
    });

    return startSet.map((s: string) => new Note(s));
  }

  // Function to assign weights to possible notes for mutation
  private assignNoteWeights(index: number, mut_notes: Array<Note>, melody: Melody): Array<number> {
    let noteWeights = new Array();
    
    const notes = melody.notes.map((note) => note.toNumber());
    const mut_notes_num = mut_notes.map((note) => note.toNumber());
    const minNote = Math.min(...notes);
    const maxNote = Math.max(...notes);

    for (let i = 0; i < mut_notes.length; i++){
      let weight = 0;
      
      // Weighting based on octave range
      const octave = 8;
      const octaveRange = 2;
      let octaveWeight = 0;
      if (maxNote - mut_notes_num[i] < octave * octaveRange && mut_notes_num[i] - minNote) {
        octaveWeight= 1;
      }else{
        let octDiff1 = Math.abs(minNote - mut_notes_num[i]);
        let octDiff2 = Math.abs(maxNote - mut_notes_num[i]);
        let octDiff = Math.max(octDiff1, octDiff2);

        octaveWeight = 1 / octDiff;
      }

      // Weighting based on step interval
      let stepWeight = 0;
      let noteDiff = 0;
      if (index == 0){
        noteDiff = Math.abs(notes[index+1] - mut_notes_num[i]);
      } else if( index == melody.notes.length - 1){
        noteDiff = Math.abs(notes[index-1] - mut_notes_num[i]);
      } else {
        let noteDiff1 = Math.abs(notes[index-1] - mut_notes_num[i]);
        let noteDiff2 = Math.abs(notes[index+1] - mut_notes_num[i]);
        noteDiff = Math.max(noteDiff1,noteDiff2);
      }

      if (noteDiff <= 1) {
        stepWeight = 1;
      } else{
        stepWeight = 1 / Math.abs(noteDiff);
      }

      // Total weighting
      weight = (stepWeight + octaveWeight)/2;

      noteWeights.push(weight);
    }

    return noteWeights;
  }
}
