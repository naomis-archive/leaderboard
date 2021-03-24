import { Request, Response } from "express";
import { errorHandler } from "../utils/errorHandler";

export const FourOhFour = (req: Request, res: Response): void => {
  try {
    res.status(404).json({ error: "Route not found." });
  } catch (error) {
    errorHandler("Route: 404", error);
  }
};
