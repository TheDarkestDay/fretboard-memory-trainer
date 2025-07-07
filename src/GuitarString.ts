export type GuitarString = "LOW_E" | "A" | "D" | "G" | "B" | "HIGH_E";

export function getStringDisplayName(guitarString: GuitarString) {
    switch (guitarString) {
        case "LOW_E":
            return "Low E";
        case "HIGH_E":
            return "High E";
        default:
            return guitarString;
    }
}