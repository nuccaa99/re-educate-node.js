import { Request, Response, NextFunction } from "express";

export const isValid = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const apiKey = req.headers["api-key"];
  if (!apiKey || apiKey !== "99999") {
    res.status(401).json({ error: "API key not correct" });
    return;
  }

  next();
};
