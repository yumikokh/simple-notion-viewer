import axios from "axios";

export const useNotion = () => {
  const queryDatabase = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/pages`,
      });
      return response.data;
    } catch (error: any) {
      console.error(error.body);
    }
  };

  const retrievePage = async (pageId: string) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/pages/${pageId}`,
      });
      return response.data;
    } catch (error: any) {
      console.error(error.body);
    }
  };

  return {
    queryDatabase,
    retrievePage,
  };
};
