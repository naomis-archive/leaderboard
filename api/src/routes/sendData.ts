import { Request, Response } from "express";
import { ContribDataInt } from "../interfaces/ContribDataInt";

export const sendData = (
  _: Request,
  res: Response,
  data: ContribDataInt
): void => {
  res.status(200).json(data);
};
