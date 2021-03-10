import GhostContentAPI, {
  GhostContentAPIOptions,
  PostsOrPages,
} from "@tryghost/content-api";

export const getNewsData = async (): Promise<PostsOrPages> => {
  const apiKey = process.env.GHOST_CONTENT_API_KEY;

  if (!apiKey) {
    console.error("Missing Ghost API key");
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
};
