import * as express from "express";
import {GaWorker} from "./GaWorker";

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

app.post("createbots/rating", async (req, res) => {
  res.status(200).send("Rating");
});

app.post("createbots/usage", async (req, res) => {
  res.status(200).send("Rating");
});

export default app;
