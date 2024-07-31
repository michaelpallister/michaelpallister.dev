import * as cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getXataClient } from '../../lib/xata';

// interface Games {
//   title: string;
//   completion: string;
//   platinum: boolean;
//   image: string;
//   platform: string;
// }

const Strava = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const xata = getXataClient();
    // const records = await xata.db.Games.select(['id']).getAll();

    // if (records) {
    //   records.map((record) => xata.db.Games.delete(record));
    // }

    const response = await fetch(`https://www.strava.com/athletes/10793089k`);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const data = [];

    console.log(data);

    // games.map((game) => xata.db.Games.create(game));

    res.statusCode = 200;
    return res.json({
      data,
    });
  } catch (e) {
    res.statusCode = 404;
    return res.json({
      error: `Unable to get Strava data`,
    });
  }
};

export default Strava;
