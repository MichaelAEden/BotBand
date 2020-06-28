import { Rule } from "./Rule";
import { Melody } from "./Melody";
import { Note } from "./Note";

export class LeapRule extends Rule {
  apply(index: number, changeSet: Array<Note>, melody: Melody): Array<Note> {
    if (index < 2) {
      return changeSet;
    } else if (index == 2) {
      let notePrev1 = melody.notes[index - 1];
      let notePrev2 = melody.notes[index - 2];

      let deltaPrev1 = notePrev1.compare(notePrev2);

      if (deltaPrev1 > 1) {
        // Defines the lowest note to recover to
        let threshold = notePrev1.increment(-1 * deltaPrev1 + 1);

        // Defines the filter set to be between the current note (exclusive) and the lowest possible note (inclusive)
        changeSet = changeSet.filter(
          (n) => n.compare(threshold) < deltaPrev1 && n.compare(threshold) >= 0
        );
      } else if (deltaPrev1 < 1) {
        // case: deltaPrev2 < -1

        // Defines the lowest note to recover to
        let threshold = notePrev1.increment(-1 * deltaPrev1 + 1);

        // Defines the filter set to be between the current note (exclusive) and the lowest possible note (inclusive)
        changeSet = changeSet.filter(
          (n) => n.compare(threshold) > deltaPrev1 && n.compare(threshold) <= 0
        );
      } else {
        // if it's the exact same note or a step anything is possible.
        return changeSet;
      }
    } else {
      let notePrev1 = melody.notes[index - 1];
      let notePrev2 = melody.notes[index - 2];
      let notePrev3 = melody.notes[index - 2];

      let deltaPrev1 = notePrev1.compare(notePrev2);
      let deltaPrev2 = notePrev2.compare(notePrev3);

      if (deltaPrev1 < 0 !== deltaPrev2 < 0) {
        // recovery has already occurred
        return changeSet;
      } else if (deltaPrev1 <= 1 || deltaPrev1 >= -1) {
        // if it's the exact same note or a step anything is possible.
        return changeSet;
      } else if (deltaPrev1 > 1) {
        // Defines the lowest note to recover to
        let threshold = notePrev1.increment(-1 * deltaPrev1 + 1);

        // Defines the filter set to be between the current note (exclusive) and the lowest possible note (inclusive)
        changeSet = changeSet.filter(
          (n) => n.compare(threshold) < deltaPrev1 && n.compare(threshold) >= 0
        );
      } else {
        // case: deltaPrev2 < -1

        // Defines the lowest note to recover to
        let threshold = notePrev1.increment(-1 * deltaPrev1 + 1);

        // Defines the filter set to be between the current note (exclusive) and the lowest possible note (inclusive)
        changeSet = changeSet.filter(
          (n) => n.compare(threshold) > deltaPrev1 && n.compare(threshold) <= 0
        );
      }
    }

    return changeSet;
  }
}
