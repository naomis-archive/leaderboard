import { CrowdinContribsInt } from "../interfaces/crowdin/CrowdinContribsInt";
import { ForumContribInt } from "../interfaces/forum/ForumContribInt";
import { GithubContribInt } from "../interfaces/github/GithubContribInt";
import { NewsContribInt } from "../interfaces/news/NewsContribInt";

export const aggregate = (
  crowdin: CrowdinContribsInt | undefined,
  forum: ForumContribInt | undefined,
  github: GithubContribInt | undefined,
  news: NewsContribInt | undefined
): number => {
  let aggregate = 0;

  // one point for every 100 words translated?
  const crowdinWordScore = Math.floor((crowdin?.translations || 0) / 100);
  aggregate += crowdinWordScore;

  // one point for every 10 likes?
  const forumLikesScore = Math.floor((forum?.likes || 0) / 10);
  aggregate += forumLikesScore;

  // five points for every active issue?
  const gitHubIssueScore = (github?.issues || 0) * 5;
  aggregate += gitHubIssueScore;

  // ten points for every active PR?
  const gitHubPRScore = (github?.pulls || 0) * 10;
  aggregate += gitHubPRScore;

  // twenty points for every commit?
  const githubCommitScore = (github?.commits || 0) * 20;
  aggregate += githubCommitScore;

  // one hundred points for each article?
  const newsPostsScore = (news?.posts || 0) * 100;
  aggregate += newsPostsScore;

  return aggregate;
};
