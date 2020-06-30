import * as express from "express";
import * as bodyParser from "body-parser";

import { GaWorker } from "./GaWorker";
import { Bot } from "../models/Bot";
import { Note } from "../models/Note";

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(
    "Received request with body: ",
    JSON.stringify(req.body, null, 2)
  );
  const allowedOrigins = [
    "http://localhost:3000",
    "https://thebotband.herokuapp.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.status(200).send("Hello, world!");
});

/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("/createbots/rating", async (req, res) => {
  const worker = new GaWorker();
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (!req.body) {
    console.log(`First request initialized from ${ip}`);
    res.status(200).json({ bots: worker.initialBots() });
    return;
  }

  console.log(`Handling request from ${ip}`);

  const bots = getReqBots(req);
  const newBots = worker.generateNewBots(bots);

  res.status(200).json({ bots: newBots });
});

/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("/createbots/usage", async (req, res) => {
  let worker = new GaWorker();
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (!req.body) {
    console.log(`First request initialized from ${ip}`);
    res.status(200).json({ bots: worker.initialBots() });
    return;
  }

  console.log(`Handling request from ${ip}`);

  const bots: Bot[] = getReqBots(req);
  const newBots = worker.generateNewBots(bots);

  res.status(200).json({ bots: newBots });
});

const getReqBots = (req) => {
  return req.body.bots.map(
    (bot) =>
      new Bot(
        bot.metric,
        bot.melody.notes.map((note) => new Note(note.note))
      )
  );
}

app.get("*", (req, res) => {
  res.sendStatus(404);
});

export default app;
