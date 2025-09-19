export type IntervalSet = {
  name: string;
  intervals: number[];
};

export type Chord =
  // 3-note chords (triads)
  | 'Major'
  | 'Minor'
  | 'Diminished'
  | 'Augmented'
  | 'Suspended 2'
  | 'Suspended 4'
  // 4-note chords (sevenths)
  | 'Dominant 7th'
  | 'Major 7th'
  | 'Add 9'
  | 'Minor Add 9'
  | 'Minor 7th'
  | 'Minor Major 7th'
  | 'Diminished 7th';

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
