import { CrowdinContribsInt } from "../interfaces/crowdin/CrowdinContribsInt";
import { ForumContribInt } from "../interfaces/forum/ForumContribInt";
import { GithubContribInt } from "../interfaces/github/GithubContribInt";

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
