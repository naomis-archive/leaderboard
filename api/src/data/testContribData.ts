import { CrowdinContribsInt } from "../interfaces/crowdin/CrowdinContribsInt";
import { ForumContribInt } from "../interfaces/forum/ForumContribInt";
import { GithubContribInt } from "../interfaces/github/GithubContribInt";
import { NewsContribInt } from "../interfaces/news/NewsContribInt";

export const testCrowdinData: CrowdinContribsInt[] = [
  {
    name: "Nicholas Carrigan",
    languages: ["English"],
    translations: 1,
  },
];

export const testForumData: ForumContribInt[] = [
  {
    username: "nhcarrigan",
    name: "Nicholas Carrigan",
    likes: 20,
    liked: 5,
  },
];

export const testGithubData: GithubContribInt[] = [
  {
    username: "nhcarrigan",
    name: "Nicholas Carrigan",
    commits: 39,
  },
];

export const testNewsData: NewsContribInt[] = [
  {
    name: "Nicholas Carrigan",
    url: "https://www.freecodecamp.org/news/author/nhcarrigan/",
    avatar:
      "https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg",
    posts: 3,
  },
];
