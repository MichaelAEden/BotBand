import { Rule } from "./Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

export class CounterTenorRule extends Rule {

    HIGH = new Note('E5');
    LOW = new Note('E3');

    apply(index: number, changeSet: Array<Note>, melody: Melody): Array<Note> {
        return changeSet.filter(note => 
            note.compare(this.HIGH) <= 0 && note.compare(this.LOW) >= 0);
    }
}