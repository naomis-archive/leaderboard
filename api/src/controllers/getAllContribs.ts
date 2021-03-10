import { spinnies } from "..";
import { testCrowdinData, testForumData } from "../data/testContribData";
import { ContribDataInt } from "../interfaces/ContribDataInt";
import { getCrowdinContribs } from "./crowdin/getCrowdinContribs";
import { getForumContribs } from "./forum/getForumContribs";
import { getGithubContribs } from "./github/getGithubContribs";

export const getAllContribs = async (): Promise<ContribDataInt> => {
  /*
  Live Data calls here

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
  */

  // This loads test data to avoid loads of API calls during development

  spinnies.add("get-github", {
    color: "cyan",
    text: "Getting github contributions...",
  });
  const githubData = await getGithubContribs();

  spinnies.succeed("get-github", {
    color: "green",
    text: "Got github contributions!",
  });

  console.log(githubData);

  const contribData: ContribDataInt = {
    crowdin: testCrowdinData,
    forum: testForumData,
    github: githubData,
  };

  return contribData;
};
