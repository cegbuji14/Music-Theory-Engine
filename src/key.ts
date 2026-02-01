const NOTE_SEMITONES: { [note: string]: number } = {
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
  };//How many half-steps each note is from C
  
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
  ];//For notes like Db and C# that sound the same but have differernt names

  const MAJOR_KEY_CHORD_QUALITIES = [
    "maj",
    "min",
    "min",
    "maj",
    "maj",
    "min",
    "dim",
  ];//Diatonic Chords

  const MAJOR_KEY_7TH_QUALITIES = [
    "maj7",
    "min7",
    "min7",
    "maj7",
    "7",
    "min7",
    "ø7",
  ];//Diatonic 7th extensions
  

  const CHORD_PATTERNS: Record<string, number[]> = {
    "maj": [0, 4, 7],
    "min": [0, 3, 7],
    "dim": [0, 3, 6],
    "aug": [0, 4, 8],
  
    "maj7": [0, 4, 7, 11],
    "7": [0, 4, 7, 10],
    "min7": [0, 3, 7, 10],
    "ø7": [0, 3, 6, 10],
  };//Half steps from root note
  

  export class Key {
    name: string;
    position: number; // Position on circle of fifths relative to C (C=0)
  
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
  
      const minorSemitone = (rootSemitone + 9) % 12; // 3 semitones down mod 12
      return SEMITONE_NOTES_SHARP[minorSemitone];
    }
  
    getDiatonicScale(): string[] | null {
      const rootSemitone = NOTE_SEMITONES[this.name];
      if (rootSemitone === undefined) return null;
  
      const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11];
      return majorScaleIntervals.map(interval => {
        const noteSemitone = (rootSemitone + interval) % 12;
        return SEMITONE_NOTES_SHARP[noteSemitone];
      });
    }

    getDiatonicChords(): string[] | null {
      const scale = this.getDiatonicScale();
      if (!scale) return null;
    
      const chordQualities = ["maj", "min", "min", "maj", "maj", "min", "dim"];
    
      return scale.map((note, index) => {
        const quality = chordQualities[index];
        return `${note}${quality}`;
      });
    }

    getDiatonicSeventhChords(): string[] | null {
      const scale = this.getDiatonicScale();
      if (!scale) return null;
    
      return scale.map((note, index) => {
        return `${note}${MAJOR_KEY_7TH_QUALITIES[index]}`;
      });
    }    

    getChordFromDegree(degree: number, chordSize: 3 | 4 | 5 | 6 | 7 = 3): string[] | null {
      const scale = this.getDiatonicScale();
      if (!scale) return null;
    
      return Array.from({ length: chordSize }, (_, i) => {
        const scaleIndex = (degree + i * 2) % scale.length;
        return scale[scaleIndex];
      });//gives extensions for chords (Chord Size) Triads, 7, 9, 11, and 13 chords
    }//[3 (triad), 4 (7th), 5 (9th), 6 (11th), 7 (13th)
    
  }

  export function detectChordQuality(notes: string[]): string | null {
    if (notes.length < 3) return null;
  
    const root = notes[0];
    const rootSemitone = NOTE_SEMITONES[root];
    if (rootSemitone === undefined) return null;
  
    const intervals = notes
      .map(note => {
        const semitone = NOTE_SEMITONES[note];
        return (semitone - rootSemitone + 12) % 12;
      })
      .sort((a, b) => a - b);
  
    for (const [quality, pattern] of Object.entries(CHORD_PATTERNS)) {
      if (
        pattern.length === intervals.length &&
        pattern.every((val, i) => val === intervals[i])
      ) {
        return quality;
      }
    }
  
    return null;
  }
  
  