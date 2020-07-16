import { Note } from "./Note";

export class Melody {
  notes: Note[];

  constructor(notes: Note[]) {
    this.notes = notes;
  }

  static fromString(str: string) {
    // Parses melody from string (e.g., "A3,B4,A5")
    return new Melody(str.split(",").map((str) => Note.fromString(str)));
  }
}
