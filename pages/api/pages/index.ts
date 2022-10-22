// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

const notionSecret = process.env.NOTION_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

export type PageItem = {
  title: string;
  date: string;
  id: string;
  url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PageItem[]>
) {
  if (!databaseId || !notionSecret) {
    throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
  }
  // res.setHeader("Access-Control-Allow-Origin", "*");

  const query = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const list: PageItem[] = query.results.map((result) => {
    if (!("properties" in result)) {
      throw Error();
    }

    const titleProp = result.properties["Title"];
    const dateProp = result.properties["Date"];

    const isTitle = titleProp.type === "title";
    const isDate = dateProp.type === "date";

    if (!isTitle || !isDate) {
      throw Error();
    }

    const title = titleProp.title[0]?.plain_text || "";
    const date = dateProp.date?.start || "";
    const { id, url } = result;

    return {
      title,
      date,
      id,
      url,
    };
  });
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(list));
}
