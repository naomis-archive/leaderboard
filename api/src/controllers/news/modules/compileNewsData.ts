import { PostsOrPages } from "@tryghost/content-api";
import { newsStaffList } from "../../../config/staffList";
import { NewsContribInt } from "../../../interfaces/news/NewsContribInt";

export const compileNewsData = async (
  data: PostsOrPages
): Promise<NewsContribInt[]> => {
  const totalData: NewsContribInt[] = [];

  for (const post of data) {
    if (!post.primary_author || !post.primary_author.name) {
      continue;
    }
    if (newsStaffList.includes(post.primary_author?.slug)) {
      continue;
    }
    const name = post.primary_author.name;
    const url = post.primary_author.url || "https://freecodecamp.org/news";
    const avatar = post.primary_author.profile_image || "";
    const username = post.primary_author.slug;
    const exists = totalData.find((el) => el.name === name);

    if (exists) {
      exists.posts++;
      continue;
    }

    totalData.push({ name, username, url, avatar, posts: 1 });
  }

  return totalData;
};
