import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { getXataClient, XataClient } from '../../lib/xata';
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
  const xata = getXataClient();
  const allGames = await xata.db.Games.getMany();
  const runs = await xata.db.Strava.getFirst();

  return {
    props: {
      allGames: JSON.parse(JSON.stringify(allGames)),
      stravaData: JSON.parse(JSON.stringify(runs)),
    },
    revalidate: 60,
  };
};

const About = ({ allGames, stravaData }) => {
  const games = allGames.map((g: Game) => <GameCard key={g.id} {...g} />);
  const { monthlyDistance, monthlyTime, activities } = stravaData;

  return (
    <div className="flex flex-col justify-between">
      <Head>
        <title>
          About | Michael Pallister | Frontend Developer | michaelpallister.dev
        </title>
      </Head>

      <main className="container">
        <h1 className="heading mb-8">About me</h1>
        <p className="about__p">
          Hi, I&#39;m Michael Pallister. A developer from the North East of
          England. I have over a decade of experience working on projects of all
          sizes, from marketing sites to SaaS products to e-commerce monorepos.
        </p>
        <p className="about__p">
          Along the way, I have been fortunate enough to produce work for global
          brands like the BBC, Mitre, Gola, Kickers and the UK&#39;s largest
          electrical wholesaler CEF.
        </p>
        <p className="about__p">
          I enjoy creating scalable and maintainable front-ends.
        </p>
        <p className="about__p">
          I&#39;m a dad to a 3-year old girl and in the little spare time I
          have; I enjoy gaming, collecting game consoles, tinkering with
          electronics, cars and running.
        </p>
        <section>
          <h2 className="heading mt-20">Running</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mt-2 lg:mt-4">
            <div>
              <h3>Monthly distance:</h3>
              <p>{monthlyDistance}</p>
            </div>
            <div>
              <h3>Monthly time:</h3>
              <p>{monthlyTime}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 mt-2 lg:mt-4">
            {activities.map((activity: any[]) => {
              return (
                <>
                  <div>{activity.date}</div>
                  <div>{activity.name}</div>
                  <div>{activity.distance}</div>
                  <div>{activity.time}</div>
                </>
              );
            })}
          </div>
        </section>
        <section>
          <h2 className="heading mt-20">Recently played</h2>
          <ul className="mb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mt-2 lg:mt-4">
            {games}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
