import React from 'react';
import { NoteFinder } from './NoteFinder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Ukulele note finder`,
  description:
    'Use this tool to find any note, chord, or scale on the ukulele fretboard with any custom tuning.',
};

const page = () => {
  return <NoteFinder />;
};

export default page;
