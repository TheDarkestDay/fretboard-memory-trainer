export class Note {
    private readonly name: string;
    private readonly frequency: number;
    
    constructor(name: string, frequency: number) {
        this.name = name;
        this.frequency = frequency;
    }

    getName() {
        return this.name;
    }

    getFrequency() {
        return this.frequency;
    }

    equals(otherNote: Note) {
        return this.getMidiNoteNumber() === otherNote.getMidiNoteNumber()
            && this.getOctave() === otherNote.getOctave();
    }

    getMidiNoteNumber() {
        return Math.round(12 * Math.log2(this.frequency / Note.A4.getFrequency())) + 69;
    }

    getOctave() {
        return Math.floor(this.getMidiNoteNumber() / 12) - 1;
    }

    isSharp() {
        return this.name.includes("#");
    }

    static fromFrequency(frequency: number) {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const midiNoteNumber = Math.round(12 * Math.log2(frequency / Note.A4.getFrequency())) + 69;
        const noteIndex = midiNoteNumber % 12;
        const octave = Math.floor(midiNoteNumber / 12) - 1;

        return new Note(`${noteNames[noteIndex]}${octave}`, frequency);
    }

    static E4 = new Note("E4", 329);
    static F4 = new Note("F4", 349);
    static F_SHARP_4 = new Note("F#4", 370);
    static G_FLAT_4 = new Note("Gb4", 370);
    static G4 = new Note("G4", 392);
    static G_SHARP_4 = new Note("G#4", 415);
    static A_FLAT_4 = new Note("Ab4", 415);
    static A4 = new Note("A4", 440);
    static A_SHARP_4 = new Note("A#4", 466);
    static B_FLAT_4 = new Note("Bb4", 466);
    static B4 = new Note("B4", 494);
    static C5 = new Note("C5", 523);
    static C_SHARP_5 = new Note("C#5", 554);
    static D_FLAT_5 = new Note("Db5", 554);
    static D5 = new Note("D5", 587);
    static D_SHARP_5 = new Note("D#5", 622);
    static E_FLAT_5 = new Note("Eb5", 622);
    static E5 = new Note("E5", 659);
}