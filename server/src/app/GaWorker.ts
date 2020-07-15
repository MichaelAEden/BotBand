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
    this.rules = [new LeapRule(), new TritoneRule(), new OctiveRule()];

    console.log(`
      Creating GaWorker with configs: 
      iterations - ${GaWorker.ITERATIONS} , 
      mutation_rate - ${GaWorker.MUTATION_RATE}
    `);
  }

  initialBots(): Bot[] {
    return [
      "C4,G4,D4,A4,B4,C5,C5,D5,B4,E5",
      "A4,C5,A4,A4,E4,F4,G4,A4,B4,G4",
      "B4,C5,F4,F4,E5,F5,B4,G4,G5,A4",
      "G3,B4,D4,E4,G3,D5,D5,D5,E5,C5",
      "G4,D5,F5,B4,F4,F4,F4,C5,E5,G4",
      "B3,A4,G4,G5,E4,B4,D4,E4,G5,E4",
      "E5,F4,D4,G4,D5,A4,F4,A4,A3,C4",
      "C5,C5,G5,B4,G4,C5,C5,G5,E5,G4",
      "G4,C4,F4,B3,G3,B3,D4,E4,A3,D4",
      "G5,E5,D5,B4,F4,A4,G4,A4,E4,G4",
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

        if (!notes.length) {
          return;
        }

        bot.melody.notes[index] = selectRandom(notes);
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
}
