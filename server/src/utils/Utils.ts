import * as _ from "lodash";

import { Bot } from "../models/Bot";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

export const parseBotsFromReq = (req) => {
  return req.body.bots.map(
    (bot) =>
      new Bot(bot.metric, new Melody(bot.melody.notes.map((note) => Note.fromString(note.note))))
  );
};

export const selectRandom = (items) => {
  if (!items.length) throw new Error("Empty items!");
  return items[Math.floor(Math.random() * items.length)];
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

  // For randomly weighted mutations
  if (n==1){
    return choices[0];
  // For randomly weighted population generation
  }else{
    return choices;
  }
  
};
