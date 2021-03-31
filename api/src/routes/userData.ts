import { Request, Response } from "express";
import UserModel from "../data/models/UserModel";
import { AggregateDataInt, UserDataInt } from "../interfaces/UserDataInt";
import { errorHandler } from "../utils/errorHandler";
import sanitize from "mongo-sanitize";
import sanitizeHtml from "sanitize-html";
import { ContribDataInt } from "../interfaces/ContribDataInt";
import { aggregate } from "../helpers/aggregate";
import { hash, compare, genSalt } from "bcrypt";

const htmlOpts = {
  allowedTags: [],
  allowedAttributes: {},
};

export const getUserData = async (_: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: "Coming soon!" });
  } catch (error) {
    errorHandler("get user data", error);
    res.json(error);
  }
};

export const postUserData = async (
  req: Request,
  res: Response,
  contribData: ContribDataInt,
  aggregateData: AggregateDataInt
): Promise<void> => {
  try {
    const userData: UserDataInt = req.body;

    const { crowdin, forum, news, github } = contribData;

    if (!userData.username) {
      return;
    }

    if (userData.newUsername) {
      const newUsernameTaken = await UserModel.findOne({
        username: sanitizeHtml(sanitize(userData.newUsername), htmlOpts),
      });

      if (newUsernameTaken) {
        res.status(409).json({
          message: "Your new username is already taken. Please select another.",
        });
        return;
      }
    }

    let targetUser = await UserModel.findOne({
      username: sanitizeHtml(sanitize(userData.username), htmlOpts),
    });

    if (!targetUser) {
      const salt = await genSalt(10);
      const hashedPassword = await hash(userData.password, salt);
      targetUser = await UserModel.create({
        username: sanitizeHtml(
          sanitize(userData.newUsername || userData.username),
          htmlOpts
        ),
        password: hashedPassword,
        avatar: sanitizeHtml(userData.avatar, htmlOpts),
        crowdin: sanitizeHtml(userData.crowdin, htmlOpts),
        forum: sanitizeHtml(userData.forum, htmlOpts),
        github: sanitizeHtml(userData.github, htmlOpts),
        news: sanitizeHtml(userData.news, htmlOpts),
      });
    } else {
      const comparePasswords = await compare(
        userData.password,
        targetUser.password
      );
      if (!comparePasswords) {
        res
          .status(401)
          .json({ message: "Incorrect password. Please try again." });
        return;
      }
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
      userCrowdin,
      userForum,
      userGithub,
      userNews
    );

    const updatedUser = {
      username: targetUser.username,
      aggregate: userAggregate,
      avatar: targetUser.avatar,
      crowdin: {
        words: userCrowdin?.translations || 0,
      },
      forum: {
        likes: userForum?.likes || 0,
        replies: userForum?.replies || 0,
        topics: userForum?.topics || 0,
      },
      github: {
        commits: userGithub?.commits || 0,
        issues: userGithub?.issues || 0,
        pulls: userGithub?.pulls || 0,
      },
      news: {
        posts: userNews?.posts || 0,
      },
    };

    // Need to use the *old* username to query the cached aggregation records.
    const targetIndex = aggregateData.data.findIndex(
      (el) => el.username === userData.username
    );

    if (targetIndex !== -1) {
      aggregateData.data[targetIndex] = updatedUser;
    } else {
      aggregateData.data.push(updatedUser);
    }
    res.status(200).json(targetUser);
  } catch (error) {
    errorHandler("post user data", error);
    res.json(error);
  }
};
