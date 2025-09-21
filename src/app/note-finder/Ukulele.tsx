'use client';

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

import { StringTuning } from '@/types/stringTuning';
import { FRETS, STRINGS, NOTES } from './constants';
import {
  calculateNoteName,
  calculateNoteNumber,
  noteInIntervals,
} from './helpers';
import { Chord, Scale } from '@/types/pattern';
import React from 'react';
import { CurrentPlayedNote } from '@/types/note';

const UkuleleComponent = ({
  tuning,
  searchNote,
  searchChord,
  searchScale,
  setCurrentPlayedNote,
}: {
  tuning: StringTuning[];
  searchNote: number;
  searchChord: Chord | '';
  searchScale: Scale | '';
  setCurrentPlayedNote: (currentPlayedNote: CurrentPlayedNote) => void;
}) => {
  const FRET_WIDTHS_CLASS = `0.5fr repeat(${FRETS - 1}, 1fr)`;

  return (
    <div
      className='grid w-[1000px] lg:w-full'
      style={{
        gridTemplateColumns: '1fr 30fr',
        gridTemplateRows: `4fr 1fr`,
      }}
    >
      <div
        className='grid'
        style={{
          gridRow: `span 2`,
          gridTemplateRows: '4fr 1fr',
        }}
      >
        {/* First row: amber */}
        <div className='bg-amber-800 w-full h-full'></div>
      </div>

      {/* Right div: fretboard */}
      <div className='flex flex-col'>
        {/* Strings */}
        {Array.from({ length: STRINGS }).map((_, stringIndex) => (
          <div
            key={stringIndex}
            className='grid'
            style={{
              gridTemplateColumns: FRET_WIDTHS_CLASS,
            }}
          >
            {Array.from({ length: FRETS }).map((_, fretIndex) => {
              const noteNumber = calculateNoteNumber(
                stringIndex,
                fretIndex,
                tuning
              );
              const noteName = calculateNoteName(
                stringIndex,
                fretIndex,
                tuning,
                NOTES
              );

              // Determine if this note should be highlighted
              const highlight =
                noteNumber === searchNote || // root note
                noteInIntervals(noteNumber, searchChord, searchNote) ||
                noteInIntervals(noteNumber, searchScale, searchNote);

              // Determine interval from root
              const intervalFromRoot = (noteNumber - searchNote + 12) % 12;
              const isRoot = intervalFromRoot === 0;
              const isThird = intervalFromRoot === 3 || intervalFromRoot === 4;
              const isFifth = intervalFromRoot === 7;

              // Determine color
              let bgColor = 'bg-orange-400'; // default chord tone
              if (isRoot) bgColor = 'bg-red-400';
              else if (isThird) bgColor = 'bg-blue-400';
              else if (isFifth) bgColor = 'bg-green-400';

              return (
                <button
                  onClick={() => {
                    setCurrentPlayedNote({
                      openNote: tuning[stringIndex].note,
                      fret: fretIndex,
                      octave: tuning[stringIndex].octave,
                      name: noteName, // assuming `tuning` has this
                    });
                  }}
                  key={fretIndex}
                  className={`relative flex items-center justify-center text-sm border-x py-2 hover:bg-amber-300 active:bg-amber-400 hover:cursor-pointer
        ${fretIndex === 0 ? 'bg-white' : 'bg-amber-200'}
      `}
                >
                  {/* Horizontal line behind text */}
                  <div className='absolute w-[100%] h-[1px] bg-gray-400 z-1' />

                  {/* Text */}
                  <span className='relative z-10'>
                    {highlight && (
                      <div className={`${bgColor} px-2 rounded-2xl`}>
                        {noteName}
                      </div>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {/* Fret numbers row */}
      <div className='grid' style={{ gridTemplateColumns: FRET_WIDTHS_CLASS }}>
        {Array.from({ length: FRETS }).map((_, fretIndex) => (
          <div
            key={fretIndex}
            className='flex items-center justify-center text-xs font-bold'
          >
            {fretIndex}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Ukulele = React.memo(UkuleleComponent);
