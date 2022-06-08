import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <header className='container h-16 mt-3 mb-20 flex justify-between items-center'>
        <Link href='/'>
          <a className='inline-block'>
            <svg
              width='64'
              height='64'
              viewBox='0 0 200 200'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='logo'
            >
              <rect width='200' height='200' rx='8' fill='#202020' />
              <path
                d='M132.536 167V95.94L109.926 145.91H90.166L67.556 95.94V167H30.506V32.1H70.976L100.046 95.56L129.306 32.1H169.586V167H132.536Z'
                fill='#D6D6D6'
              />
            </svg>
          </a>
        </Link>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </header>
      <Component {...pageProps} />
      <footer className='container h-16 flex items-center'>
        <p className='text-sm'>&copy; Michael Pallister</p>
      </footer>
    </div>
  );
}

export default MyApp;
