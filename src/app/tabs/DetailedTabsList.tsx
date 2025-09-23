'use client';

import React, { useState, useEffect } from 'react';
import { DetailedTab } from '@/types/tab';
import Image from 'next/image';
import Link from 'next/link';
import { DEBOUNCE_DELAY, PAGE_SIZE } from './constants';
import Spinner from '@/components/Spinner';
import { useIsMount } from '@/hooks/useIsAmount';

interface DetailedTabsListProps {
  tabs: DetailedTab[];
}

export default function DetailedTabsList({ tabs }: DetailedTabsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabList, setTabList] = useState<DetailedTab[]>(tabs);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const isMount = useIsMount();

  const loadMore = async (
    page: number,
    pageSize: number,
    term: string,
    signal?: AbortSignal
  ) => {
    setLoading(true);

    try {
      const res = await fetch(
        `/api/tabs?page=${page + 1}&pageSize=${pageSize}&searchTerm=${term}`,
        { signal }
      );

      const newTabs = await res.json();

      setCurrentPage((prevPage) => prevPage + 1);
      setTabList((prevTabs) => [...prevTabs, ...newTabs.tabs]);
      setHasMore(newTabs.tabs.length > 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setCurrentPage(0);
      setTabList([]);
      await loadMore(0, PAGE_SIZE, searchTerm, controller.signal);
    };

    const debounceTimer = setTimeout(() => {
      if (!isMount) fetchData();
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [searchTerm, isMount]);

  return (
    <div className='space-y-4'>
      <h2 className='text-3xl font-semibold mb-2'>All ukulele tabs</h2>

      <input
        type='text'
        placeholder='Search tabs by title or artist...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='bg-white mb-6 w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      {tabList.length === 0 && !loading ? (
        <p className='text-center text-gray-500'>No tabs found.</p>
      ) : (
        <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {tabList.map((tab) => (
            <li
              key={tab._id}
              className='bg-blue-300 rounded-lg p-5 shadow-sm flex gap-5'
            >
              {tab.previewTabFileUrl && (
                <Image
                  src={tab.previewTabFileUrl}
                  alt={`${tab.title} preview`}
                  className='w-32 h-44 object-contain rounded-md border bg-white'
                  width={128}
                  height={176}
                />
              )}

              <div className='flex-1 flex flex-col space-y-2'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {tab.title}
                </h3>

                {(tab.composer || tab.origin) && (
                  <div className='text-sm text-gray-800'>
                    {tab.composer && <p>By {tab.composer}</p>}
                    {tab.origin && <p>From {tab.origin}</p>}
                  </div>
                )}

                <div className='mt-auto flex flex-wrap gap-2'>
                  {tab.tabFileUrl && (
                    <Link
                      href={tab.tabFileUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 active:bg-blue-800 transition-colors'
                    >
                      Tab
                    </Link>
                  )}
                  {tab.shopUrl && (
                    <Link
                      href={tab.shopUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 active:bg-blue-800 transition-colors'
                    >
                      Tab
                    </Link>
                  )}
                  {tab.videoUrl && (
                    <Link
                      href={tab.videoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='px-4 py-2 bg-gray-200 text-sm font-medium rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-colors'
                    >
                      Video
                    </Link>
                  )}

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
            </li>
          ))}
        </ul>
      )}
      <div className='flex items-center justify-center'>
        {hasMore && !loading && (
          <button
            className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 active:bg-blue-800 transition-colors hover:cursor-pointer'
            onClick={() => {
              loadMore(currentPage, PAGE_SIZE, searchTerm);
            }}
          >
            More
          </button>
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
}
