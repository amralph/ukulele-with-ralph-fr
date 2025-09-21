import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import Socials from '@/components/Socials';
import Navbar from '@/components/Navbar';
import { client } from '@/sanity/client';

export const metadata: Metadata = {
  title: {
    template: `%s | Ukulele with Ralph`, // %s is replaced by the page's title
    default: `Ukulele with Ralph`, // Default title if no specific title is provided
  },
  description: 'A collection of ukulele tabs arranged by Ralph.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const LAYOUT_QUERY = `{
  "frontPage": *[_type == "frontPage"] | order(publishedAt desc)[0]{
    youtubeUrl,
    tiktokUrl,
    title
  },
}`;

  const options = { next: { revalidate: 30 } };

  const data = await client.fetch(LAYOUT_QUERY, {}, options);
  const { youtubeUrl, tiktokUrl, title } = data.frontPage;

  return (
    <html lang='en'>
      <head>
        {/* Load GA script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy='afterInteractive'
        />
        {/* Initialize GA */}
        <Script id='gtag-init' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className='bg-blue-200 flex flex-col min-h-screen'>
        <Navbar title={title} youtubeUrl={youtubeUrl} tiktokUrl={tiktokUrl} />
        <div className='px-4 container mx-auto py-10 flex-grow'>{children}</div>
        <footer className='text-center text-gray-500 text-sm mt-10'>
          <Socials youtubeUrl={youtubeUrl} tiktokUrl={tiktokUrl}></Socials>
        </footer>
      </body>
    </html>
  );
}
