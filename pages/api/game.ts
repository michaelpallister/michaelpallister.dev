import * as cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getXataClient, XataClient } from '../../lib/xata';

interface Games {
  title: string;
  completion: string;
  platinum: boolean;
  image: string;
  platform: string;
}

const games = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = getXataClient();

  try {
    await client.sql`DELETE * FROM "Games"`;

    const response = await fetch(`https://psnprofiles.com/micpuk`);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const games: Games[] = [];
    $('#gamesTable tr:nth-of-type(-n + 12)').each(function (this) {
      const title = $(this).find('.title').text();
      const completion = $(this).find('.progress-bar span').text();
      const platform = $(this).find('.platforms .platform').text();
      const platinum = $(this).find('.platinum').hasClass('earned');
      const image = $(this).find('.game img').attr('src');

      const obj = {
        title,
        completion,
        platform,
        platinum,
        image,
      };

      console.log(obj);

      games.push(obj as Games);
    });

    games.map((game) => client.db.Games.create(game));

    res.statusCode = 200;
    return res.json({
      games,
    });
  } catch (e) {
    res.statusCode = 404;
    return res.json({
      error: `Unable to find games`,
    });
  }
};

export default games;
