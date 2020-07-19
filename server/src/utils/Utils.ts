import * as _ from "lodash";

import { Bot } from "../models/Bot";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

export const parseBotsFromReq = (req) => {
  return req.body.bots.map(
    (bot) =>
      new Bot(bot.metric, new Melody(bot.melody.notes.map((note) => Note.fromString(note.note))), bot.playCount)
  );
};

export const selectRandom = (items) => {
  if (!items.length) throw new Error("Array cannot be empty");
  return items[Math.floor(Math.random() * items.length)];
};

export const selectRandomMany = (items, n) => {
  if (!items.length) throw new Error("Array cannot be empty");
  return _.times(n, () => items[Math.floor(Math.random() * items.length)]);
};

export const selectRandomWeighted = (items, weights, n) => {
  if (items.length !== weights.length) throw new Error("Items and weights must be same length!");

  // If weights are all 0, set all values to 1
  // Otherwise, array of undefined elements is returned
  if (!weights.some((weight) => weight !== 0)) weights = weights.map((weight) => weight + 1);

  let sum = 0;
  let segments = new Array();
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    segments.push(sum);
  }

  let choices = new Array();
  for (let i = 0; i < n; i++) {
    const random = Math.random() * sum;
    const index = segments.filter((segment) => segment <= random).length;
    const item = items[index];
    const newItem = _.cloneDeep(item);
    choices.push(newItem);
  }

  return choices;
};

// Function to assign weights to possible notes for mutation
export const assignNoteWeights = (index: number, mut_notes: Array<Note>, melody: Melody) => {
  let noteWeights = new Array();

  const notes = melody.notes.map((note) => note.code);
  const mut_notes_num = mut_notes.map((note) => note.code);
  const minNote = Math.min(...notes);
  const maxNote = Math.max(...notes);

  for (let i = 0; i < mut_notes.length; i++) {
    let weight = 0;

    // Weighting based on octave range
    // If notes are within 1.5 of an octave, full fitness score awarded
    // Other wise, fitness score is assigned as 1/(octave range it covers)
    const octave = 8;
    const octaveRange = 1.5;
    let octaveWeight = 0;
    if (maxNote - mut_notes_num[i] < octave * octaveRange && mut_notes_num[i] - minNote) {
      octaveWeight = 1;
    } else {
      let octDiff1 = Math.abs(minNote - mut_notes_num[i]);
      let octDiff2 = Math.abs(maxNote - mut_notes_num[i]);
      let octDiff = Math.max(octDiff1, octDiff2);

      octaveWeight = 1 / octDiff;
    }

    // Weighting based on step interval
    // Full fitness value awarded for stepwise motion
    // Otherwise, fitness score is assigned as 1/(difference in notes)
    let stepWeight = 0;
    let noteDiff = 0;
    if (index == 0) {
      noteDiff = Math.abs(notes[index + 1] - mut_notes_num[i]);
    } else if (index == melody.notes.length - 1) {
      noteDiff = Math.abs(notes[index - 1] - mut_notes_num[i]);
    } else {
      let noteDiff1 = Math.abs(notes[index - 1] - mut_notes_num[i]);
      let noteDiff2 = Math.abs(notes[index + 1] - mut_notes_num[i]);
      noteDiff = Math.max(noteDiff1, noteDiff2);
    }

    if (noteDiff <= 1) {
      stepWeight = 1;
    } else {
      stepWeight = 1 / Math.abs(noteDiff);
    }

    // Total weighting for fitness
    weight = (stepWeight + octaveWeight) / 2;

    noteWeights.push(weight);
  }

  return noteWeights;
};

// Random initializes melodies for a starting population
export const randomInitialization = (notes: Note[], populationSize: number): Melody[] => {
  // TODO: this 4 should be a constant somewhere.
  let melodyLength = 4;
  return _.times(populationSize, () => new Melody(selectRandomMany(notes, melodyLength)));
};
