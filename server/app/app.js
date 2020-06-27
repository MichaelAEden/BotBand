"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var GaWorker_1 = require("./GaWorker");
var Bot_1 = require("../models/Bot");
var Note_1 = require("../models/Note");
var app = express();
// Middleware
app.use(function (req, res, next) {
    if (process.env.DEBUG)
        console.log("Received request with body: ", JSON.stringify(req.body, null, 2));
    // TODO: add production URL.
    var origin = process.env.ENV === "dev" ? "http://localhost:3000" : "";
    res.set("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});
app.get("/test", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var worker;
    return __generator(this, function (_a) {
        worker = new GaWorker_1.GaWorker();
        console.log(worker.createStartSet());
        res.status(200).send("Hello, world!");
        return [2 /*return*/];
    });
}); });
/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("/createbots/rating", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var worker, botReqs, botList, key, botData, nextGeneration;
    return __generator(this, function (_a) {
        worker = new GaWorker_1.GaWorker();
        if (!req.body) {
            res.status(200).json({ 'bots': worker.generateStartingMelody() });
            return [2 /*return*/];
        }
        botReqs = req.body.bots;
        botList = new Array();
        for (key in botReqs) {
            botData = botReqs[key];
            botList.push(new Bot_1.Bot(botData.rating, botData.melody.map(function (s) { return new Note_1.Note(s); })));
        }
        nextGeneration = worker.generateNewBots(botList);
        // TODO send nextGen
        res.status(200).send("Rating");
        return [2 /*return*/];
    });
}); });
/**
 * Expected request body
 * {bots : [{rating, melody}, {...}, ...]}
 */
app.post("/createbots/usage", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var worker, botReqs, botList, key, botData, nextGeneration;
    return __generator(this, function (_a) {
        worker = new GaWorker_1.GaWorker();
        if (!req.body) {
            res.status(200).json({ 'bots': worker.generateStartingMelody() });
            return [2 /*return*/];
        }
        botReqs = req.body.bots;
        botList = new Array();
        for (key in botReqs) {
            botData = botReqs[key];
            botList.push(new Bot_1.Bot(botData.count, botData.melody.map(function (s) { return new Note_1.Note(s); })));
        }
        nextGeneration = worker.generateNewBots(botList);
        // TODO send nextGen
        res.status(200).send("Usage");
        return [2 /*return*/];
    });
}); });
app.get('*', function (req, res) {
    res.send(404);
});
exports["default"] = app;
