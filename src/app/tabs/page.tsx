import DetailedTabsList from '@/app/tabs/DetailedTabsList';
import React from 'react';
import { client } from '@/sanity/client';
import { PAGE_SIZE } from './constants';

const page = async () => {
  const TABS_PAGE_QUERY = `
*[_type == "tab"] | order(title asc)[0...${PAGE_SIZE}]{
  _id,
  title,
  slug,
  composer,
  videoUrl,
  shopUrl,
  origin,
  "previewTabFileUrl": previewTabFile.asset->url,
  "audioFileUrl": audioFile.asset->url,
  "tabFileUrl": tabFile.asset->url
}`;

  const options = { next: { revalidate: 30 } };
  const tabs = await client.fetch(TABS_PAGE_QUERY, {}, options);

  return (
    <div className='space-y-4'>
      <header className='text-center'>
        <h1 className='text-4xl font-extrabold mb-2'>Ukulele tabs</h1>
        <p>Find ukulele tabs made by me here.</p>
      </header>
      <DetailedTabsList tabs={tabs} />
    </div>
  );
};

export default page;
