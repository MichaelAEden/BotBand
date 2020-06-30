import * as express from "express";

import { GaWorker } from "./GaWorker";
import { Bot } from "../models/Bot";
import { Note } from "../models/Note";

const app = express();

// Middleware
// app.use((req, res, next) => {
//   if (process.env.DEBUG)
//     console.log(
//       'Received request with body: ',
//       JSON.stringify(req.body, null, 2)
//     );
//   // TODO: add production URL.
//   const origin = process.env.ENV === 'dev' ? 'http://localhost:3000' : '';
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

//   next();
// });

app.get("/", async (req, res) => {
  res.status(200).send("Hello, world!");
});

/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("/createbots/rating", async (req, res) => {
  const worker = new GaWorker();
  if (!req.body) {
    res.status(200).json({ bots: worker.initialBots() });
    return;
  }

  const bots = req.body.bots.map(
    (bot) =>
      new Bot(
        bot.metric,
        bot.melody.notes.map((note) => new Note(note.note))
      )
  );
  const newBots = worker.generateNewBots(bots);

  res.status(200).json({ bots: newBots });
});

/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("/createbots/usage", async (req, res) => {
  let worker = new GaWorker();
  if (!req.body) {
    res.status(200).json({ bots: worker.initialBots() });
    return;
  }

  const bots = req.body.bots.map(
    (bot) =>
      new Bot(
        bot.metric,
        bot.melody.notes.map((note) => new Note(note.note))
      )
  );
  const newBots = worker.generateNewBots(bots);

  res.status(200).json({ bots: newBots });
});

app.get("*", (req, res) => {
  res.send(404);
});

export default app;
