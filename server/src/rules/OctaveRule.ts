import { Rule } from "./Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

export class OctaveRule extends Rule {
  apply(index: number, changeSet: Array<Note>, melody: Melody): Array<Note> {
    if (index !== 0) {
      let prevNode: Note = melody.notes[index - 1];
      let OctaveUp = prevNode.increment(8);
      let OctaveDown = prevNode.increment(-8);

      changeSet = changeSet.filter((n) => n.compare(OctaveUp) <= 0 && n.compare(OctaveDown) >= 0);
    }

    return changeSet;
  }
}
