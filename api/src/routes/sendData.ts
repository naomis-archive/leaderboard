import { Request, Response } from "express";
import { ContribDataInt } from "../interfaces/ContribDataInt";
import { errorHandler } from "../utils/errorHandler";

export const sendData = (
  _: Request,
  res: Response,
  data: ContribDataInt
): void => {
  try {
    res.status(200).json(data);
  } catch (error) {
    errorHandler("Route: Send Data", error);
  }
};
