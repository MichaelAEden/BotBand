import { Note } from "./Note";

export class Melody {
  notes: Note[];

  constructor(notes: Note[]) {
    this.notes = notes;
  }
}
