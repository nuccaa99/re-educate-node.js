export const isValid = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  if (!apiKey || apiKey !== '99999') {
    return res.status(401).json({ error: 'API key not correct' });
  }

  next();
};
