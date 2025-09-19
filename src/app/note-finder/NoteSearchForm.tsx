import { Chord, Scale } from '@/types/pattern';
import { NOTES, CHORDS, SCALES } from './constants';

export const NoteSearchForm = ({
  setSearchNote,
  setSearchChord,
  setSearchScale,
}: {
  setSearchNote: (value: number) => void;
  setSearchChord: (value: Chord) => void;
  setSearchScale: (value: Scale) => void;
}) => {
  return (
    <div className='p-4 border space-y-2 text-center rounded'>
      <h2 className='font-bold text-2xl'>Search</h2>
      <div className='items-center space-y-2 gap-2'>
        <div className='flex space-x-2'>
          <label>Note</label>
          <select
            onChange={(e) => setSearchNote(parseInt(e.target.value))}
            className='border px-2 py-1'
          >
            {NOTES.map((note, index) => (
              <option key={index} value={index}>
                {note}
              </option>
            ))}
          </select>
        </div>
        <div className='flex space-x-2'>
          <label>Chord</label>
          <select
            onChange={(e) => setSearchChord(e.target.value as Chord)}
            className='border px-2 py-1'
          >
            <option value=''>None</option>
            {CHORDS.map((chord, index) => (
              <option key={index} value={chord.name}>
                {chord.name}
              </option>
            ))}
          </select>
        </div>
        <div className='flex space-x-2'>
          <label>Scale</label>
          <select
            onChange={(e) => setSearchScale(e.target.value as Scale)}
            className='border px-2 py-1'
          >
            <option value=''>None</option>
            {SCALES.map((scale, index) => (
              <option key={index} value={scale.name}>
                {scale.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
