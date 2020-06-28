import { Melody } from "./Melody";

export class Bot {
  // This will represent the usage count or the like / dislike depending on the GA interpretation.
  metric: number;
  melody: Melody;

  constructor(metric: number, melody: Melody) {
    this.metric = metric;
    this.melody = melody;
  }
}
