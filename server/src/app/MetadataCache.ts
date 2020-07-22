import { Bot } from "../models/Bot";
import { getMusicalFitness } from "../ga/Fitness";

export class MetadataCache {
  static SESSIONS = {};
  static CURRENT_UUID = null;

  static addGeneration(uuid: string, bots: Bot[], generation: number, timestamps: object) {
    // TODO: track favourite counts.
    // TODO: add musicalFitness, userFitness fields to Bot class.
    const botsWithFitnesses = bots.map((bot) => ({
      metric: bot.metric,
      melody: bot.melody,
      playCount: bot.playCount,
      musicalFitness: getMusicalFitness(bot),
    }));
    // Create session for given UUID if none exist
    if (MetadataCache.SESSIONS[uuid] === undefined) MetadataCache.SESSIONS[uuid] = [];

    MetadataCache.SESSIONS[uuid].push({ bots: botsWithFitnesses, generation, timestamps });
    MetadataCache.CURRENT_UUID = uuid;
  }

  static getSession() {
    if (MetadataCache.CURRENT_UUID) return MetadataCache.SESSIONS[MetadataCache.CURRENT_UUID];
    else return [];
  }

  static getSessions() {
    return MetadataCache.SESSIONS;
  }

  static clearSessions() {
    MetadataCache.SESSIONS = {};
    MetadataCache.CURRENT_UUID = null;
  }
}
