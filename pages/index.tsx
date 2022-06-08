import type { NextPage, GetStaticProps } from 'next';
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
        <h1 className='text-6xl lg:text-8xl font-bold flex items-center text-white'>
          Hi, I am Michael.
        </h1>
        <p className='text-2xl mt-2 lg:text-4xl lg:mt-4 lg:leading-snug lg:w-2/3 text-white'>
          I build websites, collect games consoles, tinker with electronics and{' '}
          <a
            className='big-link'
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
