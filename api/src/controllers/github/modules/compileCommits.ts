import { githubStaffList } from "../../../config/staffList";
import { GithubContribInt } from "../../../interfaces/github/GithubContribInt";
import { RawCommitInt } from "../../../interfaces/github/RawCommitInt";
import { errorHandler } from "../../../utils/errorHandler";

export const compileCommits = async (
  commits: RawCommitInt[]
): Promise<GithubContribInt[]> => {
  try {
    const totals: GithubContribInt[] = [];

    for (const commit of commits) {
      if (githubStaffList.includes(commit.author.login)) {
        continue;
      }
      const exists = totals.find((el) => el.username === commit.author.login);

      if (exists) {
        exists.commits++;
        continue;
      }

      const contrib: GithubContribInt = {
        username: commit.author.login,
        name: commit.commit.author.name,
        commits: 1,
        avatar: commit.author.avatar_url,
        url: commit.author.html_url,
      };

      totals.push(contrib);
    }

    return totals
      .sort((a, b) => b.commits - a.commits)
      .filter(
        (el) => el.username !== "dependabot[bot]" && el.username !== "camperbot"
      );
  } catch (error) {
    errorHandler("GitHub: Compile Commits", error);
    process.exit(1);
  }
};
