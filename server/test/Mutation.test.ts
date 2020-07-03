import { GaWorker } from "../src/app/gaworker";
import { evaluate } from "../src/app/FitnessUser";
import { LeapRule } from "../src/rules/LeapRule";
import { TritoneRule } from "../src/rules/TritoneRule";

test("user fitness evaluator performs correctly", () => {
    let worker = new GaWorker("USER");
    let bots = worker.initialBots();
  
    bots.map(bot => bot.metric = Math.round(Math.random() * 3));
  
    let expectedFitness = bots.map(bot => bot.metric);
    let fitnesses = evaluate(bots);
  
    console.log(fitnesses);
  
    expect(expectedFitness.length === fitnesses.length).toBe(true);
  
    for (var i = 0; i < expectedFitness.length; i++) {
      expect(expectedFitness[i] === fitnesses[i]).toBe(true);
    }
  });
  
test("mutation leap rule returns correct set", () => {
    let worker = new GaWorker("USER");
  
    let startSet = worker.createStartSet();
    let bot = worker.createBot("C4,G4,D4,A4,B4,B4,F4,B5,D4,E4");
  
    let rule = new LeapRule();
  
    console.log("step movement");
    let expectedOutput = startSet.map(n => n.note);
    let output = rule.apply(9, startSet, bot.melody).map(n => n.note);
    expect(output.length).toBe(expectedOutput.length);
    expect(output.filter(o => !expectedOutput.includes(o)).length === 0).toBe(true);
  
    console.log("post recovery");
    expectedOutput = startSet.map(n => n.note);
    output = rule.apply(3, startSet, bot.melody).map(n => n.note);
    expect(output.length).toBe(expectedOutput.length);
    expect(output.filter(o => !expectedOutput.includes(o)).length === 0).toBe(true);
  
    console.log("jump up recovery");
    expectedOutput = ["D4","C4","B4"];
    output = rule.apply(4, startSet, bot.melody).map(n => n.note);
    expect(output.length).toBe(expectedOutput.length);
    expect(output.filter(o => !expectedOutput.includes(o)).length === 0).toBe(true);
  
    console.log("jump down recovery");
    expectedOutput = ["B4","C4","D4","E4"];
    output = rule.apply(7, startSet, bot.melody).map(n => n.note);
    expect(output.length).toBe(expectedOutput.length);
    expect(output.filter(o => !expectedOutput.includes(o)).length === 0).toBe(true);
  
});

test("mutation tritone rule returns correct set", () => {

    let worker = new GaWorker("USER");
  
    let startSet = worker.createStartSet();
    let bot = worker.createBot("C4,G4,D4,A4,B4,B4,F4,B5,D4,E4");
  
    let rule = new TritoneRule();
  
    console.log("adds tritone");
    let set = startSet.filter(n => n.note === "B4");
    let expectedOutput = ["B4", "E4", "F3"];
    let output = rule.apply(5, set, bot.melody).map(n => n.note);

    console.log(output);
    console.log(expectedOutput);

    expect(output.length).toBe(expectedOutput.length);
    expect(output.filter(o => !expectedOutput.includes(o)).length === 0).toBe(true);

    console.log("no double add");
    expectedOutput = startSet.map(n => n.note);
    output = rule.apply(5, startSet, bot.melody).map(n => n.note);

    expect(output.length).toBe(expectedOutput.length);
    expect(output.filter(o => !expectedOutput.includes(o)).length === 0).toBe(true);

});