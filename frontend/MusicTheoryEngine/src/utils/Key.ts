export const MODES = [
    "Ionian",   // 0
    "Dorian",   // 1
    "Phrygian", // 2
    "Lydian",   // 3
    "Mixolydian", // 4
    "Aeolian",  // 5
    "Locrian",  // 6
  ];
  
  const NOTE_SEMITONES: Record<string, number> = {
    C: 0,
    "C#": 1,
    Db: 1,
    D: 2,
    "D#": 3,
    Eb: 3,
    E: 4,
    F: 5,
    "F#": 6,
    Gb: 6,
    G: 7,
    "G#": 8,
    Ab: 8,
    A: 9,
    "A#": 10,
    Bb: 10,
    B: 11,
  };
  
  const SEMITONE_NOTES_SHARP = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  
  export class Key {
    name: string;
    position: number;
  
    constructor(name: string, position: number) {
      this.name = name;
      this.position = position;
    }
  
    getAccidentals(): number {
      return this.position;
    }
  
    getRelativeMinor(): string | null {
      const rootSemitone = NOTE_SEMITONES[this.name];
      if (rootSemitone === undefined) return null;
      const minorSemitone = (rootSemitone + 9) % 12;
      return SEMITONE_NOTES_SHARP[minorSemitone];
    }
  
    getDiatonicScale(): string[] | null {
      const rootSemitone = NOTE_SEMITONES[this.name];
      if (rootSemitone === undefined) return null;
  
      const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
      return majorScaleIntervals.map((interval) => {
        const noteSemitone = (rootSemitone + interval) % 12;
        return SEMITONE_NOTES_SHARP[noteSemitone];
      });
    }
  
    getMode(modeIndex: number): string[] | null {
      const scale = this.getDiatonicScale();
      if (!scale) return null;
      if (modeIndex < 0 || modeIndex > 6) return null;
  
      return scale.slice(modeIndex).concat(scale.slice(0, modeIndex));
    }
  }
  