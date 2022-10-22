import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { readSync } from "fs";
import { FC } from "react";

const NotionBlock: FC<{ block: BlockObjectResponse }> = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return (
        <div>
          {block.paragraph.rich_text.map((rich, i) => (
            <p key={i}>{rich.plain_text}</p>
          ))}
        </div>
      );

    default:
      return <div></div>;
  }
};

export default NotionBlock;
