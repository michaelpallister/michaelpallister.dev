import type { GetStaticProps } from "next";
import Head from "next/head";
import { getXataClient, XataClient } from "../../lib/xata";
import GameCard from "../../components/gameCard";
import { yearsSince } from "../../utils/yearsSince";

interface Game {
  id: string;
  title: string;
  completion: string;
  platinum: boolean;
  image: string;
  platform: string;
}

interface StravaType {
  monthlyDistance: String;
  monthlyTime: String;
  activities: Activity[];
}

interface Activity {
  date: string;
  name: string;
  distance: string;
  time: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const xata = getXataClient();
  const allGames = await xata.db.Games.sort("date", "desc").getMany();
  const runs = await xata.db.Strava.getFirst();

  return {
    props: {
      allGames: JSON.parse(JSON.stringify(allGames)),
      stravaData: JSON.parse(JSON.stringify(runs)),
    },
    revalidate: 60,
  };
};

const About = ({
  allGames,
  stravaData,
}: {
  allGames: Game[];
  stravaData: StravaType;
}) => {
  const games = allGames.map((g: Game, index) => (
    <GameCard key={g.id} index={index} {...g} />
  ));
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
          brands like the BBC, Mitre, Gola, Kickers, the UK&#39;s largest
          electrical wholesaler CEF and more recently Bumble.
        </p>
        <p className="about__p">
          I enjoy creating scalable and maintainable front-ends.
        </p>
        <p className="about__p">
          I&#39;m a dad to a {yearsSince("2021-02-04")}-year old girl and in the
          little spare time I have; I enjoy gaming, collecting game consoles,
          tinkering with electronics, cars and running.
        </p>
        <section>
          <h2 className="heading mt-20">Running</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mt-2 lg:mt-4">
            <div>
              <h3 className="text-xl font-extrabold">Monthly distance:</h3>
              <p>{monthlyDistance}</p>
            </div>
            <div>
              <h3 className="text-xl font-extrabold">Monthly time:</h3>
              <p>{monthlyTime}</p>
            </div>
          </div>
          <div className="mb-4 mt-8">
            <h3 className="text-xl font-extrabold">Latest runs:</h3>
            <div className="md:grid grid-cols-3 mt-2">
              {activities.map((activity: Activity, index) => {
                return (
                  <div key={index} className="mb-4 lg:mb-0">
                    <p className="text-base font-bold">{activity.date}</p>
                    <p>{activity.name}</p>
                    <p>{activity.distance}</p>
                    <p>{activity.time}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {games.length > 0 && (
          <section>
            <h2 className="heading mt-20">Recently played</h2>
            <ul className="mb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 mt-2 lg:mt-4">
              {games}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default About;
