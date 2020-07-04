// TODO: consideration for sharps and flats.
export class Note {
  note: string;

  constructor(note: string) {
    this.validate(note);
    this.note = note;
  }

  validate(note: string) {
    if (note.length !== 2) {
      throw new Error("Validation Error: Note malformed");
    }
  }

  getOctave(): number {
    return Number(this.note.charAt(1));
  }

  getKey(): string {
    return this.note.charAt(0);
  }

  toNumber(): number {
    // Maps keys to numbers, starting with A1 -> 1.
    let octave = this.getOctave() * 8;
    let note = this.getKey().charCodeAt(0) - "A".charCodeAt(0) + 1;
    return octave + note;
  }

  // Get displacement between this note and given note
  compare(note: Note): number {
    return this.toNumber() - note.toNumber();
  }

  increment(change: number): Note {
    if (change > 7) {
      // console.log("WARNING: Melody wants to jump by an octave! Restricting leap.");
      change = 7;
    }

    let octave = this.getOctave();
    let letter;

    let nUnicode = this.getKey().charCodeAt(0) + change;

    if (nUnicode <= "G".charCodeAt(0) && nUnicode >= "A".charCodeAt(0)) {
      letter = String.fromCharCode(nUnicode);
    } else if (nUnicode > "G".charCodeAt(0)) {
      // -1 is needed just from trial and error
      letter = String.fromCharCode("A".charCodeAt(0) + nUnicode - "G".charCodeAt(0) - 1);
      octave++;
    } else {
      // +1 is needed just from trial and error
      letter = String.fromCharCode("G".charCodeAt(0) - ("A".charCodeAt(0) - nUnicode) + 1);
      octave--;
    }

    let s = String(letter) + String(octave);
    return new Note(s);
  }
}
