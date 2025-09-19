'use client';

import React, { useState } from 'react';
import { Ukulele } from './Ukulele';
import { TuningForm } from './TuningForm';
import { NoteSearchForm } from './NoteSearchForm';
import { OctaveOffset } from '@/types/stringTuning';

export default function page() {
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

  return (
    <div className='space-y-4'>
      <header className='mb-8 text-center'>
        <h1 className='text-4xl font-extrabold mb-2'>Note finder</h1>
        <p>
          Use this tool to find any note on the ukulele fretboard, with any
          tuning.
        </p>
      </header>

      <div className='flex space-x-2'>
        <TuningForm tuning={tuning} updateTuning={updateTuning}></TuningForm>
        <NoteSearchForm setSearchNote={setSearchNote}></NoteSearchForm>
      </div>

      <Ukulele tuning={tuning} searchNote={searchNote}></Ukulele>
    </div>
  );
}
