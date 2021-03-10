import { CrowdinContribsInt } from "./crowdin/CrowdinContribsInt";
import { ForumContribInt } from "./forum/ForumContribInt";

export interface ContribDataInt {
  crowdin: CrowdinContribsInt[];
  forum: ForumContribInt[];
  github?: unknown;
  news?: unknown;
}
