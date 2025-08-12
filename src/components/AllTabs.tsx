'use client';

import React, { useState, useMemo } from 'react';
import { Tab } from '@/types/tab';

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
        tab.title.toLowerCase().startsWith(lowerSearch) ||
        (tab.composer?.toLowerCase().startsWith(lowerSearch) ?? false)
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
        <ul className='space-y-2'>
          {filteredTabs.map((tab) => (
            <li
              key={tab._id}
              className='bg-blue-300 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-4'
            >
              <div className='flex-1'>
                <h3 className='text-lg font-semibold'>{tab.title}</h3>
                {tab.composer && (
                  <p className='italic text-gray-600 mb-2'>By {tab.composer}</p>
                )}

                <div className=''>
                  {tab.shopUrl && (
                    <div>
                      <a
                        href={tab.shopUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:underline'
                      >
                        Tab
                      </a>
                    </div>
                  )}
                  {tab.videoUrl && (
                    <div>
                      <a
                        href={tab.videoUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:underline'
                      >
                        Video
                      </a>
                    </div>
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
