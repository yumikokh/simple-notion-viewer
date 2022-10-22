import { Client } from "@notionhq/client";
import axios from "axios";

export const useNotion = () => {
  async function queryDatabase() {
    try {
      const response = await axios({
        method: "get",
        url: `/api/database`,
      });
      return response.data;
    } catch (error: any) {
      console.error(error.body);
    }
  }

  return {
    queryDatabase,
  };
};
