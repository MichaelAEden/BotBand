// TODO: consideration for sharps and flats.
export class Note {
  note: String;

  constructor(note: String) {
    this.validate(note);
    this.note = note;
  }

  validate(note: String) {
    if (note.length !== 2) {
      throw new Error("Validation Error: Note malformed");
    }
  }

  getOctave(): String {
    return this.note.charAt(1);
  }

  getKey(): String {
    return this.note.charAt(0);
  }

  // Get displacement between this note and given note
  compare(note: Note): number {
    let dOctave = (Number(this.getOctave()) - Number(note.getOctave())) * 8;
    let dNote = this.getKey().charCodeAt(0) - note.getKey().charCodeAt(0);

    return dOctave + dNote;
  }

  increment(change: number): Note {
    if (change > 7) {
      throw Error("Number is too high!");
    }

    let octave = Number(this.getOctave());
    let letter;

    let nUnicode = this.getKey().charCodeAt(0) + change;

    if (nUnicode <= "G".charCodeAt(0) && nUnicode >= "A".charCodeAt(0)) {
      letter = String.fromCharCode(nUnicode);
    } else if (nUnicode > "G".charCodeAt(0)) {
      // -1 is needed just from trial and error
      letter = String.fromCharCode(
        "A".charCodeAt(0) + nUnicode - "G".charCodeAt(0) - 1
      );
      octave++;
    } else {
      // +1 is needed just from trial and error
      letter = String.fromCharCode(
        "G".charCodeAt(0) - ("A".charCodeAt(0) - nUnicode) + 1
      );
      octave--;
    }

    let s = String(letter) + String(octave);
    return new Note(s);
  }
}
