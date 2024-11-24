import { Router } from "express";
import { fiftyFifty } from "../../middleware/fiftyFifty.middleware.js";

const randomRouter = Router();

randomRouter.get("/", fiftyFifty, (req, res) => {
  res.send("lucky");
});

export default randomRouter;
