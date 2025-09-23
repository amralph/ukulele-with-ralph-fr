import React from 'react';
import { DetailedTab } from '@/types/tab';
import Link from 'next/link';
import YouTubeOrVideo from './YoutubeOrVideo';

interface FeaturedTabsProps {
  featuredTabs: DetailedTab[];
}

export default function FeaturedTabs({ featuredTabs }: FeaturedTabsProps) {
  return (
    <div className='space-y-4'>
      <h2 className='text-3xl font-semibold'>Featured ukulele tabs</h2>

      {featuredTabs.length === 0 ? (
        <p className='text-center text-gray-500'>No tabs found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 '>
          {featuredTabs.map((tab) => (
            <article
              key={tab._id}
              className='bg-blue-300 rounded-lg p-5 shadow-md flex flex-col space-y-3'
            >
              <div className='space-y-1'>
                <h3 className='text-xl font-semibold '>{tab.title}</h3>
                {tab.origin && (
                  <div className='text-sm text-gray-800'>
                    {tab.origin && <p>From {tab.origin}</p>}
                  </div>
                )}
              </div>

              {tab.videoUrl && (
                <YouTubeOrVideo videoUrl={tab.videoUrl} title={tab.title} />
              )}

              <div className='flex flex-col space-y-3'>
                {/* Link for non-YouTube videos */}
                {tab.videoUrl &&
                  !(
                    tab.videoUrl.includes('youtube') ||
                    tab.videoUrl.includes('youtu.be')
                  ) && (
                    <Link
                      href={tab.videoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:underline'
                    >
                      Watch Video
                    </Link>
                  )}

                {/* Shop URL */}
                <div className='flex gap-3'>
                  {tab.shopUrl && (
                    <Link
                      href={`/tabs/${tab.slug}`}
                      rel='noopener noreferrer'
                      className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 active:bg-blue-800 transition-colors'
                    >
                      Tab
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
