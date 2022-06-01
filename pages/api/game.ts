const cheerio = require('cheerio');

const games = async (req: any, res: any) => {
  if (req.method === 'GET') {
    try {
      const response = await fetch(`https://psnprofiles.com/micpuk`);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const games: Object[] = [];
      $('#gamesTable tr:nth-of-type(-n + 10)').each(function (
        this: HTMLElement
      ) {
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
  }
};

export default games;
