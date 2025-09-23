'use client';

import { Tab } from '@/types/tab';
import Link from 'next/link';

interface ListProps {
  tabs: Tab[];
}

export default function DetailedTabsList({ tabs }: ListProps) {
  return (
    <section>
      <h2 className='text-3xl font-semibold mb-2'>All ukulele tabs</h2>

      {tabs.length === 0 ? (
        <p className='text-center text-gray-500'>No tabs found.</p>
      ) : (
        <ul className='grid grid-cols-1 gap-2'>
          {tabs.map((tab) => (
            <li
              key={tab._id}
              className='bg-blue-300 hover:bg-blue-400 active:bg-blue-500 rounded-lg p-4 shadow-sm flex gap-5 transition-colors'
            >
              <Link href={`/tabs/${tab.slug}`}>
                <h3 className='text-lg font-semibold text-gray-900'>
                  {tab.title}
                </h3>
                {tab.composer && (
                  <div className='text-gray-800'>
                    <p>By {tab.composer}</p>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
