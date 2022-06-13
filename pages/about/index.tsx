import Head from 'next/head';
import useSWR from 'swr';
import GameCard from '../../components/gameCard';

interface Game {
  id: string;
  title: string;
  completion: string;
  platinum: boolean;
  image: string;
  platform: string;
}

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

const About = () => {
  const { data, error } = useSWR('/api/game', fetcher);

  if (error)
    return (
      <div className='container'>
        <p className='text-xl mt-2 lg:mt-4 text-white'>Failed to load data</p>
      </div>
    );

  if (!data)
    return (
      <div className='container'>
        <svg
          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      </div>
    );

  return (
    <div className='flex flex-col justify-between'>
      <Head>
        <title>
          About | Michael Pallister | Frontend Developer | michaelpallister.dev
        </title>
      </Head>

      <main className='container'>
        <h1 className='about__heading'>About me</h1>
        <p className='text-xl mt-2 lg:mt-4 text-white'>
          Hi, I&#39;m Michael Pallister. A developer from the North East of
          England. I have over a decade of experience working on projects of all
          sizes, from marketing sites to SaaS products to e-commerce monorepos.
        </p>
        <p className='text-xl mt-2 lg:mt-4 text-white'>
          Along the way, I have been fortunate enough to produce work for global
          brands like the BBC, Mitre, Gola, Kickers and the UK&#39;s largest
          electrical wholesaler CEF.
        </p>
        <p className='text-xl mt-2 lg:mt-4 text-white'>
          I enjoy creating scalable and maintainable front-ends.
        </p>
        <p className='text-xl mt-2 lg:mt-4 text-white'>
          I&#39;m a dad to a 16-month old girl and in the little spare time I
          have, I enjoy gaming, collecting game consoles, tinkering with
          electronics and running.
        </p>
        <section>
          <h2 className='about__heading mt-20'>Recently played</h2>
          <ul className='mb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4'>
            {data.games.map((g: Game) => (
              <GameCard key={g.id} {...g} />
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
