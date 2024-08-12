import Script from 'next/script';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

import { useEffect } from 'react';

import * as gtag from '../lib/gtag';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-43SQHCEZKS`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-43SQHCEZKS', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />

      <div className="flex flex-col justify-between min-h-screen">
        <header className="mt-3 mb-10 md:mb-20 border-b border-mine-shaft-solid pb-3 print:hidden">
          <div className="container flex justify-between items-center">
            <Link href="/" className="inline-block">
              <svg
                width="64"
                height="64"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="logo"
              >
                <rect width="200" height="200" rx="8" fill="#323232" />
                <path
                  d="M132.536 167V95.94L109.926 145.91H90.166L67.556 95.94V167H30.506V32.1H70.976L100.046 95.56L129.306 32.1H169.586V167H132.536Z"
                  fill="#D6D6D6"
                  className="hover:fill-cyan"
                />
              </svg>
            </Link>
            <nav>
              <Link
                href="/"
                className="hover:underline text-gray-300  hover:text-cyan mr-8 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="hover:underline text-gray-300  hover:text-cyan mr-8 font-medium"
              >
                About
              </Link>
              <Link
                href="/cv"
                className="hover:underline text-gray-300 hover:text-cyan font-medium"
              >
                CV
              </Link>
            </nav>
          </div>
        </header>
        <Component {...pageProps} />
        <footer className="container h-16 flex items-center print:hidden">
          <p className="text-sm text-gray-300">
            &copy; Nobody, steal what you need.
          </p>
        </footer>
      </div>
    </>
  );
}

export default MyApp;
