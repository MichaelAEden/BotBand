import { Bot } from "../models/Bot";
import { Melody } from "../models/Melody";
import { OCTAVE } from "../models/Note";
import { GaWorker } from "./GaWorker";

const MAX_MELODY_SCORE = 3;

export const evaluateRange = (melody: Melody): number => {
  // Convention 1: All notes within an octave and a half
  const octaveRange = 1.5;
  const notes = melody.notes.map((note) => note.code);
  const minNote = Math.min(...notes);
  const maxNote = Math.max(...notes);

  let octaveFitness = 0;
  if (maxNote - minNote < OCTAVE * octaveRange) {
    octaveFitness = 1;
  } else {
    octaveFitness = (1.0 / (maxNote - minNote)) * OCTAVE;
  }
  return octaveFitness;
};

export const evaluateStepwise = (melody: Melody): number => {
  // Convention 2: Mostly stepwise motion (few leaps)
  let stepFitness = 0;

  for (let i = 0; i < melody.notes.length - 1; i++) {
    let noteDiff = melody.notes[i].code - melody.notes[i + 1].code;
    // TODO: diminishing returns after 1?
    if (Math.abs(noteDiff) <= 1) {
      stepFitness += 1;
    }
  }
  if (stepFitness > melody.notes.length * 0.75) {
    stepFitness = 1;
  } else {
    stepFitness = stepFitness / melody.notes.length;
  }
  return stepFitness;
};

export const evaluateWhoop = (melody: Melody): number => {
  // Bonus points: "millenial whoop" (alternating between fifth and third notes in a major scale)
  let whoopFitness = 0;
  let millWhoop = ["G", "E", "G", "E", "G", "E", "G", "E"];
  for (let i = 0; i < melody.notes.length; i++) {
    if (millWhoop[i] == melody.notes[i].getKey()) {
      if (i > 0) {
        if (
          melody.notes[i - 1].getOctave() === melody.notes[i].getOctave() &&
          melody.notes[i - 1].getKey() == millWhoop[i - 1]
        ) {
          whoopFitness += 1;
        }
      } else {
        whoopFitness += 1;
      }
    }
  }
  whoopFitness = 2 ** whoopFitness / 2 ** melody.notes.length;
  return whoopFitness;
};

export const getUserFitness = (bot: Bot) => {
  return bot.metric != 0 ? bot.metric : GaWorker.NO_FAVOURITE_RATE;
};

// Fitness will be determined from the combined fitness of musical rules.
export const getMusicalFitness = (bot: Bot) => {
  return (
    (evaluateRange(bot.melody) + evaluateStepwise(bot.melody) + evaluateWhoop(bot.melody)) /
    MAX_MELODY_SCORE
  );
};

export default (bots: Bot[]): number[] => {
  return bots.map((bot) => {
    return getUserFitness(bot) + GaWorker.MUSICAL_FITNESS_WEIGHT * getMusicalFitness(bot);
  });
};
