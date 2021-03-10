import { Request, Response } from "express";

export const FourOhFour = (req: Request, res: Response): void => {
  res.status(404).json({ error: "Route not found." });
};
