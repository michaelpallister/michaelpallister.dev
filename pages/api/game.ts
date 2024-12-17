import { chromium } from "playwright";
import type { NextApiRequest, NextApiResponse } from "next";
import { getXataClient } from "../../lib/xata";

interface Games {
  title: string;
  completion: string;
  platinum: boolean;
  image: string;
  platform: string;
  date: string;
}

const games = async (req: NextApiRequest, res: NextApiResponse) => {
  const xata = getXataClient();
  const records = await xata.db.Games.select(["id"]).getAll();

  if (records) {
    for (const record of records) {
      await xata.db.Games.delete(record);
    }
  }

  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://psnprofiles.com/micpuk");

    const games: Games[] = await page.evaluate(() => {
      const rows = Array.from(
        document.querySelectorAll("#gamesTable tr:nth-of-type(-n + 12)")
      );
      return rows.map((row) => {
        const title = row.querySelector(".title")?.textContent?.trim() || "";
        const completion =
          row.querySelector(".progress-bar span")?.textContent?.trim() || "";
        const platform =
          row
            .querySelector(".platforms .platform:first-of-type")
            ?.textContent?.trim() || "";
        const platinum =
          row.querySelector(".platinum")?.classList.contains("earned") || false;
        const image =
          (row.querySelector(".game img") as HTMLImageElement)?.src || "";
        const stringDate =
          row
            .querySelector(".small-info:nth-of-type(3)")
            ?.textContent?.trim()
            ?.split("\n")[0] || "";

        // Clean and parse the date
        const cleanDateStr = stringDate.replace(/(\d+)(st|nd|rd|th)/, "$1");
        const parsedDate = new Date(cleanDateStr);
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const day = String(parsedDate.getDate()).padStart(2, "0");
        const date = `${year}-${month}-${day}T00:00:00.000Z`;

        return {
          title,
          completion,
          platform,
          platinum,
          image,
          date,
        };
      });
    });

    await browser.close();

    for (const game of games) {
      await xata.db.Games.create(game);
    }

    res.status(200).json({
      games,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: `Unable to find games`,
    });
  }
};

export default games;
