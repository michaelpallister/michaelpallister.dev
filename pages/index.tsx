import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Head>
        <title>
          Michael Pallister | Frontend Developer | michaelpallister.dev
        </title>
        <meta
          name='description'
          content='Michael Pallister, a front-end developer from the North East of England.'
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='container h-16 my-3'>
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
      </header>

      <main className='container h-100'>
        <p className='text-6xl lg:text-8xl font-bold flex items-center'>
          Hi, I am Michael.
        </p>
        <p className='text-2xl mt-2 lg:text-4xl lg:mt-4'>
          I build websites, collect games consoles and{' '}
          <a
            className='big-link'
            href='https://www.strava.com/athletes/10793089'
            target='_blank'
            rel='noreferrer noopener'
          >
            run
          </a>
          .
        </p>
      </main>
      <footer className='container h-16 flex items-center'>
        <p className='text-sm'>&copy; Michael Pallister</p>
      </footer>
    </div>
  );
};

export default Home;
