import { Melody } from './Melody';
import { Note } from './Note';

export abstract class Rule {
    abstract apply(index: Number, changeSet: Array<Note>, melody: Melody): Array<Note>;
}