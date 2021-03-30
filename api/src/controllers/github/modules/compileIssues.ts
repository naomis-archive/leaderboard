import { GithubContribInt } from "../../../interfaces/github/GithubContribInt";
import { RawIssueInt } from "../../../interfaces/github/RawIssueInt";

export const compileIssues = async (
  issueData: RawIssueInt[],
  contribData: GithubContribInt[]
): Promise<GithubContribInt[]> => {
  for (const issue of issueData) {
    const existingData = contribData.find(
      (el) => el.username === issue.user.login
    );

    if (existingData) {
      if (issue.pull_request) {
        existingData.pulls++;
        continue;
      }
      existingData.issues++;
      continue;
    }

    const newContributor = {
      username: issue.user.login,
      name: "undefined",
      commits: 1,
      issues: 0,
      pulls: 0,
      avatar: issue.user.avatar_url,
      url: issue.user.html_url,
    };

    contribData.push(newContributor);
  }

  return contribData;
};
