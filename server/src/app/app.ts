import * as bodyParser from "body-parser";

import { GaWorker } from "../ga/GaWorker";
import { Bot } from "../models/Bot";
import { parseBotsFromReq } from "../utils/Utils";

const express = require("express"); // Must use a require statement for testing for unknown reason
const app = express();

// Middleware to set CORS headers
app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000", "https://botband-983c7.web.app"];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  console.log(`Received request from origin: '${origin}'`);
  next();
});

// Middleware to parse body to JSON
app.use(bodyParser.json());

/**
 * Expected request body
 * {fitness}
 * Purpose: Feature flagging via API configuration
 */
app.post("/config", async (req, res) => {
  console.log(`Received request with body: ${JSON.stringify(req.body, null, 2)}`);

  if (req.body.mutationRate) {
    GaWorker.MUTATION_RATE = Number(req.body.mutationRate);
  }

  if (req.body.iterations) {
    GaWorker.ITERATIONS = Number(req.body.iterations);
  }

  if (req.body.noFavourateRate) {
    GaWorker.NO_FAVOURITE_RATE = Number(req.body.noFavourateRate);
  }

  if (req.body.musicalFitnessWeight) {
    GaWorker.MUSICAL_FITNESS_WEIGHT = Number(req.body.musicalFitnessWeight);
  }

  res.sendStatus(200);
});

app.get("/config", async (req, res) => {
  res.status(200).json({
    iterations: GaWorker.ITERATIONS,
    mutationRate: GaWorker.MUTATION_RATE,
  });
});

/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("/createbots/rating", async (req, res) => {
  console.log(`Received request with body: ${JSON.stringify(req.body, null, 2)}`);

  const worker = new GaWorker();
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
  console.log(`Received request with body: ${JSON.stringify(req.body, null, 2)}`);

  let worker = new GaWorker();
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

app.get("*", (req, res) => {
  res.sendStatus(404);
});

export default app;
