import { Melody } from './Melody';

export class Bot {
    usage : Number;
    melody: Melody;

    constructor(usage: Number, melody: Melody) {
        this.usage = usage;
        this.melody = melody;
    }
}