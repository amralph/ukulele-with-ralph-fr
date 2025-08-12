import React from 'react';
import { Tab } from '@/types/tab';

interface FeaturedTabsProps {
  featuredTabs: Tab[];
}

export default function FeaturedTabs({ featuredTabs }: FeaturedTabsProps) {
  return (
    <section>
      <h2 className='text-3xl font-semibold mb-6'>Featured tabs</h2>

      {featuredTabs.length === 0 ? (
        <p className='text-center text-gray-500'>No tabs found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {featuredTabs.map((tab) => (
            <article
              key={tab._id}
              className='bg-blue-300 border rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col'
            >
              <h3 className='text-xl font-semibold mb-1'>{tab.title}</h3>
              {tab.composer && (
                <p className='italic text-gray-600 mb-3'>By {tab.composer}</p>
              )}

              {tab.videoUrl && (
                <div className='mb-5 rounded overflow-hidden aspect-w-16 aspect-h-9'>
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
                    <a
                      href={tab.videoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:underline'
                    >
                      Watch Video
                    </a>
                  )}

                {/* Shop URL */}
                {tab.shopUrl && (
                  <a
                    href={tab.shopUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    Tab
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
