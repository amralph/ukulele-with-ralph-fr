'use client';

import React, { useState } from 'react';
import { Ukulele } from './Ukulele';
import { TuningForm } from './TuningForm';
import { NoteSearchForm } from './NoteSearchForm';
import { OctaveOffset } from '@/types/stringTuning';
import { Chord, Scale } from '@/types/pattern';
import { NoteDisplay } from './NoteDisplay';

export default function NoteFinder() {
  const [tuning, setTuning] = useState([
    { note: 9, octave: 0 as OctaveOffset },
    { note: 4, octave: 0 as OctaveOffset },
    { note: 0, octave: 0 as OctaveOffset },
    { note: 7, octave: 0 as OctaveOffset },
  ]); // first index is first string

  const updateTuning = (
    stringIndex: number,
    note: number,
    octave: OctaveOffset
  ) => {
    setTuning((prevTuning) =>
      prevTuning.map((stringTuning, i) => {
        if (i !== stringIndex) return stringTuning;
        return { note, octave };
      })
    );
  };

  const [searchNote, setSearchNote] = useState(0);
  const [searchChord, setSearchChord] = useState<Chord | ''>('');
  const [searchScale, setSearchScale] = useState<Scale | ''>('');

  const [displayedNote, setDisplayedNote] = useState<string | null>('');

  return (
    <div className='space-y-4'>
      <header className='text-center'>
        <h1 className='text-4xl font-extrabold mb-2'>Note finder</h1>
        <p>
          Use this tool to find any note, chord, or scale on the ukulele
          fretboard with any tuning.
        </p>
      </header>

      <div className='flex flex-wrap gap-2'>
        <TuningForm tuning={tuning} updateTuning={updateTuning} />
        <NoteSearchForm
          setSearchNote={setSearchNote}
          setSearchChord={setSearchChord}
          setSearchScale={setSearchScale}
        />
        <NoteDisplay displayedNote={displayedNote} />
      </div>
      <div className='overflow-x-auto'>
        <Ukulele
          tuning={tuning}
          searchNote={searchNote}
          searchChord={searchChord}
          searchScale={searchScale}
          setDisplayedNote={setDisplayedNote}
        ></Ukulele>
      </div>
    </div>
  );
}
