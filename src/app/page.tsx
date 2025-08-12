import { client } from '@/sanity/client';
import Socials from '@/components/Socials';
import FeaturedTabs from '@/components/FeaturedTabs';
import AllTabs from '@/components/AllTabs';

export default async function Home() {
  const FRONT_PAGE_QUERY = `{
  "featuredTabs": *[_type == "frontPage"] | order(publishedAt desc)[0...12] {
    featuredTabs[]->{
      _id,
      title,
      slug,
      composer,
      videoUrl,
      shopUrl
    }
  }[0].featuredTabs,

  "allTabs": *[_type == "tab"] | order(title asc) {
    _id,
    title,
    slug,
    composer,
    videoUrl,
    shopUrl
  }
}`;

  const options = { next: { revalidate: 30 } };

  const data = await client.fetch(FRONT_PAGE_QUERY, {}, options);

  const { featuredTabs, allTabs } = data;
  return (
    <div className='container mx-auto py-6 px-12 space-y-4'>
      <header className='mb-8 text-center'>
        <h1 className='text-4xl font-extrabold mb-2'>Ukulele with Ralph</h1>
        <p className='text-lg text-gray-700'>Find tabs made by me here!</p>
      </header>

      <FeaturedTabs featuredTabs={featuredTabs} />

      <AllTabs tabs={allTabs} />

      {/* Example YouTube link (just for demo) */}
      <footer className='mt-12 text-center text-gray-500 text-sm'>
        <Socials></Socials>
      </footer>
    </div>
  );
}
