import * as express from "express";
import * as bodyParser from "body-parser";

import { GaWorker } from "./GaWorker";
import { Bot } from "../models/Bot";
import { Note } from "../models/Note";

const FITNESS_USER = "USER";
const FITNESS_CONVENTION = "CONVENTION";

let fitnessMethod = "USER";

const app = express();

// Middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://botband-983c7.web.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  console.log(`Received request from origin: '${origin}'`);
  next();
});

// Parse body to JSON
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.status(200).send("Hello, world!");
});

/**
 * Expected request body
 * {fitness}
 * Purpose: Feature flagging via API configuration
 */
app.post("/config/fitness", async (req, res) => {
  console.log(
    `Received request with body: ${JSON.stringify(req.body, null, 2)}`
  );
  if (req.body.fitness) {
    switch (req.body.fitness) {
      case FITNESS_USER:
        fitnessMethod = FITNESS_USER;
        break;
      case FITNESS_CONVENTION:
        fitnessMethod = FITNESS_CONVENTION;
        break;
      default:
        res
          .status(400)
          .send(`Invalid setting for fitness: ${req.body.fitness}`);
    }
  }
  res.sendStatus(200);
});

/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("/createbots/rating", async (req, res) => {
  console.log(
    `Received request with body: ${JSON.stringify(req.body, null, 2)}`
  );

  const worker = new GaWorker(fitnessMethod);
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (!req.body.bots || (req.body.bots && req.body.bots.length === 0)) {
    console.log(`First request initialized from ${ip}`);
    res.status(200).json({ bots: worker.initialBots() });
    return;
  }

  console.log(`Handling request from ${ip}`);

  const bots = parseBotsFromReq(req);
  const newBots = worker.generateNewBots(bots);

  res.status(200).json({ bots: newBots });
});

/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("/createbots/usage", async (req, res) => {
  console.log(
    `Received request with body: ${JSON.stringify(req.body, null, 2)}`
  );

  let worker = new GaWorker(fitnessMethod);
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (!req.body.bots || (req.body.bots && req.body.bots.length === 0)) {
    console.log(`First request initialized from ${ip}`);
    res.status(200).json({ bots: worker.initialBots() });
    return;
  }

  console.log(`Handling request from ${ip}`);

  const bots: Bot[] = parseBotsFromReq(req);
  const newBots = worker.generateNewBots(bots);

  res.status(200).json({ bots: newBots });
});

const parseBotsFromReq = (req) => {
  return req.body.bots.map(
    (bot) =>
      new Bot(
        bot.metric,
        bot.melody.notes.map((note) => new Note(note.note))
      )
  );
};

app.get("*", (req, res) => {
  res.sendStatus(404);
});

export default app;
