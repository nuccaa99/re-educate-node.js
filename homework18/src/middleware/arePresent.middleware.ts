import { Request, Response, NextFunction } from 'express';

export const arePresent = (req: Request, res: Response, next: NextFunction): void => {
  const { category, price, importance } = req.body;

  if (!price || !category || !importance) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  next();
};