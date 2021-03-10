import { GithubContribInt } from "../../../interfaces/github/GithubContribInt";
import { RawCommitInt } from "../../../interfaces/github/RawCommitInt";

export const compileCommits = async (
  commits: RawCommitInt[]
): Promise<GithubContribInt[]> => {
  const totals: GithubContribInt[] = [];

  for (const commit of commits) {
    const exists = totals.find((el) => el.username === commit.author.login);

    if (exists) {
      exists.commits++;
      continue;
    }

    const contrib: GithubContribInt = {
      username: commit.author.login,
      name: commit.commit.author.name,
      commits: 1,
    };

    totals.push(contrib);
  }

  return totals
    .sort((a, b) => b.commits - a.commits)
    .filter(
      (el) => el.username !== "dependabot[bot]" && el.username !== "camperbot"
    );
};
