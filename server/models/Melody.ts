import { Note } from './Note';

const NOTES = ['A','B','C','D','E','F','G']

export class Melody {
    melody: Note[]
    num_notes: number
    
    constructor(melody: Note[]) {
        this.melody = melody;
    }

}