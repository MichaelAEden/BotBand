import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

export abstract class Rule {
  abstract apply(
    index: Number,
    changeSet: Array<Note>,
    melody: Melody
  ): Array<Note>;
}
