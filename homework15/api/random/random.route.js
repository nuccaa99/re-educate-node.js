import { Router } from 'express';
import { fiftyFifty } from '../../middlewares/fiftyFifty.middleware.js';

const randomRouter = Router();

randomRouter.get('/', fiftyFifty, (req, res) => {
  res.send('success');
});

export default randomRouter;
