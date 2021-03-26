import { Request, Response } from "express";
import UserModel from "../data/models/UserModel";
import { ContribDataInt } from "../interfaces/ContribDataInt";
import { AggregateDataInt } from "../interfaces/UserDataInt";
import { aggregate } from "../helpers/aggregate";

export const getAggregateData = async (
  _: Request,
  res: Response,
  contribData: ContribDataInt
): Promise<void> => {
  const data: AggregateDataInt[] = [];

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

    data.push({
      username: user.username,
      aggregate: userAggregate,
      avatar: user.avatar,
    });
  });

  res.status(200).json(data);
};
