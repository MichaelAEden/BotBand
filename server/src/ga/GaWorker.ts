import * as _ from "lodash";

import { Bot } from "../models/Bot";
import { Rule } from "../rules/Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";
import {
  selectRandom,
  selectRandomMany,
  selectRandomWeighted,
  randomInitialization,
} from "../utils/Utils";
import evaluate from "./FitnessConvention";

import { LeapRule } from "../rules/LeapRule";
import { TritoneRule } from "../rules/TritoneRule";
import { OctaveRule } from "../rules/OctaveRule";
import { CounterTenorRule } from "../rules/CounterTenorRule";
import { StepwiseRule } from "../rules/StepwiseRule";

interface GaWorkerConfig {
  iterations: number;
  mutationRate: number;
  noFavourateRate: number;
  musicalFitnessWeight: number;
  populationSize: number;
  selectionSize: number;
}

export class GaWorker {
  config: GaWorkerConfig;
  rules: Rule[];

  static defaultConfig(): GaWorkerConfig {
    return {
      iterations: 5, // Times GA will iterate
      mutationRate: 0.15, // Probability of mutation
      noFavourateRate: 0.5, // Weight of selection is weaker if bot not favourited
      musicalFitnessWeight: 1, // Relative weight of melody vs user fitness in convention algo
      populationSize: 7, // Population size
      selectionSize: 7, // Number of robots to be presented to the user
    };
  }

  constructor(config: GaWorkerConfig) {
    this.config = config;
    this.rules = [
      new LeapRule(),
      new TritoneRule(),
      new OctaveRule(),
      new StepwiseRule(),
      new CounterTenorRule(),
    ];

    console.log(`Creating GaWorker with config: ${JSON.stringify(config, null, 2)}`);
  }

  // TODO: make randomInitial configurable.
  // TODO: on randomInitial flow, run GA.
  initialBots(randomInitial = false): Bot[] {
    if (randomInitial) {
      const set = this.createStartSet();
      const initialMelodies = randomInitialization(set, this.config.selectionSize);
      return initialMelodies.map((melody) => new Bot(0, Melody.fromString(melody)));
    } else {
      const melodies = [
        "A4,G3,F3,E3",
        "F3,C4,B4,A4",
        "C4,B4,A4,C4",
        "C4,G4,G4,F4",
        "A4,B4,G4,E4",
        "G4,B4,D5,E5",
        "E4,E4,E4,A4",
        "B4,A4,G4,D4",
        "D4,G4,C5,D5",
        "E4,G4,E4,D4",
      ];
      const selectedMelodies = selectRandomMany(melodies, this.config.selectionSize);
      return selectedMelodies.map((melody) => new Bot(0, Melody.fromString(melody)));
    }
  }

  generateNewBots(startingPopulation: Bot[]): Bot[] {
    let generation = startingPopulation;
    let fitnesses;

    // Number of generations to iterate before returning to client
    for (let i = 0; i < this.config.iterations; i++) {
      // Produce fitness scores from bots
      fitnesses = evaluate(generation);

      // Normalize the scores to select a new generation
      generation = selectRandomWeighted(generation, fitnesses, this.config.populationSize);

      // Apply mutations in accordance with ruleset
      generation.forEach((bot) => this.mutateBot(bot));
    }

    // Reset metrics for new generation
    generation.forEach((bot) => (bot.metric = 0));

    // Sort bots by fitness, descending, then select most fit bots
    // TODO: introduce random weighted sorting
    const selection = _.zip(generation, fitnesses)
      .sort((a: any[], b: any[]) => b[1] - a[1])
      .map((botWithFitness) => botWithFitness[0])
      .slice(0, this.config.selectionSize);

    // Ensure favourited robots are persisted
    startingPopulation.forEach((bot, i) => {
      if (bot.metric === 1) selection[i] = bot;
    });

    return selection;
  }

  private mutateBot(bot: Bot): void {
    // Expected value of ~1 mutation per bot.
    for (var index = 0; index < bot.melody.notes.length; index++) {
      if (Math.random() < this.config.mutationRate) {
        const notes = this.getPossibleNotesFromRules(index, bot);
        if (!notes.length) {
          return;
        }

        // const weights = assignNoteWeights(index, notes, bot.melody);
        // bot.melody.notes[index] = selectRandomWeighted(notes, weights, 1)[0];
        bot.melody.notes[index] = selectRandom(notes);
      }
    }
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

    return startSet.map((s: string) => Note.fromString(s));
  }
}
