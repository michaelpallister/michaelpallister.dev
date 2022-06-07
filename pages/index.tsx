import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import prisma from '../lib/prisma';
import Image from 'next/image';

export const getStaticProps: GetStaticProps = async () => {
  const allGames = await prisma.games.findMany();
  return { props: { allGames } };
};

const Home: NextPage = (props) => {
  const games = props.allGames.map((g) => (
    <li key={g.id} className='bg-jet rounded p-4 bg-opacity-25'>
      <Image src={g.image} height='56' width='100' alt='' objectFit='cover' />
      <p>{g.title}</p>
      <p>{g.completion}</p>
      <p>{g.platform}</p>
      <p>{g.platinum ? 'true' : 'false'}</p>
    </li>
  ));

  return (
    <div className='flex flex-col justify-between'>
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

      <header className='container h-16 mt-3 mb-20'>
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

      <main className='container'>
        <h1 className='text-6xl lg:text-8xl font-bold flex items-center'>
          Hi, I am Michael.
        </h1>
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
        <h2 className='mt-20 mb-4 text-xl font-bold'>Recently played</h2>
        <ul className='mb-10 grid grid-cols-3 gap-4'>{games}</ul>
      </main>
      <footer className='container h-16 flex items-center'>
        <p className='text-sm'>&copy; Michael Pallister</p>
      </footer>
    </div>
  );
};

export default Home;
