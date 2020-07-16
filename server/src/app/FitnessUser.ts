import { Bot } from "../models/Bot";
import { GaWorker } from "./GaWorker";

// Usage score purely represents fitness.
export default (bots: Bot[]) => bots.map((bot) => bot.metric != 0 ? bot.metric : GaWorker.NO_FAVOURITE_RATE);
