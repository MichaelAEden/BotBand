import { Bot } from "../models/Bot";

// Usage score purely represents fitness.
export default (bots: Bot[]) => bots.map((bot) => bot.metric);
