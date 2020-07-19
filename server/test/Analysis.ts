/**
 * Place to run experiment analysis. Should only be name with .test extension outside of master.
 */

import { GaWorker } from "../src/ga/gaworker";
import { Note } from "../src/models/Note";

/**
 * Evaluates percentage of notes exceeding desired range
 */
test("Test notes outside of vocal range", () => {
    let worker = new GaWorker();
  
    let highNotes = 0;
    let totalNotes = 0;
    let lowNotes = 0;
    // Represents tenor range
    let high = Note.fromString("C5");
    let low = Note.fromString("C3");
  
    for (var i = 0; i < 100; i++) {
      let newBots = worker.generateNewBots(worker.initialBots());
  
      newBots.forEach((bot) => {
        bot.melody.notes.forEach((note) => {
          totalNotes++;
  
          if (high.compare(note) <= 0) {
            highNotes++;
          }
  
          if (low.compare(note) >= 0) {
            lowNotes++;
          }
        });
      });
    }
  
    console.log(`results: high - ${highNotes} , low - ${lowNotes} , total - ${totalNotes}`);
    console.log(`fraction high notes: ${highNotes / totalNotes}`);
    console.log(`fraction low notes: ${lowNotes / totalNotes}`);
  });