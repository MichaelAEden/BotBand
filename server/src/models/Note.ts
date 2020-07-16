// TODO: replace hardcoded octave values with this constant.
export const OCTAVE = 7;

// TODO: consideration for sharps and flats.
export class Note {
  note: string;
  code: number;

  private constructor(note: string, code: number) {
    this.note = note;
    this.code = code;
  }

  static fromString(note: string) {
    Note.validateNote(note);
    return new Note(note, Note.getCode(note));
  }

  static fromCode(code: number) {
    Note.validateCode(code);
    return new Note(Note.getNote(code), code);
  }

  private static validateNote(note: string) {
    if (note.length !== 2) {
      const msg = `Invalid note: ${note}`;
      console.log(msg);
      throw new Error(msg);
    }
  }

  private static validateCode(code: number) {
    if (code < 1) {
      const msg = `Invalid code: ${code}`;
      console.log(msg);
      throw new Error(msg);
    }
  }

  private static getNote(code: number): string {
    const noteOffset = code % OCTAVE;
    const note = String.fromCharCode("A".charCodeAt(0) + noteOffset - 1);
    // Octaves start at C, not A; must handle this explicitly.
    const octave = Math.floor(code / OCTAVE) + (noteOffset >= 3 ? 2 : 1);
    return note + octave;
  }

  private static getCode(note: string): number {
    // Maps keys to numbers, starting with A1 -> 1.
    const noteOffset = note.charCodeAt(0) - "A".charCodeAt(0) + 1;
    // Octaves start at C, not A; must handle this explicitly.
    const octaveOffset = Number(note.charAt(1)) - (noteOffset >= 3 ? 2 : 1);
    return octaveOffset * OCTAVE + noteOffset;
  }

  getOctave(): number {
    return Number(this.note.charAt(1));
  }

  getKey(): string {
    return this.note.charAt(0);
  }

  // Get displacement between this note and given note
  compare(note: Note): number {
    return this.code - note.code;
  }

  increment(change: number): Note {
    if (change > OCTAVE) change = OCTAVE;
    return Note.fromCode(this.code + change);
  }
}
