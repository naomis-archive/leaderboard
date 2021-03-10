import { CrowdinContribsInt } from "./crowdin/CrowdinContribsInt";
import { ForumContribInt } from "./forum/ForumContribInt";
import { GithubContribInt } from "./github/GithubContribInt";

export interface ContribDataInt {
  crowdin: CrowdinContribsInt[];
  forum: ForumContribInt[];
  github: GithubContribInt[];
  news?: unknown;
}
