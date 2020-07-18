import app from "../src/app/app";
const request = require("supertest");

describe("Test: /createbots/rating", () => {
  test("should return initial melodies if empty body", (done) => {
    request(app)
      .post("/createbots/rating")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        const melody = response.body.bots[0].melody.notes.map((note) => note.note).join(",");
        expect(melody).toBe("C4,G4,G4,F4");
        done();
      });
  });
});
