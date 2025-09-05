'use client';

import React, { useState, useMemo } from 'react';
import { Tab } from '@/types/tab';
import Image from 'next/image';

interface AllTabsProps {
  tabs: Tab[];
}

export default function AllTabs({ tabs }: AllTabsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tabs matching from the start of title or composer
  const filteredTabs = useMemo(() => {
    if (!searchTerm) return tabs;

    const lowerSearch = searchTerm.toLowerCase();

    return tabs.filter((tab) => {
      return (
        tab.title.toLowerCase().includes(lowerSearch) ||
        (tab.composer?.toLowerCase().includes(lowerSearch) ?? false) ||
        (tab.origin?.toLowerCase().includes(lowerSearch) ?? false)
      );
    });
  }, [searchTerm, tabs]);

  return (
    <section>
      <h2 className='text-3xl font-semibold mb-2'>All Tabs</h2>

      <input
        type='text'
        placeholder='Search tabs by title or artist...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='bg-white mb-6 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      {filteredTabs.length === 0 ? (
        <p className='text-center text-gray-500'>No tabs found.</p>
      ) : (
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {filteredTabs.map((tab) => (
            <li
              key={tab._id}
              className='bg-blue-300 rounded-lg p-5 shadow-sm flex gap-5'
            >
              {/* Optional preview image (if you have one) */}
              {tab.previewTabFileUrl && (
                <Image
                  src={tab.previewTabFileUrl}
                  alt={`${tab.title} preview`}
                  className='w-32 h-44 object-contain rounded-md border bg-white'
                  width={128}
                  height={176}
                  unoptimized
                />
              )}

              <div className='flex-1 flex flex-col space-y-2'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {tab.title}
                </h3>

                {(tab.composer || tab.origin) && (
                  <div className='text-sm text-gray-800'>
                    {tab.composer && <p>By {tab.composer}</p>}
                    {tab.origin && <p>From {tab.origin}</p>}
                  </div>
                )}

                <div className='mt-auto flex flex-wrap gap-2'>
                  {tab.shopUrl && (
                    <a
                      href={tab.shopUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition-colors'
                    >
                      Tab
                    </a>
                  )}
                  {tab.videoUrl && (
                    <a
                      href={tab.videoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='px-4 py-2 bg-gray-200 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors'
                    >
                      Video
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
