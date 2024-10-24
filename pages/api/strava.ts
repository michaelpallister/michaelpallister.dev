import * as cheerio from "cheerio";
import type { NextApiRequest, NextApiResponse } from "next";
import { getXataClient } from "../../lib/xata";

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

function convertRelativeDates(dateStr: string): string {
  const today = new Date();

  if (dateStr === "Today") {
    return today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else if (dateStr === "Yesterday") {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    return dateStr;
  }
}

const Strava = async (req: NextApiRequest, res: NextApiResponse) => {
  const xata = getXataClient();
  const getFirstRecord = await xata.db.Strava.getFirst();

  try {
    const recordId = getFirstRecord?.id;
    const distanceCheck = getFirstRecord?.monthlyDistance;

    const response = await fetch(`https://www.strava.com/athletes/10793089`);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const strava: Activities[] = [];

    const distanceAndTimeElements = $(
      '[data-cy="monthly-stat-distance"] .Stat_statValue__3_kAe, [data-cy="monthly-stat-time"] .Stat_statValue__3_kAe'
    );

    const monthlyDistance = distanceAndTimeElements
      .eq(0)
      .text()
      .replace(/\s+(km)/g, "$1");
    const monthlyTime = distanceAndTimeElements.eq(1).text();

    const recentActivities = $('[data-testid="recent-activity"]');

    const activities: Activity[] = [];

    recentActivities.each(function (this) {
      const date = convertRelativeDates(
        $(this).find(".RecentActivities_timestamp__pB9a8").text()
      );
      const name = $(this).find('[data-cy="recent-activity-name"]').text();
      const distanceElevationTime = $(this)
        .find('[data-cy="activity-stats-stat"] div div')
        .text()
        .replace(/\s+(km|m)/g, "$1")
        .split(/(?<=km)|(?<=m)/)
        .map((s) => s.trim()); // ['12km', '13m', '10:10']
      const distance = distanceElevationTime[0];
      const time = distanceElevationTime[2];

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

    if (recordId && distanceCheck === monthlyDistance) {
      return res.json({
        strava,
      });
    }

    if (recordId && distanceCheck !== monthlyDistance) {
      await xata.db.Strava.delete(recordId);
      await xata.db.Strava.create(strava);
    } else {
      await xata.db.Strava.create(strava);
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
