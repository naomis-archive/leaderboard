import { spinnies } from "../..";
import { ForumContribInt } from "../../interfaces/forum/ForumContribInt";
import { errorHandler } from "../../utils/errorHandler";
import { compileForumData } from "./modules/compileForumData";
import { getForumData } from "./modules/getForumData";

export const getForumContribs = async (): Promise<ForumContribInt[]> => {
  try {
    spinnies.add("forum-data", {
      color: "cyan",
      text: "Getting forum data...",
    });

    const forumContribs = await getForumData();

    spinnies.succeed("forum-data", {
      color: "green",
      text: "Got forum data.",
    });

    spinnies.add("forum-data-compile", {
      color: "blue",
      text: "Mapping forum data...",
    });

    const parsedForumContribs = await compileForumData(forumContribs);

    spinnies.succeed("forum-data-compile", {
      color: "green",
      text: "Mapped forum data.",
    });

    return parsedForumContribs;
  } catch (error) {
    errorHandler("Forum: Get Contribs", error);
    process.exit(1);
  }
};
