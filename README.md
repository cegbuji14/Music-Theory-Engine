# Circle of Fifths – Music Theory Engine

A TypeScript-based music theory engine modeling the circle of fifths, key relationships, diatonic scales, and harmonic structure.

## Features
- Circle-of-fifths key modeling
- Relative major/minor calculation
- Diatonic major scale generation + 7th chords
- Detect chord quality/tonality (minor/major/diminshed)
- Builds extended chords
- Modes

## Tech Stack
- Node.js
- TypeScript
- SVG
- React

## Build and Run (React)
/CircOfFifths/frontend/MusicTheoryEngine

npm install

npm run dev

## Build and Run (Node.js Backend)
/CircOfFifths/backend

- Key functions are in /src/key.ts.
- edit dist/index.js as needed

npx tsc

node index.js

## Future Plans
- Inversion handling
- More advanced theory (i.e. modulation, tritone substitutions, slash chords, etc.)
- REST API for theory queries
- Interactive frontend visualization
- Audio and MIDI integration

## Motivation
This project explores how music theory concepts can be represented algorithmically, with an emphasis on clean design and reusability.
