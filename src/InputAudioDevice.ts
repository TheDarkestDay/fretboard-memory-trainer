import { Note } from "./Note";
import { autoCorrelate } from "./pitch-detector";

const FFT_SIZE = 2048;

export class InputAudioDevice {
    private buffer = new Float32Array(FFT_SIZE);

    private noteListener: ((note: Note) => void) | null = null;

    constructor() {

    }

    async startListening() {
        const audioContext = new AudioContext();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = FFT_SIZE;

        source.connect(analyser);
        await audioContext.resume();

        this.detectPitch(audioContext, analyser);
    }

    detectPitch(audioContext: AudioContext, analyser: AnalyserNode) {
        analyser.getFloatTimeDomainData(this.buffer);
        
        const frequency = autoCorrelate(this.buffer, audioContext.sampleRate);
        if (frequency !== -1 && this.noteListener) {
            console.log("Detecting note: ", Note.fromFrequency(frequency).getName());
            this.noteListener(Note.fromFrequency(frequency));
        }

        requestAnimationFrame(() => this.detectPitch(audioContext, analyser));
    }

    async waitUntilNoteIsPlayed(expectedNote: Note) {
        return new Promise<void>((resolve) => {
            this.noteListener = (detectedNote: Note) => {
                if (expectedNote.equals(detectedNote)) {
                    resolve();
                }
            };
        });
    }
}