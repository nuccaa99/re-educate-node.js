import { Router, Request, Response, NextFunction } from "express";
import { fiftyFifty } from "../../middleware/fiftyFifty.middleware";

const randomRouter: Router = Router();

randomRouter.get("/", fiftyFifty, (req: Request, res: Response) => {
  res.send("lucky");
});

export default randomRouter;
