import { Melody } from './Melody';

export class Bot {
    // This will represent the usage count or the like / dislike depending on the GA interpretation.
    metric : number;
    melody: Melody;

    constructor(usage: number, melody: Melody) {
        this.metric = usage;
        this.melody = melody;
    }

    getMelody(): Melody {
        return this.melody;
    }

    getMetric(): number {
        return this.metric;
    }
}