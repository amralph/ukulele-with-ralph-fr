import { NOTES_ARRAY } from './constants';

export const NoteSearchForm = ({
  setSearchNote,
}: {
  setSearchNote: (value: number) => void;
}) => {
  return (
    <div className='p-4 border space-y-2 text-center rounded'>
      <h2 className='font-bold text-2xl'>Search</h2>
      <div className=' flex items-center gap-2'>
        <label>Search Note</label>
        <select
          onChange={(e) => setSearchNote(parseInt(e.target.value))}
          className='border px-2 py-1'
        >
          {NOTES_ARRAY.map((note, index) => (
            <option key={index} value={index}>
              {note}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
