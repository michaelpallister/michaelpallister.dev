import * as cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getXataClient, StravaRecord } from '../../lib/xata';

type Activities = {
  monthlyDistance: string;
  monthlyTime: string;
  activities: Activity[];
};

type Activity = {
  date: string;
  name: string;
  distance: string;
  time: string;
};

const Strava = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const xata = getXataClient();
    const getFirstRecord = await xata.db.Strava.getFirst();
    const recordId = getFirstRecord?.id;
    const distanceCheck = getFirstRecord?.monthlyDistance;

    const response = await fetch(`https://www.strava.com/athletes/10793089`);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const strava: Activities[] = [];

    const distanceAndTimeElements = $(
      '[data-cy="monthly-stat-distance"] .Stat_statValue__3_kAe, [data-cy="monthly-stat-time"] .Stat_statValue__3_kAe'
    );

    const monthlyDistance = distanceAndTimeElements.eq(0).text();
    const monthlyTime = distanceAndTimeElements.eq(1).text();

    const recentActivities = $('[data-testid="recent-activity"]');

    const activities: Activity[] = [];

    recentActivities.each(function (this) {
      const date = $(this).find('.RecentActivities_timestamp__pB9a8').text();
      const name = $(this).find('[data-cy="recent-activity-name"]').text();
      const distance = $(this)
        .find(
          '.styles_listStats__wQVTf li:first-of-type .Stat_statValue__3_kAe'
        )
        .text();
      const time = $(this)
        .find('.styles_listStats__wQVTf li:last-of-type .Stat_statValue__3_kAe')
        .text();

      activities.push({
        date,
        name,
        distance,
        time,
      });
    });

    strava.push({
      monthlyDistance,
      monthlyTime,
      activities,
    });

    if (
      distanceCheck !== null &&
      distanceCheck !== monthlyDistance &&
      recordId
    ) {
      await xata.db.Strava.delete(recordId);
      strava.map((record) => xata.db.Strava.create(record));
    }

    res.statusCode = 200;
    return res.json({
      strava,
    });
  } catch (e) {
    res.statusCode = 404;
    return res.json({
      error: `Unable to get Strava data`,
    });
  }
};

export default Strava;
