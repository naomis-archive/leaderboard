import { Request, Response } from "express";
import UserModel from "../data/models/UserModel";
import { UserDataInt } from "../interfaces/UserDataInt";
import { errorHandler } from "../utils/errorHandler";
import sanitize from "mongo-sanitize";
import sanitizeHtml from "sanitize-html";

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
  res: Response
): Promise<void> => {
  try {
    const userData: UserDataInt = req.body;

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

    res.status(200).json(targetUser);
  } catch (error) {
    errorHandler("post user data", error);
    res.json(error);
  }
};
