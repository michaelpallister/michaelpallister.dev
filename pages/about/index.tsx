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

export const getStaticProps: GetStaticProps = async () => {
  const allGames = await prisma.games.findMany();
  return { props: { allGames } };
};

const About: NextPage = (props) => {
  const games = props.allGames.map((g: Game) => (
    <li
      key={g.id}
      className='bg-jet rounded p-4 bg-opacity-25 flex items-start justify-between'
    >
      <div>
        <p>{g.title}</p>
        <p>{g.completion}</p>
        <p>{g.platinum ? 'true' : 'false'}</p>
      </div>
      <div className='flex flex-col justify-between h-full text-right'>
        <Image src={g.image} height='56' width='200' alt='' objectFit='cover' />
        <p>{g.platform}</p>
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
        <h1 className='text-6xl lg:text-4xl font-bold flex items-center'>
          About me
        </h1>
        <p className='text-2xl mt-2 lg:mt-4'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum rem
          corrupti hic. Veniam quia maxime in dicta harum veritatis sapiente
          porro, ipsa quasi vel corrupti eveniet suscipit ipsam enim at.
        </p>
        <h2 className='mt-20 mb-4 text-xl font-bold'>Recently played</h2>
        <ul className='mb-10 grid grid-cols-3 gap-4'>{games}</ul>
      </main>
    </div>
  );
};

export default About;
