import { Melody } from './Melody';

export abstract class Rule {
    abstract apply(index: Number, changeSet: Array<String>, melody: Melody): Array<String>;
}