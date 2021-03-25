import { Request, Response } from "express";
import UserModel from "../data/models/UserModel";
import { UserDataInt } from "../interfaces/UserDataInt";
import { errorHandler } from "../utils/errorHandler";

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

    let targetUser = await UserModel.findOne({ username: userData.username });

    if (!targetUser) {
      targetUser = await UserModel.create({
        username: userData.newUsername || userData.username,
        avatar: userData.avatar,
        crowdin: userData.crowdin,
        forum: userData.forum,
        github: userData.github,
        news: userData.news,
      });
    } else {
      targetUser.username = userData.newUsername || userData.username;
      targetUser.avatar = userData.avatar || targetUser.avatar;
      targetUser.crowdin = userData.crowdin || targetUser.crowdin;
      targetUser.forum = userData.forum || targetUser.forum;
      targetUser.github = userData.github || targetUser.github;
      targetUser.news = userData.news || targetUser.news;
      await targetUser.save();
    }

    res.status(200).json(targetUser);
  } catch (error) {
    errorHandler("post user data", error);
    res.json(error);
  }
};
