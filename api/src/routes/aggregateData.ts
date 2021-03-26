import { Request, Response } from "express";
import { AggregateDataInt } from "../interfaces/UserDataInt";
import { errorHandler } from "../utils/errorHandler";

export const getAggregateData = async (
  _: Request,
  res: Response,
  aggregateData: AggregateDataInt[]
): Promise<void> => {
  try {
    res.status(200).json(aggregateData);
  } catch (error) {
    errorHandler("aggregate data route", error);
  }
};
