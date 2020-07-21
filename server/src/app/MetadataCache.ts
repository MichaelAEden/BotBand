import { Bot } from "../models/Bot";
import { getMusicalFitness } from "../ga/Fitness";

export class MetadataCache {
  static SESSIONS = [];
  static currentSession = {};

  static newSession() {
    this.currentSession = {
      timestamp: Date.now(),
      data: [],
    };
    MetadataCache.SESSIONS.push(this.currentSession);
  }

  static addGeneration(bots: Bot[], generation: number, timestamps) {
    // TODO: add musicalFitness, userFitness fields to Bot class.
    const botsWithFitnesses = bots.map((bot) => ({
      metric: bot.metric,
      melody: bot.melody,
      playCount: bot.playCount,
      musicalFitness: getMusicalFitness(bot),
    }));
    this.currentSession["data"].push({ botsWithFitnesses, generation, timestamps });
  }

  static getSession() {
    return MetadataCache.currentSession;
  }

  static getSessions() {
    return MetadataCache.SESSIONS;
  }

  static clearSessions() {
    MetadataCache.SESSIONS = [];
    MetadataCache.currentSession = {};
  }
}
