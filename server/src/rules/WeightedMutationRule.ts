import { Rule } from "./Rule";
import { Melody } from "../models/Melody";
import { Note } from "../models/Note";

export class WeightedMutationRule extends Rule {
    apply(index: number, changeSet: Array<Note>, melody: Melody): Array<Note> {
        
        // NO IMPL
        // TODO: make it so steps and tritones are favoured over other mutations to be 'pop'-y

        return changeSet;
    }
}