import type { NotesRange } from "./note-ranges";

export class NotesSequence {
    private readonly range: NotesRange

    constructor(range: NotesRange) {
        this.range = range;
    }

    getNext() {
        const randomIndex = Math.floor(Math.random() * this.range.length);
        return this.range[randomIndex];
    }
}