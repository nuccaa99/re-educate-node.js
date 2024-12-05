import { Request, Response, NextFunction } from "express";

export const fiftyFifty = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const randNum = Math.random();
  if (randNum > 0.5) {
    res.status(401).json({ error: "not lucky" });
    return;
  }

  next();
};
