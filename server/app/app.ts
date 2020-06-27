import * as express from "express";
import {GaWorker} from "./GaWorker";
import {Bot} from "../models/Bot"
import { Note } from "../models/Note";

const app = express();

// Middleware
app.use((req, res, next) => {
  if (process.env.DEBUG)
    console.log(
      "Received request with body: ",
      JSON.stringify(req.body, null, 2)
    );
  // TODO: add production URL.
  const origin = process.env.ENV === "dev" ? "http://localhost:3000" : "";
  res.set("Access-Control-Allow-Origin", origin);

  next();
});

app.get("/test", async (req, res) => {
  let worker = new GaWorker();
  console.log(worker.createStartSet());
  res.status(200).send("Hello, world!");
});

/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("createbots/rating", async (req, res) => {
  let botReqs = req.body.bots;
  let botList = new Array<Bot>();

  for (let key in botReqs) {
    let botData = botReqs[key];
    botList.push(new Bot(botData.rating, botData.melody.map(s => new Note(s))));
  }

  let worker = new GaWorker();
  let nextGeneration = worker.generateNewBots(botList);

  // TODO send nextGen
  res.status(200).send("Rating");
});

/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("createbots/usage", async (req, res) => {
  let botReqs = req.body.bots;
  let botList = new Array<Bot>();

  for (let key in botReqs) {
    let botData = botReqs[key];
    botList.push(new Bot(botData.count, botData.melody.map(s => new Note(s))));
  }

  let worker = new GaWorker();
  let nextGeneration = worker.generateNewBots(botList);
  
  // TODO send nextGen
  res.status(200).send("Usage");
});

export default app;
