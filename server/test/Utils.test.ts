import { selectRandomWeighted } from "../src/utils/Utils";

test("adds 1 + 2 to equal 3", () => {
  const selection = selectRandomWeighted(
    ["a", "b", "c", "d", "e"],
    [1, 0, 0, 0, 0],
    10
  );
  expect(selection.length).toBe(10);
  expect(selection.some((item) => item !== "a")).toBe(false);
});
