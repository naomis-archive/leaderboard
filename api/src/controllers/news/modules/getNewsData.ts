import GhostContentAPI, {
  GhostContentAPIOptions,
  PostsOrPages,
} from "@tryghost/content-api";
import { errorHandler } from "../../../utils/errorHandler";
import { logHandler } from "../../../utils/logHandler";

export const getNewsData = async (): Promise<PostsOrPages> => {
  try {
    const apiKey = process.env.GHOST_CONTENT_API_KEY;

    if (!apiKey) {
      logHandler.warn("Missing Ghost API key");
      process.exit(1);
    }

    const options: GhostContentAPIOptions = {
      url: "https://freecodecamp.org/news",
      key: apiKey,
      version: "v3",
    };

    const ghostAPI = new GhostContentAPI(options);

    const lastWeek = new Date(Date.now() - 604800000).toISOString();

    const postData = await ghostAPI.posts.browse({
      filter: `published_at:>${lastWeek}`,
      include: "authors",
    });

    return postData;
  } catch (error) {
    errorHandler("News: Get News Data", error);
    process.exit(1);
  }
};
