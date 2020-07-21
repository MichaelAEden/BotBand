import * as bodyParser from "body-parser";

import { MetadataCache } from "./MetadataCache";
import { GaWorker } from "../ga/GaWorker";
import { parseBotsFromReq } from "../utils/Utils";

const GA_CONFIG = GaWorker.defaultConfig();

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
  next();
});

// Middleware to parse body to JSON
app.use(bodyParser.json());

// Middleware to log request metadata
app.use((req, _res, next) => {
  const origin = req.headers.origin;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(
    `Received request with origin: ${origin}, IP: ${ip}, body: ${JSON.stringify(req.body, null, 2)}`
  );
  next();
});

/**
 * See GaWorkerConfig interface in GaWorker.ts for all configurable fields
 * Purpose: Feature flagging via API configuration
 */
app.post("/config", async (req, res) => {
  // TODO: validate provided values.
  if (req.body.iterations !== undefined) GA_CONFIG.iterations = Number(req.body.iterations);
  if (req.body.mutationRate !== undefined) GA_CONFIG.mutationRate = Number(req.body.mutationRate);
  if (req.body.noFavourateWeight !== undefined)
    GA_CONFIG.noFavourateWeight = Number(req.body.noFavourateWeight);
  if (req.body.musicalFitnessWeight !== undefined)
    GA_CONFIG.musicalFitnessWeight = Number(req.body.musicalFitnessWeight);
  if (req.body.randomInitial !== undefined)
    GA_CONFIG.randomInitial = Boolean(req.body.randomInitial);
  if (req.body.populationSize !== undefined)
    GA_CONFIG.populationSize = Number(req.body.populationSize);
  if (req.body.selectionSize !== undefined)
    GA_CONFIG.selectionSize = Number(req.body.selectionSize);

  res.status(200).json(GA_CONFIG);
});

app.get("/config", async (_req, res) => {
  res.status(200).json(GA_CONFIG);
});

/**
 * Get metadata from latest user "session"
 */
app.get("/data/latest", async (_req, res) => {
  return res.status(200).json(MetadataCache.getSession());
});

/**
 * Get metadata from all user "sessions"
 */
app.get("/data", async (_req, res) => {
  return res.status(200).json(MetadataCache.getSessions());
});

/**
 * Delete all data from previous "sessions"
 */
app.delete("/data", async (_req, res) => {
  MetadataCache.clearSessions();
  return res.status(200).send();
});

/**
 * Expected request body
 * {bots : [{metric, melody}, {...}, ...]}
 */
app.post("/bots", async (req, res) => {
  let bots;
  let generation = 0;
  const worker = new GaWorker(GA_CONFIG);
  if (!req.body.bots || (req.body.bots && req.body.bots.length === 0)) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(`First request initialized from ${ip}`);
    MetadataCache.newSession();
    bots = worker.initialBots();
    generation = 0;
  } else {
    const reqBots = parseBotsFromReq(req);
    bots = worker.generateNewBots(reqBots);
    generation = req.body.generation + 1;
  }

  const timestamps = { startTime: req.body.startTime, endTime: req.body.endTime };

  // TODO: this step should be BEFORE the bots are generated.
  MetadataCache.addGeneration(bots, generation, timestamps);

  res.status(200).json({ bots, generation });
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

export default app;
