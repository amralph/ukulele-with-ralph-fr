import React from 'react';
import { Tab } from '@/types/tab';
import Link from 'next/link';

interface FeaturedTabsProps {
  featuredTabs: Tab[];
}

export default function FeaturedTabs({ featuredTabs }: FeaturedTabsProps) {
  return (
    <section>
      <h2 className='text-3xl font-semibold mb-6'>Featured ukulele tabs</h2>

      {featuredTabs.length === 0 ? (
        <p className='text-center text-gray-500'>No tabs found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {featuredTabs.map((tab) => (
            <article
              key={tab._id}
              className='bg-blue-300 rounded-lg p-5 shadow-md flex flex-col'
            >
              <h3 className='text-xl font-semibold mb-1'>{tab.title}</h3>
              {tab.origin && (
                <div className='text-sm text-gray-800 mb-3 space-y-1'>
                  {tab.origin && <p>From {tab.origin}</p>}
                </div>
              )}

              {tab.videoUrl && (
                <div className='mb-5 rounded overflow-hidden aspect-video'>
                  {tab.videoUrl.includes('youtube') ||
                  tab.videoUrl.includes('youtu.be') ? (
                    <iframe
                      src={tab.videoUrl.replace('watch?v=', 'embed/')}
                      title={tab.title}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                      className='w-full h-full'
                    />
                  ) : (
                    <video
                      controls
                      src={tab.videoUrl}
                      className='w-full h-auto rounded'
                      preload='metadata'
                    />
                  )}
                </div>
              )}

              <div className='mt-auto flex flex-col space-y-3'>
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
                <div className='mt-auto flex gap-3'>
                  {tab.shopUrl && (
                    <Link
                      href={tab.shopUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition-colors'
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
    </section>
  );
}
