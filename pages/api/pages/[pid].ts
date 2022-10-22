// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";

const notionSecret = process.env.NOTION_KEY;

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
  if (!notionSecret) {
    throw Error("Must define NOTION_SECRET in env");
  }
  const {
    query: { pid },
  } = req;

  if (!pid || typeof pid !== "string") {
    throw Error();
  }
  const query = await notion.blocks.children.list({
    block_id: pid,
  });

  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(query));
}
