import type { Chord, Scale } from '@/types/pattern';
import type { StringTuning } from '@/types/stringTuning';
import { CHORDS, SCALES } from './constants';

export const calculateNoteName = (
  stringIndex: number,
  fret: number,
  tuning: StringTuning[],
  notesArray: string[]
): string => {
  const openNoteIndex = tuning[stringIndex].note; // access note property
  const noteIndex = (openNoteIndex + fret) % notesArray.length;
  return notesArray[noteIndex];
};

export const calculateNoteNumber = (
  stringIndex: number,
  fret: number,
  tuning: StringTuning[]
): number => {
  const openNoteIndex = tuning[stringIndex].note; // get the note from the object
  return (openNoteIndex + fret) % 12; // wrap around 12 notes
};

export const noteInIntervals = (
  note: number,
  intervalSetName: Chord | Scale | '',
  root: number // root note as pitch class (0-11)
) => {
  if (!intervalSetName) return false;

  // Look for a chord first
  const chord = CHORDS.find((c) => c.name === intervalSetName);
  if (chord) {
    return chord.intervals.some(
      (interval) => (interval + root) % 12 === note % 12
    );
  }

  // Otherwise, look for a scale
  const scale = SCALES.find((s) => s.name === intervalSetName);
  if (scale) {
    return scale.intervals.some(
      (interval) => (interval + root) % 12 === note % 12
    );
  }

  // Not found
  return false;
};
