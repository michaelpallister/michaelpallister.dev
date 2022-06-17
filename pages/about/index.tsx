import type { GetStaticProps } from 'next';
import Head from 'next/head';
import prisma from '../../lib/prisma';
import GameCard from '../../components/gameCard';

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
  const games = props.allGames.map((g: Game) => <GameCard key={g.id} {...g} />);

  return (
    <div className='flex flex-col justify-between'>
      <Head>
        <title>
          About | Michael Pallister | Frontend Developer | michaelpallister.dev
        </title>
      </Head>

      <main className='container'>
        <h1 className='heading'>About me</h1>
        <p className='mt-2 lg:mt-4 text-white'>
          Hi, I&#39;m Michael Pallister. A developer from the North East of
          England. I have over a decade of experience working on projects of all
          sizes, from marketing sites to SaaS products to e-commerce monorepos.
        </p>
        <p className='mt-2 lg:mt-4 text-white'>
          Along the way, I have been fortunate enough to produce work for global
          brands like the BBC, Mitre, Gola, Kickers and the UK&#39;s largest
          electrical wholesaler CEF.
        </p>
        <p className='mt-2 lg:mt-4 text-white'>
          I enjoy creating scalable and maintainable front-ends.
        </p>
        <p className='mt-2 lg:mt-4 text-white'>
          I&#39;m a dad to a 16-month old girl and in the little spare time I
          have; I enjoy gaming, collecting game consoles, tinkering with
          electronics and running.
        </p>
        <section>
          <h2 className='heading mt-20'>Recently played</h2>
          <ul className='mb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mt-2 lg:mt-4'>
            {games}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
