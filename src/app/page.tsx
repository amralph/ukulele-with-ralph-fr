import { client } from '@/sanity/client';
import FeaturedTabs from '@/components/FeaturedTabs';
import AllTabs from '@/components/AllTabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Ukulele tabs | Ukulele with Ralph`,
};

export default async function Home() {
  const FRONT_PAGE_QUERY = `{
  "frontPage": *[_type == "frontPage"] | order(publishedAt desc)[0]{
    "featuredTabs": featuredTabs[]->{
      _id,
      title,
      slug,
      composer,
      videoUrl,
      shopUrl,
      origin
    }
  },

  "allTabs": *[_type == "tab"] | order(title asc){
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
  }
}`;

  const options = { next: { revalidate: 30 } };

  const data = await client.fetch(FRONT_PAGE_QUERY, {}, options);

  const { featuredTabs } = data.frontPage;
  const { allTabs } = data;

  return (
    <div className='space-y-4'>
      <header className='text-center'>
        <h1 className='text-4xl font-extrabold mb-2'>Ukulele tabs</h1>
        <p>Find ukulele tabs and ukulele resources made by me here.</p>
      </header>
      <FeaturedTabs featuredTabs={featuredTabs} />
      <AllTabs tabs={allTabs} />
    </div>
  );
}
