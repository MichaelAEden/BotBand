import { Rule } from "./Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

export class TritoneRule extends Rule {
    apply(index: number, changeSet: Array<Note>, melody: Melody): Array<Note> {
        if (index > 0) {
            let prevNote = melody.notes[index - 1];

            let tritoneOne = prevNote.increment(3);
            let tritoneTwo = prevNote.increment(-3);

            let tempSet = changeSet.map(note => note.note);

            if (!tempSet.includes(tritoneOne.note)) {
                changeSet.push(tritoneOne);
            }

            if (!tempSet.includes(tritoneTwo.note)) {
                changeSet.push(tritoneTwo);
            }  
        } 
        return changeSet;
    }
}