import { Bot } from "./Bot";

// Consider removing this class.
export class BotFitness {
  bot: Bot;
  fitScore: Number;

  constructor(bot: Bot, fitScore: Number) {
    this.bot = bot;
    this.fitScore = fitScore;
  }
}
