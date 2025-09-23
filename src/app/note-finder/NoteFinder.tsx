'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Ukulele } from './Ukulele';
import { TuningForm } from './TuningForm';
import { NoteSearchForm } from './NoteSearchForm';
import type { OctaveOffset } from '@/types/stringTuning';
import type { Chord, Scale } from '@/types/pattern';
import { NoteDisplay } from './NoteDisplay';
import type { CurrentPlayedNote } from '@/types/note';

export const NoteFinder = () => {
  const [tuning, setTuning] = useState([
    { note: 9, octave: 0 as OctaveOffset },
    { note: 4, octave: 0 as OctaveOffset },
    { note: 0, octave: 0 as OctaveOffset },
    { note: 7, octave: 0 as OctaveOffset },
  ]); // first index is first string

  const updateTuning = useCallback(
    (stringIndex: number, note: number, octave: OctaveOffset) => {
      setTuning((prevTuning) =>
        prevTuning.map((stringTuning, i) =>
          i === stringIndex ? { note, octave } : stringTuning
        )
      );
    },
    [] // depends on nothing
  );

  const [searchNote, setSearchNote] = useState(0);
  const [searchChord, setSearchChord] = useState<Chord | ''>('');
  const [searchScale, setSearchScale] = useState<Scale | ''>('');

  const [currentPlayedNote, setCurrentPlayedNote] = useState<{
    openNote: number;
    fret: number;
    octave: OctaveOffset;
    name: string;
  } | null>(null);

  const bufferRef = useRef<AudioBuffer>(null);
  const audioContextRef = useRef<AudioContext>(null);

  function playNote(playedNote: CurrentPlayedNote) {
    if (!playedNote) return;
    const semitoneDiff =
      playedNote.openNote + playedNote.fret + playedNote.octave * 12;
    const playbackRate = Math.pow(2, semitoneDiff / 12);

    if (audioContextRef.current) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = bufferRef.current;
      source.playbackRate.value = playbackRate;
      source.connect(audioContextRef.current.destination);
      source.start();
    }
  }

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    audioContextRef.current = audioCtx;

    async function loadAudio() {
      const response = await fetch('/C.mp3');
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer =
        await audioContextRef.current!.decodeAudioData(arrayBuffer);
      bufferRef.current = audioBuffer;
    }

    loadAudio();
  }, []);

  useEffect(() => {
    playNote(currentPlayedNote);
  }, [currentPlayedNote]);

  return (
    <div className='space-y-4'>
      <header className='text-center'>
        <h1 className='text-4xl font-extrabold mb-2'>Note finder</h1>
        <p>
          Use this tool to find any note, chord, or scale on the ukulele
          fretboard with any custom tuning.
        </p>
      </header>

      <div className='flex flex-wrap gap-2'>
        <TuningForm tuning={tuning} updateTuning={updateTuning} />
        <NoteSearchForm
          setSearchNote={setSearchNote}
          setSearchChord={setSearchChord}
          setSearchScale={setSearchScale}
        />
        <NoteDisplay currentPlayedNote={currentPlayedNote} />
      </div>
      <div className='overflow-x-auto'>
        <Ukulele
          tuning={tuning}
          searchNote={searchNote}
          searchChord={searchChord}
          searchScale={searchScale}
          setCurrentPlayedNote={setCurrentPlayedNote}
        ></Ukulele>
      </div>
    </div>
  );
};
