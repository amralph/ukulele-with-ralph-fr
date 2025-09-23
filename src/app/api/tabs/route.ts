// pages/api/tabs.ts
import { client } from '@/sanity/client';
import { getTabsPageQuery } from '@/app/tabs/queries';
import { PAGE_SIZE } from '@/app/tabs/constants';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(
    searchParams.get('pageSize') || PAGE_SIZE.toString(),
    10
  );
  const searchTerm = searchParams.get('searchTerm') || '';

  const tabs = await client.fetch(getTabsPageQuery(pageSize, page, searchTerm));

  return Response.json({ tabs });
}
