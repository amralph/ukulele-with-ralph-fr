import { STRINGS, NOTES_ARRAY } from './constants';
import { OctaveOffset, StringTuning } from '@/types/stringTuning';

export const TuningForm = ({
  tuning,
  updateTuning,
}: {
  tuning: StringTuning[];
  updateTuning: (index: number, note: number, octave: OctaveOffset) => void;
}) => {
  return (
    <div className='p-4 border space-y-2 text-center rounded'>
      <h2 className='font-bold text-2xl'>Tuning</h2>
      {Array.from({ length: STRINGS }).map((_, i) => (
        <div key={i} className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <label>String {i + 1}</label>
            <select
              value={tuning[i].note}
              onChange={(e) =>
                updateTuning(i, parseInt(e.target.value), tuning[i].octave)
              }
              className='border px-2 py-1'
            >
              {NOTES_ARRAY.map((note, idx) => (
                <option key={idx} value={idx}>
                  {note}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <label>Octave</label>
            <select
              value={tuning[i].octave} // assuming you store it in tuning[i].octave or similar
              onChange={(e) =>
                updateTuning(
                  i,
                  tuning[i].note,
                  parseInt(e.target.value) as OctaveOffset
                )
              }
              className='border px-2 py-1'
            >
              <option value={1}>High</option>
              <option value={0}>Normal</option>
              <option value={-1}>Low</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};
