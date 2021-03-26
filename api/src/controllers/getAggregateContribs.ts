import { spinnies } from "..";
import UserModel from "../data/models/UserModel";
import { aggregate } from "../helpers/aggregate";
import { ContribDataInt } from "../interfaces/ContribDataInt";
import { AggregateDataInt } from "../interfaces/UserDataInt";

export const getAggregateContribs = async (
  contribData: ContribDataInt
): Promise<AggregateDataInt> => {
  spinnies.add("aggregate", { color: "cyan", text: "Aggregating data..." });
  const data: AggregateDataInt = {
    data: [],
    updated: contribData.updated_on.toString(),
  };

  const { crowdin, forum, news, github } = contribData;

  const users = await UserModel.find();

  users.forEach((user) => {
    const userCrowdin = crowdin.find((el) => el.username === user.crowdin);
    const userForum = forum.find((el) => el.username === user.forum);
    const userNews = news.find((el) => el.username === user.news);
    const userGithub = github.find((el) => el.username === user.github);
    const userAggregate = aggregate(
      userCrowdin?.translations || 0,
      userForum?.likes || 0,
      userGithub?.commits || 0,
      userNews?.posts || 0
    );

    data.data.push({
      username: user.username,
      aggregate: userAggregate,
      avatar: user.avatar,
      crowdin: {
        words: userCrowdin?.translations || 0,
      },
      forum: {
        likes: userForum?.likes || 0,
      },
      github: {
        commits: userGithub?.commits || 0,
      },
      news: {
        posts: userNews?.posts || 0,
      },
    });
  });

  spinnies.succeed("aggregate", {
    color: "green",
    text: "Aggregation complete!",
  });
  return data;
};
