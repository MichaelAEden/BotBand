"use strict";
exports.__esModule = true;
exports.GaWorker = void 0;
var Melody_1 = require("../models/Melody");
var Note_1 = require("../models/Note");
var GaWorker = /** @class */ (function () {
    function GaWorker() {
    }
    GaWorker.prototype.generateStartingMelody = function () {
        var melodies = new Array();
        melodies.push(new Melody_1.Melody(this.createNoteArray('C4,G4,D4,A4,B4,C5,C5,D5')));
        melodies.push(new Melody_1.Melody(this.createNoteArray('A4,C5,A4,A4,E4,F4,G4,A4')));
        melodies.push(new Melody_1.Melody(this.createNoteArray('B4,C5,F4,F4,E5,F5,B4,G4')));
        melodies.push(new Melody_1.Melody(this.createNoteArray('G3,B4,D4,E4,G3,D5,D5,D5')));
        melodies.push(new Melody_1.Melody(this.createNoteArray('G4,D5,F5,B4,F4,F4,F4,C5')));
        melodies.push(new Melody_1.Melody(this.createNoteArray('B3,A4,G4,G5,E4,B4,D4,E4')));
        melodies.push(new Melody_1.Melody(this.createNoteArray('E5,F4,D4,G4,D5,A4,F4,A4')));
        melodies.push(new Melody_1.Melody(this.createNoteArray('C5,C5,G5,B4,G4,C5,C5,G5')));
        melodies.push(new Melody_1.Melody(this.createNoteArray('G4,C4,F4,B3,G3,B3,D4,E4')));
        melodies.push(new Melody_1.Melody(this.createNoteArray('G5,E5,D5,B4,F4,A4,G4,A4')));
        return melodies;
    };
    GaWorker.prototype.createNoteArray = function (s) {
        return s.split(',').map(function (s) { return new Note_1.Note(s); });
    };
    GaWorker.prototype.generateNewBots = function (oldGeneration) {
        // create new pool of bots
        var newGeneration = this.selectPool(this.evaluateFitness(oldGeneration));
        // apply mutations in accordance with ruleset
        this.mutateBots(newGeneration);
        return newGeneration;
    };
    GaWorker.prototype.evaluateFitness = function (oldGeneration) {
        return new Array();
    };
    // uses weights to psuedo-random select the next generation bots
    GaWorker.prototype.selectPool = function (ratings) {
        return new Array();
    };
    GaWorker.prototype.mutateBots = function (bots) {
        var _this = this;
        bots.forEach(function (bot) {
            _this.applyRuleSet(bot);
        });
    };
    GaWorker.prototype.applyRuleSet = function (bot) {
        // let startSet = this.createStartSet();
        console.log("Applying rules to bots...");
    };
    // helper function to generate 3 octaves of notes.
    GaWorker.prototype.createStartSet = function () {
        var startSet = new Array();
        new Array('A', 'B', 'C', 'D', 'E', 'F', 'G').forEach(function (s) {
            startSet.push(s + '3');
            startSet.push(s + '4');
            startSet.push(s + '5');
        });
        return startSet;
    };
    return GaWorker;
}());
exports.GaWorker = GaWorker;
