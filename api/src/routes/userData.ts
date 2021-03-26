import { Request, Response } from "express";
import UserModel from "../data/models/UserModel";
import { AggregateDataInt, UserDataInt } from "../interfaces/UserDataInt";
import { errorHandler } from "../utils/errorHandler";
import sanitize from "mongo-sanitize";
import sanitizeHtml from "sanitize-html";
import { ContribDataInt } from "../interfaces/ContribDataInt";
import { aggregate } from "../helpers/aggregate";

const htmlOpts = {
  allowedTags: [],
  allowedAttributes: {},
};

export const getUserData = async (_: Request, res: Response): Promise<void> => {
  try {
    const data = await UserModel.find();
    res.status(200).json(data);
  } catch (error) {
    errorHandler("get user data", error);
    res.json(error);
  }
};

export const postUserData = async (
  req: Request,
  res: Response,
  contribData: ContribDataInt,
  aggregateData: AggregateDataInt[]
): Promise<void> => {
  try {
    const userData: UserDataInt = req.body;

    const { crowdin, forum, news, github } = contribData;

    if (!userData.username) {
      return;
    }

    let targetUser = await UserModel.findOne({
      username: sanitizeHtml(sanitize(userData.username), htmlOpts),
    });

    if (!targetUser) {
      targetUser = await UserModel.create({
        username: sanitizeHtml(
          sanitize(userData.newUsername || userData.username),
          htmlOpts
        ),
        avatar: sanitizeHtml(userData.avatar, htmlOpts),
        crowdin: sanitizeHtml(userData.crowdin, htmlOpts),
        forum: sanitizeHtml(userData.forum, htmlOpts),
        github: sanitizeHtml(userData.github, htmlOpts),
        news: sanitizeHtml(userData.news, htmlOpts),
      });
    } else {
      targetUser.username = sanitizeHtml(
        sanitize(userData.newUsername || userData.username),
        htmlOpts
      );
      targetUser.avatar = sanitizeHtml(
        userData.avatar || targetUser.avatar,
        htmlOpts
      );
      targetUser.crowdin = sanitizeHtml(
        userData.crowdin || targetUser.crowdin,
        htmlOpts
      );
      targetUser.forum = sanitizeHtml(
        userData.forum || targetUser.forum,
        htmlOpts
      );
      targetUser.github = sanitizeHtml(
        userData.github || targetUser.github,
        htmlOpts
      );
      targetUser.news = sanitizeHtml(
        userData.news || targetUser.news,
        htmlOpts
      );
      await targetUser.save();
    }

    const userCrowdin = crowdin.find(
      (el) => el.username === targetUser?.crowdin
    );
    const userForum = forum.find((el) => el.username === targetUser?.forum);
    const userNews = news.find((el) => el.username === targetUser?.news);
    const userGithub = github.find((el) => el.username === targetUser?.github);
    const userAggregate = aggregate(
      userCrowdin?.translations || 0,
      userForum?.likes || 0,
      userGithub?.commits || 0,
      userNews?.posts || 0
    );

    aggregateData.push({
      username: targetUser.username,
      aggregate: userAggregate,
      avatar: targetUser.avatar,
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

    res.status(200).json(targetUser);
  } catch (error) {
    errorHandler("post user data", error);
    res.json(error);
  }
};
