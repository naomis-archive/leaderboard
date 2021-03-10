import { spinnies } from "../..";
import { GithubContribInt } from "../../interfaces/github/GithubContribInt";
import { compileCommits } from "./modules/compileCommits";
import { getCommits } from "./modules/getCommits";

export const getGithubContribs = async (): Promise<GithubContribInt[]> => {
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

  return compiledCommits;
};