import * as _ from "lodash";

import { Bot } from "../models/Bot";
import { Rule } from "../rules/Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";
import {
  selectRandom,
  selectRandomMany,
  selectRandomWeighted,
  selectRandomWeightedNoReplacement,
  randomInitialization,
} from "../utils/Utils";
import evaluate from "./Fitness";

import { LeapRule } from "../rules/LeapRule";
import { TritoneRule } from "../rules/TritoneRule";
import { OctaveRule } from "../rules/OctaveRule";
import { CounterTenorRule } from "../rules/CounterTenorRule";
import { StepwiseRule } from "../rules/StepwiseRule";

export interface GaWorkerConfig {
  iterations: number; // Times GA will iterate
  mutationRate: number; // Probability of mutation
  noFavourateWeight: number; // User fitness assigned to bots that are not favourited
  musicalFitnessWeight: number; // Relative weight of melody vs user fitness in convention algo
  randomInitial: boolean; // If true, initial GA population is randomly generated
  populationSize: number; // Population size
  selectionSize: number; // Number of robots to be presented to the user
}

export class GaWorker {
  config: GaWorkerConfig;
  rules: Rule[];

  static defaultConfig(): GaWorkerConfig {
    return {
      iterations: 5,
      mutationRate: 0.15,
      noFavourateWeight: 0.5,
      musicalFitnessWeight: 1,
      randomInitial: false,
      populationSize: 10,
      selectionSize: 7,
    };
  }

  constructor(config: GaWorkerConfig = GaWorker.defaultConfig()) {
    // TODO: validate config.
    this.config = config;
    this.rules = [
      new LeapRule(),
      new TritoneRule(),
      new OctaveRule(),
      new StepwiseRule(),
      new CounterTenorRule(),
    ];

    // console.log(`Creating GaWorker with config: ${JSON.stringify(config, null, 2)}`);
  }

  initialBots(): Bot[] {
    if (this.config.randomInitial) {
      // Run GA once with randomly generated initial population
      const set = this.createStartSet();
      const initialMelodies = randomInitialization(set, this.config.selectionSize);
      const bots = initialMelodies.map((melody) => new Bot(0, melody));
      return this.generateNewBots(bots);
    } else {
      // Return pregenerated melodies
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
        "C4,G4,D4,A4",
        "C4,C4,G4,E4",
        "C4,C4,A4,E4",
        "C4,E4,G4,A4",
        "C4,A4,G4,G4",
        "C4,C5,G4,D4",
        "C4,B3,C4,A3",
        "C4,B3,C4,E4",
        "G4,A4,F4,G4",
        "D4,E4,G4,A4"
      ];
      const selectedMelodies =
        this.config.selectionSize <= melodies.length
          ? _.take(melodies, this.config.selectionSize)
          : selectRandomMany(melodies, this.config.selectionSize);
      return selectedMelodies.map((melody) => new Bot(0, Melody.fromString(melody)));
    }
  }

  generateNewBots(startingPopulation: Bot[]): Bot[] {
    let generation = startingPopulation;

    // Produce fitness scores from bots
    let fitnesses = evaluate(
      generation,
      this.config.noFavourateWeight,
      this.config.musicalFitnessWeight
    );

    for (let i = 0; i < this.config.iterations; i++) {
      // Normalize the scores to select a new generation
      generation = selectRandomWeighted(generation, fitnesses, this.config.populationSize);

      // Apply mutations in accordance with ruleset
      generation.forEach((bot) => this.mutateBot(bot));

      // TODO: after bot has mutated, it retains the same user score. Fix this?
      // Produce fitness scores from bots
      fitnesses = evaluate(
        generation,
        this.config.noFavourateWeight,
        this.config.musicalFitnessWeight
      );
    }

    // Reset metrics for new generation
    generation.forEach((bot) => (bot.metric = 0));

    // Weighted average no replacement on bots
    const selection = selectRandomWeightedNoReplacement(
      generation,
      fitnesses,
      this.config.selectionSize
    );

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
