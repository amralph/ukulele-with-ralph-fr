import { client } from '@/sanity/client';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://ukulelewithralph.com';

async function getTabSlugs() {
  const slugs = await client.fetch(`*[_type == "tab"]{"slug": slug.current}`);
  return slugs.filter((tab: { slug?: string }) => tab.slug);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const tabs = await getTabSlugs();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/note-finder`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tabs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...tabs.map((tab: { slug: string }) => ({
      url: `${BASE_URL}/tabs/${tab.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
