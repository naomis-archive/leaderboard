import chalk from "chalk";
import { spinnies } from "..";
import {
  testCrowdinData,
  testForumData,
  testGithubData,
  testNewsData,
} from "../data/testContribData";
import { ContribDataInt } from "../interfaces/ContribDataInt";
import { getCrowdinContribs } from "./crowdin/getCrowdinContribs";
import { getForumContribs } from "./forum/getForumContribs";
import { getGithubContribs } from "./github/getGithubContribs";
import { getNewsContribs } from "./news/getNewsContribs";

export const getAllContribs = async (): Promise<ContribDataInt> => {
  // Generate test data in development environment
  if (process.env.NODE_ENV === "development") {
    console.log(chalk.cyan("Development mode detected. Loading test data."));
    const testContribData: ContribDataInt = {
      crowdin: testCrowdinData,
      forum: testForumData,
      github: testGithubData,
      news: testNewsData,
    };

    return testContribData;
  }

  spinnies.add("get-crowdin", {
    color: "cyan",
    text: "Getting crowdin contributions...",
  });
  const crowdinData = await getCrowdinContribs();
  spinnies.succeed("get-crowdin", {
    color: "green",
    text: "Got crowdin contributions!",
  });

  spinnies.add("get-forum", {
    color: "cyan",
    text: "Getting forum data...",
  });
  const forumData = await getForumContribs();
  spinnies.succeed("get-forum", {
    color: "green",
    text: "Got forum contributions!",
  });

  spinnies.add("get-github", {
    color: "cyan",
    text: "Getting github contributions...",
  });
  const githubData = await getGithubContribs();

  spinnies.succeed("get-github", {
    color: "green",
    text: "Got github contributions!",
  });

  spinnies.add("get-news", {
    color: "cyan",
    text: "Getting news contributions...",
  });

  const newsData = await getNewsContribs();

  spinnies.succeed("get-news", {
    color: "green",
    text: "Got news contributions!",
  });

  const contribData: ContribDataInt = {
    crowdin: crowdinData,
    forum: forumData,
    github: githubData,
    news: newsData,
  };

  return contribData;
};
