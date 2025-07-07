import { getStringDisplayName, type GuitarString } from "./GuitarString";
import { Note } from "./Note";

export class Fretboard {
    private readonly notes: Record<GuitarString, Note[]> = {
        "HIGH_E": [
            Note.E4,
            Note.F4,
            Note.F_SHARP_4,
            Note.G_FLAT_4,
            Note.G4,
            Note.G_SHARP_4,
            Note.A_FLAT_4,
            Note.A4,
            Note.A_SHARP_4,
            Note.B_FLAT_4,
            Note.B4,
            Note.C5,
            Note.C_SHARP_5,
            Note.D_FLAT_5,
            Note.D5,
            Note.D_SHARP_5,
            Note.E_FLAT_5,
            Note.E5
        ],
        "B": [
            Note.B3,
            Note.C4,
            Note.C_SHARP_4,
            Note.D_FLAT_4,
            Note.D4,
            Note.D_SHARP_4,
            Note.E_FLAT_4,
            Note.E4,
            Note.F4,
            Note.F_SHARP_4,
            Note.G_FLAT_4,
            Note.G4,
            Note.G_SHARP_4,
            Note.A_FLAT_4,
            Note.A4,
            Note.A_SHARP_4,
            Note.B_FLAT_4,
            Note.B4,
        ],
        "G": [
            Note.G3,
            Note.G_SHARP_3,
            Note.A_FLAT_3,
            Note.A3,
            Note.A_SHARP_3,
            Note.B_FLAT_3,
            Note.B3,
            Note.C4,
            Note.C_SHARP_4,
            Note.D_FLAT_4,
            Note.D4,
            Note.D_SHARP_4,
            Note.E_FLAT_4,
            Note.E4,
            Note.F4,
            Note.F_SHARP_4,
            Note.G_FLAT_4,
            Note.G4,
        ],
        "D": [
            Note.D3,
            Note.D_SHARP_3,
            Note.E_FLAT_3,
            Note.E3,
            Note.F3,
            Note.F_SHARP_3,
            Note.G_FLAT_3,
            Note.G3,
            Note.G_SHARP_3,
            Note.A_FLAT_3,
            Note.A3,
            Note.A_SHARP_3,
            Note.B_FLAT_3,
            Note.B3,
            Note.C4,
            Note.C_SHARP_4,
            Note.D_FLAT_4,
            Note.D4,
        ],
        "A": [
            Note.A2,
            Note.A_SHARP_2,
            Note.B_FLAT_2,
            Note.B2,
            Note.C2,
            Note.C_SHARP_2,
            Note.D_FLAT_2,
            Note.D3,
            Note.D_SHARP_3,
            Note.E_FLAT_3,
            Note.E3,
            Note.F3,
            Note.F_SHARP_3,
            Note.G_FLAT_3,
            Note.G3,
            Note.G_SHARP_3,
            Note.A_FLAT_3,
            Note.A3,
        ],
        "LOW_E": [
            Note.E2,
            Note.F2,
            Note.F_SHARP_2,
            Note.G_FLAT_2,
            Note.G2,
            Note.G_SHARP_2,
            Note.A_FLAT_2,
            Note.A2,
            Note.A_SHARP_2,
            Note.B_FLAT_2,
            Note.B2,
            Note.C2,
            Note.C_SHARP_2,
            Note.D_FLAT_2,
            Note.D3,
            Note.D_SHARP_3,
            Note.E_FLAT_3,
            Note.E3,
        ]
    };

    getAllNotesOnString(guitarString: GuitarString) {
        return this.notes[guitarString];
    }

    getNoteLocationOnString(guitarString: GuitarString, note: Note | null) {
        if (note === null) {
            return {
                stringName: getStringDisplayName(guitarString),
                fretNumber: 0
            };
        }

        return {
            stringName: getStringDisplayName(guitarString),
            fretNumber: this.getNoteFretNumberOnString(guitarString, note)
        };
    }

    getNoteFretNumberOnString(guitarString: GuitarString, note: Note) {
        const stringNotes = this.notes[guitarString];

        let index = 0;
        let fretNumber = index;
        let currentNote = stringNotes[index];
        while (!currentNote.equals(note)) {
            if (!currentNote.isSharp()) {
                fretNumber += 1;
            }

            index += 1;
            currentNote = stringNotes[index];
        }
        
        return fretNumber;
    }
}