import { Bot } from './Bot';

export class BotRating {
    bot: Bot;
    fitScore: Number;

    constructor(bot: Bot, fitScore: Number) {
        this.bot = bot;
        this.fitScore = fitScore;
    }
}