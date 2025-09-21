import React from 'react';

export const NoteDisplay = ({
  currentPlayedNote,
}: {
  currentPlayedNote: {
    name: string;
  } | null;
}) => {
  return (
    <div className='flex items-center justify-center w-40 h-40 border rounded'>
      <h3 className='font-bold text-4xl'>{currentPlayedNote?.name}</h3>
    </div>
  );
};
