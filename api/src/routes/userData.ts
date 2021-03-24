import { Request, Response } from "express";
import UserModel from "../data/models/UserModel";

export const getUserData = async (_: Request, res: Response): Promise<void> => {
  const data = await UserModel.find();
  res.status(200).json(data);
};

export const postUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  res.send("this is where user data is created");
};
