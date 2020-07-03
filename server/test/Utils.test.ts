import { parseBotsFromReq, selectRandomWeighted } from "../src/utils/Utils";
import { Bot } from "../src/models/Bot";
import { Melody } from "../src/models/Melody";
import { Note } from "../src/models/Note";

test("parse bots from request", () => {
  const req = {
    body: {
      bots: [{ metric: 0.5, melody: { notes: [{ note: "A1" }, { note: "A2" }] } }],
    },
  };
  const bots = parseBotsFromReq(req);
  expect(JSON.stringify(bots)).toBe(
    JSON.stringify([new Bot(0.5, new Melody([new Note("A1"), new Note("A2")]))])
  );
});

test("select only item with non-zero weight", () => {
  const selection = selectRandomWeighted(["a", "b", "c", "d", "e"], [1, 0, 0, 0, 0], 10);
  expect(selection.length).toBe(10);
  expect(selection.some((item) => item !== "a")).toBe(false);
});

test("select items with equal probability", () => {
  const selection = selectRandomWeighted(["a", "b", "c"], [0.5, 0.5, 0.5], 100);
  expect(selection.length).toBe(100);
  expect(selection.filter((item) => item === "a").length).toBeGreaterThan(25);
  expect(selection.filter((item) => item === "b").length).toBeGreaterThan(25);
  expect(selection.filter((item) => item === "c").length).toBeGreaterThan(25);
});
