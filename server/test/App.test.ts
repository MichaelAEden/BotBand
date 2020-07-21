import app from "../src/app/App";
import { GaWorker } from "../src/ga/GaWorker";
const request = require("supertest");

describe("Test: /bots", () => {
  test("should return initial melodies if empty body", (done) => {
    request(app)
      .post("/bots")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const bots = response.body.bots;
        expect(bots).toHaveLength(GaWorker.defaultConfig().selectionSize);
        expect(bots[0].melody.notes).toHaveLength(4);
        done();
      });
  });
});
