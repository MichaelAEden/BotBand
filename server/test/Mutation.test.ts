import { GaWorker } from "../src/ga/gaworker";
import { LeapRule } from "../src/rules/LeapRule";
import { TritoneRule } from "../src/rules/TritoneRule";
import { CounterTenorRule } from "../src/rules/CounterTenorRule";
import { Bot } from "../src/models/Bot";
import { Melody } from "../src/models/Melody";
import { OctaveRule } from "../src/rules/OctaveRule";
import { Note } from "../src/models/Note";

test("mutation leap rule returns correct set", () => {
  let worker = new GaWorker();

  let startSet = worker.createStartSet();
  let bot = new Bot(0, Melody.fromString("C4,G4,D4,A4,B4,B4,F4,B5,D4,E4"));

  let rule = new LeapRule();

  // Step movement
  let expectedOutput = startSet.map((n) => n.note);
  let output = rule.apply(9, startSet, bot.melody).map((n) => n.note);
  expect(output.length).toBe(expectedOutput.length);
  expect(output.filter((o) => !expectedOutput.includes(o)).length === 0).toBe(true);

  // Post recovery
  expectedOutput = startSet.map((n) => n.note);
  output = rule.apply(3, startSet, bot.melody).map((n) => n.note);
  expect(output.length).toBe(expectedOutput.length);
  expect(output.filter((o) => !expectedOutput.includes(o)).length === 0).toBe(true);

  // Jump up recovery
  expectedOutput = ["D4", "C4", "B4"];
  output = rule.apply(4, startSet, bot.melody).map((n) => n.note);
  expect(output.length).toBe(expectedOutput.length);
  expect(output.filter((o) => !expectedOutput.includes(o)).length === 0).toBe(true);

  // Jump down recovery
  expectedOutput = ["B4", "C4", "D4", "E4"];
  output = rule.apply(7, startSet, bot.melody).map((n) => n.note);
  expect(output.length).toBe(expectedOutput.length);
  expect(output.filter((o) => !expectedOutput.includes(o)).length === 0).toBe(true);
});

test("mutation tritone rule returns correct set", () => {
  let worker = new GaWorker();

  let startSet = worker.createStartSet();
  let bot = new Bot(0, Melody.fromString("C4,G4,D4,A4,B4,B4,F4,B5,D4,E4"));

  let rule = new TritoneRule();

  // Adds tritone
  let set = startSet.filter((n) => n.note === "B4");
  let expectedOutput = ["B4", "E4", "F3"];
  let output = rule.apply(5, set, bot.melody).map((n) => n.note);
  expect(output.length).toBe(expectedOutput.length);
  expect(output.filter((o) => !expectedOutput.includes(o)).length === 0).toBe(true);
});

test("Octave rule works", () => {
  let bot = new Bot(0, Melody.fromString("C4,G4,D4,A4,B4,B4,F4,B5,D4,E4"));
  let rule = new OctaveRule();

  // Stays within Octave
  let set = ["D3", "G3", "A4", "B4", "D4", "G4", "A5", "G5"].map((s) => Note.fromString(s));
  let expectedOutput = ["G3", "A4", "B4", "D4", "G4", "A5", "G5"];
  let output = rule.apply(2, set, bot.melody).map((n) => n.note);
  expect(output.length).toBe(expectedOutput.length);
  expect(output.filter((o) => !expectedOutput.includes(o)).length === 0).toBe(true);
});

test("Vocal Range Rules", () => {
  let bot = new Bot(0, Melody.fromString("C4,G4,D4,A4"));

  let rule = new CounterTenorRule();
  let set = ["E6", "F5", "E5", "D5", "A3", "E3", "F3"].map((s) => Note.fromString(s));

  let output = rule.apply(0, set, bot.melody).map((n) => n.note);
  let expectedOutput = ["E5", "D5", "E3", "F3"];

  expect(output.length).toBe(expectedOutput.length);
  expect(output.filter((o) => !expectedOutput.includes(o)).length === 0).toBe(true);
});

test("End To End No Crash", () => {
  let worker = new GaWorker();

  // create set of bots
  let bots = worker.initialBots();
  bots.forEach(bot => bot.metric = Math.floor(Math.random() + 1));

  worker.generateNewBots(bots);

  // pass if no crash
  expect(true).toBe(true);
});
