import { Melody } from "./Melody";

export class Bot {
  // Metric is 1 if the user has favourited the robot, 0 otherwise
  metric: number;
  melody: Melody;
  playCount: number;

  constructor(metric: number, melody: Melody, playCount: number = 0) {
    this.metric = metric;
    this.melody = melody;
    this.playCount = playCount;
  }

  getHash() {
    let score = 0;
    let index = 1;

    this.melody.notes.forEach(note => {

        score += note.code * index;
        index *= 100;

    });

    return score;
  }
}
