import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import prisma from '../../lib/prisma';
import Image from 'next/image';

interface Game {
  id: string;
  title: string;
  completion: string;
  platinum: boolean;
  image: string;
  platform: string;
}

interface Games {
  allGames: Game[];
}

export const getStaticProps: GetStaticProps = async () => {
  const allGames = await prisma.games.findMany();
  return { props: { allGames } };
};

const About = (props: Games) => {
  const games = props.allGames.map((g: Game) => (
    <li key={g.id}>
      <div className='h-0.5 bg-gradient-to-l from-surfie-green to-cyan rounded-tl rounded-tr'></div>
      <div className='bg-mine-shaft-solid rounded-bl rounded-br p-4'>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col justify-between h-full mr-4'>
            <p className='text-sm uppercase mb-4 text-white font-medium'>
              {g.title}
            </p>
            <p>{g.completion}</p>
          </div>
          <div className='flex flex-col justify-between h-full text-right flex-shrink-0'>
            <Image
              src={g.image}
              height='56'
              width='100'
              alt=''
              objectFit='cover'
            />
            <p>{g.platform}</p>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <div className='flex flex-col justify-between'>
      <Head>
        <title>
          About | Michael Pallister | Frontend Developer | michaelpallister.dev
        </title>
      </Head>

      <main className='container'>
        <h1 className='text-xl font-medium flex items-center text-white uppercase border-b border-mine-shaft-solid pb-2'>
          About me
        </h1>
        <p className='text-2xl mt-2 lg:mt-4 text-white'>
          Hi, I&#39;m Michael Pallister. A developer from the North East of
          England. I have over a decade of experience working on projects of all
          sizes, from marketing sites to SaaS products to e-commerce monorepos.
        </p>
        <p className='text-2xl mt-2 lg:mt-4 text-white'>
          Along the way, I have been fortunate enough to produce work for global
          brands like the BBC, Mitre, Gola, Kickers and the UK&#39;s largest
          electrical wholesaler CEF.
        </p>
        <p className='text-2xl mt-2 lg:mt-4 text-white'>
          I enjoy creating scalable and maintainable front-ends.
        </p>
        <p className='text-2xl mt-2 lg:mt-4 text-white'>
          I&#39;m a dad to a 16-month old girl and in the little spare time I
          have, I enjoy gaming, collecting game consoles, tinkering with
          electronics and running.
        </p>
        <section>
          <h2 className='mt-20 mb-4 text-xl font-medium text-white uppercase border-b border-mine-shaft-solid pb-2'>
            Recently played
          </h2>
          <ul className='mb-10 grid grid-cols-3 gap-4'>{games}</ul>
        </section>
      </main>
    </div>
  );
};

export default About;
