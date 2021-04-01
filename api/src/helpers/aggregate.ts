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

  // one point for every 50 words translated?
  const crowdinWordScore = Math.floor((crowdin?.translations || 0) / 50);
  aggregate += crowdinWordScore;

  // one point for every 25 words approved?
  const crowdinApprovalScore = Math.floor((crowdin?.approvals || 0) / 25);
  aggregate += crowdinApprovalScore;

  // one point for every 100 votes cast?
  const crowdinVoteScore = Math.floor((crowdin?.votes || 0) / 100);
  aggregate += crowdinVoteScore;

  // one point for every 10 likes?
  const forumLikesScore = Math.floor((forum?.likes || 0) / 10);
  aggregate += forumLikesScore;

  // one point for every 5 replies?
  const forumRepliesScore = Math.floor((forum?.replies || 0) / 5);
  aggregate += forumRepliesScore;

  // one point for every topic?
  const forumTopicsScore = forum?.topics || 0;
  aggregate += forumTopicsScore;

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
