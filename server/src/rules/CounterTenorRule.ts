import { Rule } from "./Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

export class CounterTenorRule extends Rule {
  HIGH = Note.fromString("E5");
  LOW = Note.fromString("E3");

  apply(index: number, changeSet: Array<Note>, melody: Melody): Array<Note> {
    return changeSet.filter((note) => note.code <= this.HIGH.code && note.code >= this.LOW.code);
  }
}
