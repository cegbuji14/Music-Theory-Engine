import { Key } from "./key";
import { nameDetectedChord } from "./key";
import { detectGeneratedChord } from "./key";

/*
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

console.log("Cmaj 7th chords:", cKey.getDiatonicSeventhChords());
console.log("C major triad: ", cKey.getChordFromDegree(0, 3)); // C major
console.log("Cmaj7: ", cKey.getChordFromDegree(0, 4)); // Cmaj7
console.log("G9: ", cKey.getChordFromDegree(4, 5)); // G9
console.log("G13: ", cKey.getChordFromDegree(4, 7)); // G13
*/

const cKey = new Key("C", 0);
const cMajor = cKey.getChordFromDegree(0, 3)!;
console.log("Chord notes:", cMajor);

const g7 = cKey.getChordFromDegree(4, 4)!;
console.log("Chord notes:", g7);

const g9 = cKey.getChordFromDegree(4, 5)!;
console.log("Chord notes:", g9);

//console.log(nameChord(cMajor)); // Cmaj

console.log(detectGeneratedChord(cKey, 3, 4)); // Fmaj7
console.log(detectGeneratedChord(cKey, 4, 4)); // G7
console.log(detectGeneratedChord(cKey, 4, 5)); // G9
console.log(detectGeneratedChord(cKey, 4, 6)); // G11
//console.log(detectGeneratedChord(cKey, 4, 7)); // G13

const chord = detectGeneratedChord(cKey, 4, 7);
if (chord) {
  console.log(nameDetectedChord(chord)); // G13
}




