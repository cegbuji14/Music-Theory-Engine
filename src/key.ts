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
    "maj": [0, 4, 7],//triads
    "min": [0, 3, 7],
    "dim": [0, 3, 6],
    "aug": [0, 4, 8],
  
    "maj7": [0, 4, 7, 11],//7th chords
    "7": [0, 4, 7, 10],
    "min7": [0, 3, 7, 10],
    "ø7": [0, 3, 6, 10],

    "9":    [0, 4, 7, 10, 14],//higher extensiosn
    "11":   [0, 4, 7, 10, 14, 17],
    "13":   [0, 4, 7, 10, 14, 17, 21],
  };//Half steps from root note
  
  export const MODES = [
    "Ionian",//0
    "Dorian",//1
    "Phrygian",//2
    "Lydian",//3
    "Mixolydian",//4
    "Aeolian",//5
    "Locrian",//6
  ] as const;//Modes of the major scale
  

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

    getMode(modeIndex: number): string[] | null {
      const scale = this.getDiatonicScale();
      if (!scale) return null;
    
      if (modeIndex < 0 || modeIndex > 6) return null;
    
      return scale
        .slice(modeIndex)
        .concat(scale.slice(0, modeIndex));
    }
    
    
  }
  
  type DetectedChord = {
    root: string;
    quality: string;
  };
  export function nameDetectedChord(chord: DetectedChord): string {
    return `${chord.root}${chord.quality}`;
  }
  
  
  export function getChordIntervalsFromDegree(key: Key, degree: number, chordSize: number
  ): number[] | null {
    const scale = key.getDiatonicScale();
    if (!scale) return null;
  
    const rootNote = scale[degree];
    const rootSemitone = NOTE_SEMITONES[rootNote];
  
    let octave = 0;
  
    return Array.from({ length: chordSize }, (_, i) => {
      const scaleStep = degree + i * 2;
      if (scaleStep >= scale.length) octave = Math.floor(scaleStep / scale.length);
  
      const note = scale[scaleStep % scale.length];
      const semitone = NOTE_SEMITONES[note];
  
      return semitone - rootSemitone + octave * 12;
    });//tracks octaves so extensions can be named
  }

  function detectChordFromIntervals(intervals: number[]): string | null {
    const sorted = [...intervals].sort((a, b) => a - b);
  
    for (const [quality, pattern] of Object.entries(CHORD_PATTERNS)) {
      if (
        pattern.length === sorted.length &&
        pattern.every((v, i) => v === sorted[i])
      ) {
        return quality;
      }
    }
    return null;
  }
  
  export function detectGeneratedChord(
    key: Key,
    degree: number,
    chordSize: number
  ): DetectedChord | null {
    const intervals = getChordIntervalsFromDegree(key, degree, chordSize);
    if (!intervals) return null;
  
    const quality = detectChordFromIntervals(intervals);
    if (!quality) return null;
  
    const root = key.getDiatonicScale()![degree];
    return { root, quality };
  }

  export function notesToIntervals(notes: string[]): number[] | null {
    if (notes.length === 0) return null;
  
    const root = notes[0];
    const rootSemitone = NOTE_SEMITONES[root];
    if (rootSemitone === undefined) return null;
  
    const intervals = notes.map(note => {
      const semitone = NOTE_SEMITONES[note];
      if (semitone === undefined) return null;
      return (semitone - rootSemitone + 12) % 12;
    });
  
    if (intervals.includes(null)) return null;
  
    return intervals as number[];
  }//eventually want the ability to form chords from raw notes
  
  
  