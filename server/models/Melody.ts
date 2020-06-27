import { Note } from './Note';

export class Melody {
    melody: Note[]

    constructor(melody: Note[]) {
        this.melody = melody;
    }
}