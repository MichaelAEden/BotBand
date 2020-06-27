import { Melody } from './Melody';

export class Bot {
    // This will represent the usage count or the like / dislike depending on the GA interpretation.
    metric : Number;
    melody: Melody;

    constructor(usage: Number, melody: Melody) {
        this.metric = usage;
        this.melody = melody;
    }
}