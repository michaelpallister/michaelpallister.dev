import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = (props) => {
  return (
    <>
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

      <main className='container'>
        <h1 className='text-6xl font-extrabold flex items-center text-transparent tracking-tight bg-clip-text bg-gradient-to-br from-surfie-green to-cyan'>
          Hi, I am Michael.
        </h1>
        <p className='text-4xl tracking-tight font-extrabold mt-2 lg lg:mt-4 lg:w-2/3 text-gray-300'>
          I build websites, collect game consoles, tinker with electronics and{' '}
          <a
            className='underline hover:text-cyan'
            href='https://www.strava.com/athletes/10793089'
            target='_blank'
            rel='noreferrer noopener'
          >
            run
          </a>
        </p>
      </main>
    </>
  );
};

export default Home;
