'use client';

import { OctaveOffset, StringTuning } from '@/types/stringTuning';
import { FRETS, STRINGS, NOTES_ARRAY } from './constants';
import { calculateNoteName, calculateNoteNumber } from './helpers';

export const Ukulele = ({
  tuning,
  searchNote,
}: {
  tuning: StringTuning[];
  searchNote: number;
}) => {
  const FRET_WIDTHS_CLASS = `0.3fr repeat(${FRETS - 1}, 1fr)`;

  let audioContext: AudioContext | null = null;

  function getAudioContext() {
    if (!audioContext) {
      audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return audioContext;
  }

  function playNote(openNote: number, fret: number, octave: OctaveOffset) {
    // Total semitone shift = note + octave + fret
    const semitoneDiff = openNote + fret + octave * 12;

    // Calculate playback rate
    const playbackRate = Math.pow(2, semitoneDiff / 12);

    // Play after user gesture
    const context = getAudioContext();
    context.resume().then(() => {
      fetch('/C.mp3')
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
        .then((audioBuffer) => {
          const source = context.createBufferSource();
          source.buffer = audioBuffer;
          source.playbackRate.value = playbackRate;
          source.connect(context.destination);
          source.start();
        });
    });
  }

  return (
    <div
      className='grid'
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
                }}
                key={fretIndex}
                className={`relative flex items-center justify-center text-sm border-x py-2 hover:bg-amber-300 hover:cursor-pointer
                  ${fretIndex === 0 ? 'bg-white' : 'bg-amber-200'}
                `}
              >
                {/* Horizontal line behind text */}
                <div className='absolute w-[105%] h-[1px] bg-gray-400 z-1' />

                {/* Text */}
                <span className='relative z-10'>
                  {calculateNoteNumber(stringIndex, fretIndex, tuning) ===
                    searchNote && (
                    <div className={`bg-orange-400 px-2 rounded-2xl`}>
                      {calculateNoteName(
                        stringIndex,
                        fretIndex,
                        tuning,
                        NOTES_ARRAY
                      )}
                    </div>
                  )}
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
