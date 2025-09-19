import { ScaleIntervals, ChordIntervals } from '@/types/pattern';

export const FRETS = 13; // includes open string
export const STRINGS = 4;
export const NOTES = [
  'C',
  'C# / Db',
  'D',
  'D# / Eb',
  'E',
  'F',
  'F# / Gb',
  'G',
  'G# / Ab',
  'A',
  'A# / Bb',
  'B',
]; // C is first note, B is last note

// Array of chord types
export const CHORDS: ChordIntervals[] = [
  { name: 'Major', intervals: [0, 4, 7] },
  { name: 'Minor', intervals: [0, 3, 7] },
  { name: 'Dominant 7th', intervals: [0, 4, 7, 10] },
  { name: 'Minor 7th', intervals: [0, 3, 7, 10] },
  { name: 'Diminished', intervals: [0, 3, 6] },
  { name: 'Diminished 7th', intervals: [0, 3, 6, 9] },
  { name: 'Augmented', intervals: [0, 4, 8] },
  { name: 'Suspended 2', intervals: [0, 2, 7] },
  { name: 'Suspended 4', intervals: [0, 5, 7] },
  { name: 'Add 9', intervals: [0, 2, 4, 7] },
  { name: 'Power', intervals: [0, 7] },
];

// Array of scale modes
export const SCALES: ScaleIntervals[] = [
  { name: 'Ionian', intervals: [0, 2, 4, 5, 7, 9, 11] },
  { name: 'Dorian', intervals: [0, 2, 3, 5, 7, 9, 10] },
  { name: 'Phrygian', intervals: [0, 1, 3, 5, 7, 8, 10] },
  { name: 'Lydian', intervals: [0, 2, 4, 6, 7, 9, 11] },
  { name: 'Mixolydian', intervals: [0, 2, 4, 5, 7, 9, 10] },
  { name: 'Aeolian', intervals: [0, 2, 3, 5, 7, 8, 10] },
  { name: 'Locrian', intervals: [0, 1, 3, 5, 6, 8, 10] },
  { name: 'Major pentatonic', intervals: [0, 2, 4, 7, 9] },
  { name: 'Minor pentatonic', intervals: [0, 3, 5, 7, 10] },
  { name: 'Harmonic minor', intervals: [0, 2, 3, 5, 7, 8, 11] },
  { name: 'Melodic minor', intervals: [0, 2, 3, 5, 7, 9, 11] },
  { name: 'Blues', intervals: [0, 3, 5, 6, 7, 10] },
  { name: 'Whole tone', intervals: [0, 2, 4, 6, 8, 10] },
  { name: 'Diminished (whole-half)', intervals: [0, 2, 3, 5, 6, 8, 9, 11] },
  { name: 'Diminished (half-whole)', intervals: [0, 1, 3, 4, 6, 7, 9, 10] },
  { name: 'Chromatic', intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
];
