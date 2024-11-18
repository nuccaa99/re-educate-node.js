export const fiftyFifty = (req, res, next) => {
  const randNum = Math.random();
  if (randNum > 0.5) {
    return res.status(401).json({ error: 'unsuccessful' });
  } else {
    next();
  }
};
