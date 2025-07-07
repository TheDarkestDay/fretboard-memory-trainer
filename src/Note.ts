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

    static B3 = new Note("B3", 247);
    static C4 = new Note("C4", 262);
    static C_SHARP_4 = new Note("C#4", 277);
    static D_FLAT_4 = new Note("Db4", 277);
    static D4 = new Note("D4", 294);
    static D_SHARP_4 = new Note("D#4", 311);
    static E_FLAT_4 = new Note("Eb4", 311);

    static G3 = new Note("G3", 196);
    static G_SHARP_3 = new Note("G#3", 208);
    static A_FLAT_3 = new Note("Ab3", 208);
    static A3 = new Note("A3", 220);
    static A_SHARP_3 = new Note("A#3", 233);
    static B_FLAT_3 = new Note("Bb3", 233);

    static D3 = new Note("D3", 147);
    static D_SHARP_3 = new Note("D#3", 156);
    static E_FLAT_3 = new Note("Eb3", 156);
    static E3 = new Note("E3", 165);
    static F3 = new Note("F3", 175);
    static F_SHARP_3 = new Note("F#3", 185);
    static G_FLAT_3 = new Note("Gb3", 185);

    static A2 = new Note("A2", 110);
    static A_SHARP_2 = new Note("A#2", 117);
    static B_FLAT_2 = new Note("Bb2", 117);
    static B2 = new Note("B2", 123);
    static C2 = new Note("C2", 131);
    static C_SHARP_2 = new Note("C#2", 139);
    static D_FLAT_2 = new Note("Db2", 139);

    static E2 = new Note("E2", 82);
    static F2 = new Note("F2", 87);
    static F_SHARP_2 = new Note("F#2", 92);
    static G_FLAT_2 = new Note("Gb2", 92);
    static G2 = new Note("G2", 98);
    static G_SHARP_2 = new Note("G#2", 104);
    static A_FLAT_2 = new Note("Ab2", 104);
}