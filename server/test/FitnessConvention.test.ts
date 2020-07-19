import { evaluateRange, evaluateStepwise, evaluateWhoop } from "../src/ga/FitnessConvention";
import { Melody } from "../src/models/Melody";

describe("Range evaluator", () => {
  test("give fitness of 1 if all notes are within 1.5 octaves", () => {
    const melody = Melody.fromString("A3,A3,B4,B4");
    const fitness = evaluateRange(melody);
    expect(fitness).toBe(1);
  });

  test("give fitness of 0.25 if all notes are within 4 octaves", () => {
    const melody = Melody.fromString("A3,A3,A7,A7");
    const fitness = evaluateRange(melody);
    expect(fitness).toBe(0.25);
  });
});

describe("Stepwise evaluator", () => {
  test("give fitness of 1 to stepwise melody", () => {
    const melody = Melody.fromString("A3,B3,C4,D4,E4,F4");
    const fitness = evaluateStepwise(melody);
    expect(fitness).toBe(1);
  });

  test("give fitness of 0.5 if half of melody is stepwise", () => {
    const melody = Melody.fromString("A3,B3,A4,B4");
    const fitness = evaluateStepwise(melody);
    expect(fitness).toBe(0.5);
  });
});

describe("Whoop evaluator", () => {
  test("give reasonable fitness", () => {
    const melody = Melody.fromString("C4,G4,D4,A4,B4,C5,C5,D5,B4,E5");
    const fitness = evaluateWhoop(melody);
    expect(fitness).toBeLessThan(1);
    expect(fitness).toBeGreaterThanOrEqual(0);
  });
});
