export const arePresent = (req, res, next) => {
  const { category, price, importance } = req.body;

  if (!price || !category || !importance) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  next();
};
