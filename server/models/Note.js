"use strict";
exports.__esModule = true;
exports.Note = void 0;
var Note = /** @class */ (function () {
    function Note(key) {
        this.validate(key);
        this.key = key;
    }
    Note.prototype.validate = function (key) {
        if (key.length !== 2) {
            throw new Error("Validation Error: Note malformed");
        }
    };
    Note.prototype.getOctave = function () {
        return this.key.charAt(1);
    };
    Note.prototype.getKey = function () {
        return this.key.charAt(0);
    };
    return Note;
}());
exports.Note = Note;
