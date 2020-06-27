export class Note {
    key : String;

    constructor(key : String) {
        this.validate(key);
        this.key = key;
    }

    validate(key: String) {
        if (key.length !== 2) {
            throw new Error("Validation Error: Note malformed");
        }
    }

    getOctave(): String {
        return this.key.charAt(1);
    }

    getKey(): String {
        return this.key.charAt(0);
    }
}