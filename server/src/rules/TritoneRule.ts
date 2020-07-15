import { Rule } from "./Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

/**
 * TODO: Deprecate this with the weighted average rule from GA Team.
 */

export class TritoneRule extends Rule {
    apply(index: number, changeSet: Array<Note>, melody: Melody): Array<Note> {
        if (index > 0) {
            let prevNote = melody.notes[index - 1];

            let tritoneOne = prevNote.increment(3);
            let tritoneTwo = prevNote.increment(-3);

            changeSet.push(tritoneOne);
            changeSet.push(tritoneTwo);
        } 
        return changeSet;
    }
}
