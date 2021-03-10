import { PostsOrPages } from "@tryghost/content-api";
import { NewsContribInt } from "../../../interfaces/news/NewsContribInt";

export const compileNewsData = async (
  data: PostsOrPages
): Promise<NewsContribInt[]> => {
  const totalData: NewsContribInt[] = [];

  for (const post of data) {
    if (!post.primary_author || !post.primary_author.name) {
      continue;
    }
    const name = post.primary_author.name;
    const url = post.primary_author.url || "https://freecodecamp.org/news";
    const avatar = post.primary_author.profile_image || "";

    const exists = totalData.find((el) => el.name === name);

    if (exists) {
      exists.posts++;
      continue;
    }

    totalData.push({ name, url, avatar, posts: 1 });
  }

  return totalData;
};
