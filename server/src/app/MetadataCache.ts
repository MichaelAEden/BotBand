import { Bot } from "../models/Bot";

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
    // Any other data processing should be done here.
    this.currentSession["data"].push({ bots, generation, timestamps });
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
