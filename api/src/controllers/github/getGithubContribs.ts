import { spinnies } from "../..";
import { GithubContribInt } from "../../interfaces/github/GithubContribInt";
import { errorHandler } from "../../utils/errorHandler";
import { compileCommits } from "./modules/compileCommits";
import { compileIssues } from "./modules/compileIssues";
import { getCommits } from "./modules/getCommits";
import { getIssues } from "./modules/getIssues";

export const getGithubContribs = async (): Promise<GithubContribInt[]> => {
  try {
    spinnies.add("get-commits", {
      color: "cyan",
      text: "Fetching commit log...",
    });

    const commitLog = await getCommits();

    spinnies.succeed("get-commits", { color: "green", text: "Got commits!" });

    spinnies.add("compile-commits", {
      color: "cyan",
      text: "Compiling commit log...",
    });

    const compiledCommits = await compileCommits(commitLog);

    spinnies.succeed("compile-commits", {
      color: "cyan",
      text: "Compiled commits!",
    });

    spinnies.add("get-issues", {
      color: "cyan",
      text: "Fetching issue activity...",
    });

    const issueLog = await getIssues();

    spinnies.succeed("get-issues", {
      color: "green",
      text: "Got issues!",
    });

    spinnies.add("compile-issues", {
      color: "cyan",
      text: "Adding issues to commit data",
    });

    const compiledIssuesAndCommits = await compileIssues(
      issueLog,
      compiledCommits
    );

    return compiledIssuesAndCommits;
  } catch (error) {
    errorHandler("Github: Get Contribs", error);
    process.exit(1);
  }
};
