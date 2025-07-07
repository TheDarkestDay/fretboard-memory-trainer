import { Note } from "./Note";

export class NotesSequence {
    private readonly range: Note[]

    constructor(range: Note[]) {
        this.range = range;
    }

    getNext() {
        const randomIndex = Math.floor(Math.random() * this.range.length);
        return this.range[randomIndex];
    }
}