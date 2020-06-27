import { Melody } from './Melody';

export abstract class Rule {
    abstract apply(index: Number, changeSet: Set<String>, melody: Melody) : Set<String>;
}