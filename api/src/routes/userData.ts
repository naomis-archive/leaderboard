import { Request, Response } from "express";

export const getUserData = (_: Request, res: Response): void => {
  res.send("this is where user data goes");
};

export const postUserData = (req: Request, res: Response): void => {
  res.send("this is where user data is created");
};
