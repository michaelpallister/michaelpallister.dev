import * as cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

const games = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(`https://psnprofiles.com/micpuk`);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const games: Object[] = [];
    $('#gamesTable tr:nth-of-type(-n + 9)').each(function (this) {
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

      games.push(obj);
    });

    await prisma.games.createMany({
      data: games,
    });

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
