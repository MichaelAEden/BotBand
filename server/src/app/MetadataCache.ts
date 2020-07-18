import { Bot } from "../models/Bot";

export class MetadataCache {
  static SESSIONS = [];
  static currentSession = {};

  static newSession() {
    MetadataCache.SESSIONS.push({ ...this.currentSession });
    this.currentSession = {
      timestamp: Date.now(),
      data: [],
    };
  }

  static addGeneration(bots: Bot[], generation: number) {
    // Any other data processing should be done here.
    this.currentSession["data"].push({ bots, generation });
  }

  static getSession() {
    return MetadataCache.currentSession;
  }

  static getSessions() {
    return MetadataCache.SESSIONS;
  }
}
