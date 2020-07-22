import { Bot } from "../models/Bot";
import { getMusicalFitness } from "../ga/Fitness";

export class MetadataCache {
  static SESSIONS = {};
  static SESSION_CURRENT = null;

  static addGeneration(uuid: string, bots: Bot[], generation: number, timestamps: object) {
    // TODO: track favourite counts.
    // TODO: clean up timestamps.
    // TODO: add musicalFitness, userFitness fields to Bot class.
    const botsWithFitnesses = bots.map((bot) => ({
      metric: bot.metric,
      melody: bot.melody,
      playCount: bot.playCount,
      musicalFitness: getMusicalFitness(bot),
    }));
    // Create session for given UUID
    if (MetadataCache[uuid] === undefined) MetadataCache[uuid] = [];

    MetadataCache.SESSION_CURRENT = MetadataCache[uuid];
    MetadataCache.SESSION_CURRENT.push({ bots: botsWithFitnesses, generation, timestamps });
  }

  static getSession() {
    return MetadataCache.SESSION_CURRENT;
  }

  static getSessions() {
    return MetadataCache.SESSIONS;
  }

  static clearSessions() {
    MetadataCache.SESSIONS = {};
    MetadataCache.SESSION_CURRENT = null;
  }
}
