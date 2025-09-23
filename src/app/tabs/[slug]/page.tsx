import React from 'react';
import { getTabBySlugQuery } from '../queries';
import { client } from '@/sanity/client';
import Link from 'next/link';
import { DetailedTab } from '@/types/tab';
import YouTubeOrVideo from '@/components/YoutubeOrVideo';

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const tab = (await client.fetch(getTabBySlugQuery(slug))) as DetailedTab;

  return (
    <div className='justify-center flex space-x-4'>
      <div className='flex flex-col w-full max-w-4xl px-4 space-y-4'>
        {/* Title and metadata */}
        <div className='text-center md:text-left'>
          <h1 className='text-4xl font-semibold text-gray-900'>
            {tab.title} | Ukulele Tab
          </h1>

          {(tab.composer || tab.origin) && (
            <div className='text-xl text-gray-800 space-y-1'>
              {tab.composer && <p>By {tab.composer}</p>}
              {tab.origin && <p>From {tab.origin}</p>}
            </div>
          )}
        </div>

        {/* Links */}
        <div className='flex flex-wrap gap-3 items-center'>
          {tab.tabFileUrl && (
            <Link
              href={tab.tabFileUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 active:bg-blue-800 transition-colors'
            >
              Click here for tab
            </Link>
          )}

          {tab.shopUrl && (
            <Link
              href={tab.shopUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 active:bg-blue-800 transition-colors'
            >
              Click here for tab
            </Link>
          )}
        </div>

        {/* Video */}
        {tab.videoUrl && (
          <YouTubeOrVideo videoUrl={tab.videoUrl} title={tab.title} />
        )}

        {/* Audio */}
        {tab.audioFileUrl && (
          <audio
            controls
            controlsList='nodownload'
            className='h-9 w-full rounded-lg shadow max-w-full'
          >
            <source src={tab.audioFileUrl} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default page;
