import { CrowdinContribsInt } from "./crowdin/CrowdinContribsInt";
import { ForumContribInt } from "./forum/ForumContribInt";
import { GithubContribInt } from "./github/GithubContribInt";
import { NewsContribInt } from "./news/NewsContribInt";

export interface ContribDataInt {
  crowdin: CrowdinContribsInt[];
  forum: ForumContribInt[];
  github: GithubContribInt[];
  news: NewsContribInt[];
}
