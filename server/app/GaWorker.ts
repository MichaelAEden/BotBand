import { Bot } from "../models/Bot";
import { Rule } from "../rules/Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";
import { selectRandomWeighted } from "../utils/Utils";
import { evaluate } from "./FitnessUser";
// import { evaluate } from "./FitnessConvention";

import { LeapRule } from "../rules/LeapRule";
import { TritoneRule } from "../rules/TritoneRule";

export class GaWorker {
  ITERATIONS = 50; // Times GA will iterate
  POPULATION_SIZE = 10; // Population size
  MUTATION_RATE = 0.5; // Probability of mutation

  rules: Rule[];

  constructor() {
    this.rules.push(new LeapRule());
    this.rules.push(new TritoneRule());
  }

  generateStartingMelody(): Melody[] {
    const createNoteArray = (s: string) => s.split(",").map((s) => new Note(s));
    return [
      new Melody(createNoteArray("C4,G4,D4,A4,B4,C5,C5,D5,B4,E5")),
      new Melody(createNoteArray("A4,C5,A4,A4,E4,F4,G4,A4,B4,G4")),
      new Melody(createNoteArray("B4,C5,F4,F4,E5,F5,B4,G4,G5,A4")),
      new Melody(createNoteArray("G3,B4,D4,E4,G3,D5,D5,D5,E5,C5")),
      new Melody(createNoteArray("G4,D5,F5,B4,F4,F4,F4,C5,E5,G4")),
      new Melody(createNoteArray("B3,A4,G4,G5,E4,B4,D4,E4,G5,E4")),
      new Melody(createNoteArray("E5,F4,D4,G4,D5,A4,F4,A4,A3,C4")),
      new Melody(createNoteArray("C5,C5,G5,B4,G4,C5,C5,G5,E5,G4")),
      new Melody(createNoteArray("G4,C4,F4,B3,G3,B3,D4,E4,A3,D4")),
      new Melody(createNoteArray("G5,E5,D5,B4,F4,A4,G4,A4,E4,G4")),
    ];
  }

  generateNewBots(startingPopulation: Bot[]): Bot[] {
    let generation = startingPopulation;

    // Number of generations to iterate before returning to client
    for (let i = 0; i < this.ITERATIONS; i++) {
      // Produce fitness scores from bots
      let fitnesses = evaluate(generation);

      // Normalize the scores to select a new generation
      generation = selectRandomWeighted(
        generation,
        fitnesses,
        this.POPULATION_SIZE
      );

      // Apply a mutation in accordance with ruleset
      generation = generation.map((bot) =>
        Math.random() < this.MUTATION_RATE ? this.mutateBot(bot) : bot
      );
    }
    return generation;
  }

  private mutateBot(bot: Bot): Bot {
    // select random index.
    // perform mutations on incidicies.
    this.getPossibleNotesFromRules(4, bot); 
    // randomly select a new note from filtered set and change at specified index.
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
    let startSet = new Array<String>();

    new Array<String>("A", "B", "C", "D", "E", "F", "G").forEach((s) => {
      startSet.push(s + "3");
      startSet.push(s + "4");
      startSet.push(s + "5");
    });

    return startSet.map((s) => new Note(s));
  }
}
