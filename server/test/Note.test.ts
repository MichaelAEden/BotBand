import { Note } from "../src/models/Note";

test("parse code from note", () => {
  expect(Note.fromString("A1").code).toBe(1); // Starts at 1
  expect(Note.fromString("B1").code).toBe(2);
  expect(Note.fromString("C2").code).toBe(3); // Octave changes at C
  expect(Note.fromString("D3").code).toBe(11);
});

test("parse note from code", () => {
  expect(Note.fromCode(1).note).toBe("A1"); // Starts at 1
  expect(Note.fromCode(2).note).toBe("B1");
  expect(Note.fromCode(3).note).toBe("C2"); // Octave changes at C
  expect(Note.fromCode(11).note).toBe("D3");
});
