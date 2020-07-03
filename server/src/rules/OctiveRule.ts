import { Rule } from "./Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

export class OctiveRule extends Rule {
  apply(index: number, changeSet: Array<Note>, melody: Melody): Array<Note> {
    
    if (index !== 0) {
        let prevNode: Note = melody[index - 1];
        let octiveUp = prevNode.increment(8);
        let octiveDown = prevNode.increment(-8);

        changeSet = changeSet.filter(n => n.compare(octiveUp) <= 0 && n.compare(octiveDown) >= 0);
    }

    return changeSet;
  }
}
