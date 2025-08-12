export default function Socials() {
  return (
    <section className='mt-12 flex justify-center space-x-10'>
      <a
        href={process.env.NEXT_PUBLIC_YOUTUBE}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='YouTube'
        className='flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition'
      >
        {/* YouTube SVG */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M19.615 3.184A2.998 2.998 0 0017.74 2.5H6.261a3 3 0 00-2.89 2.448C3 6.125 3 9.988 3 9.988s0 3.865.371 4.99a3 3 0 002.89 2.446h11.48a3 3 0 002.168-.713 2.99 2.99 0 001.083-2.223c.194-1.38.194-4.49.194-4.49s0-3.107-.371-4.815a3.017 3.017 0 00-1.586-2.217zM10 14.75v-5.5l4.5 2.75-4.5 2.75z' />
        </svg>
      </a>

      <a
        href={process.env.NEXT_PUBLIC_TIKTOK}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='TikTok'
        className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-black hover:bg-black hover:text-white transition'
      >
        {/* TikTok SVG */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M9.465 2.004v6.53a4.5 4.5 0 11-4.5 4.5v-2.25a6.75 6.75 0 006.75 6.75 6.736 6.736 0 004.894-2.22v3.708a9 9 0 01-7.645 3.747 8.985 8.985 0 01-8.934-8.984 8.985 8.985 0 018.985-8.985h.45z' />
        </svg>
      </a>
    </section>
  );
}
