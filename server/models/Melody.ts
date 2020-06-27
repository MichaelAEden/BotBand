import { Note } from './Note';

export class Melody {
    value: Note[]

    constructor(value: Note[]) {
        this.value = value;
    }
}