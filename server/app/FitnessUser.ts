import { Bot } from "../models/Bot";

// Usage score purely represents fitness.
export const evaluate = (bots: Bot[]) => bots.map(bot => bot.metric);
