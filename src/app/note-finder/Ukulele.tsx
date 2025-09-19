'use client';

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

import { OctaveOffset, StringTuning } from '@/types/stringTuning';
import { FRETS, STRINGS, NOTES } from './constants';
import {
  calculateNoteName,
  calculateNoteNumber,
  noteInIntervals,
} from './helpers';
import { Chord, Scale } from '@/types/pattern';
import { useCallback, useEffect } from 'react';

let audioContext: AudioContext | null = null;
let activeSource: AudioBufferSourceNode | null = null;
let preloadedBuffer: AudioBuffer | null = null;

export const Ukulele = ({
  tuning,
  searchNote,
  searchChord,
  searchScale,
  setDisplayedNote,
}: {
  tuning: StringTuning[];
  searchNote: number;
  searchChord: Chord | '';
  searchScale: Scale | '';
  setDisplayedNote: (note: string) => void;
}) => {
  const FRET_WIDTHS_CLASS = `0.5fr repeat(${FRETS - 1}, 1fr)`;

  function getAudioContext(): AudioContext {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    return audioContext;
  }

  const preloadAudio = useCallback(async (url: string) => {
    const context = getAudioContext();
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    preloadedBuffer = await context.decodeAudioData(arrayBuffer);
  }, []); // no deps → stable reference

  function playNote(openNote: number, fret: number, octave: OctaveOffset) {
    const semitoneDiff = openNote + fret + octave * 12;
    const playbackRate = Math.pow(2, semitoneDiff / 12);

    const context = getAudioContext();
    context.resume().then(() => {
      if (!preloadedBuffer) {
        console.warn('Audio buffer not loaded yet!');
        return;
      }

      if (activeSource) {
        activeSource.stop();
      }

      const source = context.createBufferSource();
      source.buffer = preloadedBuffer;
      source.playbackRate.value = playbackRate;
      source.connect(context.destination);
      source.start();

      // Track the active source
      activeSource = source;

      source.onended = () => {
        if (activeSource === source) {
          activeSource = null;
        }
      };
    });
  }

  useEffect(() => {
    preloadAudio('/C.mp3');
  }, [preloadAudio]);

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
            {Array.from({ length: FRETS }).map((_, fretIndex) => (
              <button
                onClick={() => {
                  playNote(
                    tuning[stringIndex].note,
                    fretIndex,
                    tuning[stringIndex].octave
                  );
                  setDisplayedNote(
                    calculateNoteName(stringIndex, fretIndex, tuning, NOTES)
                  );
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
                  {(() => {
                    const noteNumber = calculateNoteNumber(
                      stringIndex,
                      fretIndex,
                      tuning
                    );

                    // Determine if this note should be highlighted
                    const highlight =
                      noteNumber === searchNote || // root note
                      noteInIntervals(noteNumber, searchChord, searchNote) ||
                      noteInIntervals(noteNumber, searchScale, searchNote);

                    if (!highlight) return null;

                    const root = searchNote;

                    const intervalFromRoot = (noteNumber - root + 12) % 12;

                    const isRoot = intervalFromRoot === 0;
                    const isThird =
                      intervalFromRoot === 3 || intervalFromRoot === 4; // minor or major third
                    const isFifth = intervalFromRoot === 7;

                    // Determine color
                    let bgColor = 'bg-orange-400'; // default chord tone
                    if (isRoot) bgColor = 'bg-red-400';
                    else if (isThird) bgColor = 'bg-blue-400';
                    else if (isFifth) bgColor = 'bg-green-400';

                    return (
                      <div className={`${bgColor} px-2 rounded-2xl`}>
                        {calculateNoteName(
                          stringIndex,
                          fretIndex,
                          tuning,
                          NOTES
                        )}
                      </div>
                    );
                  })()}
                </span>
              </button>
            ))}
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
