import { CrowdinContribsInt } from "../interfaces/crowdin/CrowdinContribsInt";
import { ForumContribInt } from "../interfaces/forum/ForumContribInt";
import { GithubContribInt } from "../interfaces/github/GithubContribInt";
import { NewsContribInt } from "../interfaces/news/NewsContribInt";

export const testCrowdinData: CrowdinContribsInt[] = [
  {
    name: "Nicholas Carrigan",
    username: "nhcarrigan",
    languages: ["English"],
    translations: 1,
    avatar:
      "https://production-enterprise-static.downloads.crowdin.com/avatar/232/medium/6ac64de32f21629b968e8a3a55d76a69.jpg",
  },
];

export const testForumData: ForumContribInt[] = [
  {
    username: "nhcarrigan",
    name: "Nicholas Carrigan",
    likes: 20,
    topics: 10,
    replies: 50,
    avatar:
      "https://sjc1.discourse-cdn.com/freecodecamp/user_avatar/forum.freecodecamp.org/nhcarrigan/240/185808_2.png",
    url: "https://forum.freecodecamp.org/u/nhcarrigan",
  },
];

export const testGithubData: GithubContribInt[] = [
  {
    username: "nhcarrigan",
    name: "Nicholas Carrigan",
    commits: 39,
    issues: 3,
    pulls: 1,
    avatar: "https://avatars.githubusercontent.com/u/63889819?v=4",
    url: "https://github.com/nhcarrigan",
  },
];

export const testNewsData: NewsContribInt[] = [
  {
    name: "Nicholas Carrigan",
    username: "nhcarrigan",
    url: "https://www.freecodecamp.org/news/author/nhcarrigan/",
    avatar:
      "https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg",
    posts: 3,
  },
];
