'use client';

import Link from 'next/link';
import Socials from './Socials';

const Navbar = ({
  title,
  youtubeUrl,
  tiktokUrl,
}: {
  title: string;
  youtubeUrl: string;
  tiktokUrl: string;
}) => {
  return (
    <nav className='bg-blue-500 text-white overflow-x-auto'>
      <div className='max-w-7xl mx-auto flex h-16 items-center min-w-max px-4 sm:px-6 lg:px-8 space-x-4 md:space-x-8'>
        {/* Left side: Logo / Title */}
        <Link className='text-lg font-semibold mr-8 flex-shrink-0' href='/'>
          {title}
        </Link>

        {/* Tabs / Note Finder */}
        <ol className='flex space-x-4 flex-shrink-0'>
          <li>
            <Link
              href='/'
              className='bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-colors px-4 py-2 rounded inline-block text-center flex-shrink-0'
            >
              Ukulele Tabs
            </Link>
          </li>
          <li>
            <Link
              href='/note-finder'
              className='bg-blue-700 hover:bg-blue-800 active:bg-blue-900 transition-colors px-4 py-2 rounded inline-block text-center flex-shrink-0'
            >
              Note Finder
            </Link>
          </li>
        </ol>

        {/* Right side: Socials */}
        <div className='ml-auto flex-shrink-0'>
          <Socials youtubeUrl={youtubeUrl} tiktokUrl={tiktokUrl} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
