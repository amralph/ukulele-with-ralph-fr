export type IntervalSet = {
  name: string;
  intervals: number[];
};

export type Chord =
  | 'Major'
  | 'Minor'
  | 'Dominant 7th'
  | 'Minor 7th'
  | 'Diminished'
  | 'Diminished 7th'
  | 'Augmented'
  | 'Suspended 2'
  | 'Suspended 4'
  | 'Add 9'
  | 'Power';

export type Scale =
  | 'Ionian'
  | 'Dorian'
  | 'Phrygian'
  | 'Lydian'
  | 'Mixolydian'
  | 'Aeolian'
  | 'Locrian'
  | 'Major pentatonic'
  | 'Minor pentatonic'
  | 'Harmonic minor'
  | 'Melodic minor'
  | 'Blues'
  | 'Whole tone'
  | 'Diminished (whole-half)'
  | 'Diminished (half-whole)'
  | 'Chromatic';

export type ChordIntervals = IntervalSet & { name: Chord };
export type ScaleIntervals = IntervalSet & { name: Scale };
