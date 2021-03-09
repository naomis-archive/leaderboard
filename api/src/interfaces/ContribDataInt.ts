import { TotalContribsInt } from "./crowdin/TotalContribsInt";

export interface ContribDataInt {
  crowdin: TotalContribsInt[];
  forum?: unknown;
  github?: unknown;
  news?: unknown;
}
