import React from 'react';

export const NoteDisplay = ({
  displayedNote,
}: {
  displayedNote: string | null;
}) => {
  return (
    <div className='flex items-center justify-center w-40 h-40 border rounded'>
      <h3 className='font-bold text-4xl'>{displayedNote}</h3>
    </div>
  );
};
