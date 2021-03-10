import { CrowdinContribsInt } from "../interfaces/crowdin/CrowdinContribsInt";
import { ForumContribInt } from "../interfaces/forum/ForumContribInt";

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
