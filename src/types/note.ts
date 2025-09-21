import { OctaveOffset } from './stringTuning';

export type CurrentPlayedNote = {
  openNote: number;
  fret: number;
  octave: OctaveOffset;
  name: string;
} | null;
