import { StringTuning } from '@/types/stringTuning';

export const calculateNoteName = (
  stringIndex: number,
  fret: number,
  tuning: StringTuning[],
  notesArray: string[][]
): string[] => {
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
