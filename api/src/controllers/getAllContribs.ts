import { spinnies } from "..";
import { ContribDataInt } from "../interfaces/ContribDataInt";
import { getCrowdinContribs } from "./crowdin/getCrowdinContribs";
import { getForumContribs } from "./forum/getForumContribs";

export const getAllContribs = async (): Promise<ContribDataInt> => {
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

  const contribData: ContribDataInt = {
    crowdin: crowdinData,
    forum: forumData,
  };

  return contribData;
};
