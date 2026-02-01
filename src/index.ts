import { Key } from "./key";

const cKey = new Key("C", 0);
console.log("Key:", cKey.name);
console.log("Accidentals:", cKey.getAccidentals());
console.log("Relative minor:", cKey.getRelativeMinor());

const gKey = new Key("G", 1);
console.log("Key:", gKey.name);
console.log("Accidentals:", gKey.getAccidentals());
console.log("Relative minor:", gKey.getRelativeMinor());

const fKey = new Key("F", -1);
console.log("Key:", fKey.name);
console.log("Accidentals:", fKey.getAccidentals());
console.log("Relative minor:", fKey.getRelativeMinor());

console.log("C major chords:", cKey.getDiatonicChords());
console.log("G major chords:", gKey.getDiatonicChords());
console.log("F major chords:", fKey.getDiatonicChords());

