import { Note } from "../src/models/Note";

test("parse code from note", () => {
  expect(Note.fromString("A1").code).toBe(1); // Starts at 1
  expect(Note.fromString("B1").code).toBe(2);
  expect(Note.fromString("C2").code).toBe(3); // Octave changes at C
  expect(Note.fromString("D2").code).toBe(4);
  expect(Note.fromString("G3").code).toBe(14); // Test end of octave
  expect(Note.fromString("A3").code).toBe(15); // Test start of octave
});

test("parse note from code", () => {
  expect(Note.fromCode(1).note).toBe("A1"); // Starts at 1
  expect(Note.fromCode(2).note).toBe("B1");
  expect(Note.fromCode(3).note).toBe("C2"); // Octave changes at C
  expect(Note.fromCode(4).note).toBe("D2");
  expect(Note.fromCode(14).note).toBe("G3"); // Test end of octave
  expect(Note.fromCode(15).note).toBe("A3"); // Test start of octave
});
