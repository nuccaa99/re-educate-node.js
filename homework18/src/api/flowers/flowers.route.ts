import { Router, Request, Response, NextFunction } from "express";
import {
  createFlower,
  deleteFlowerById,
  getAllFlowers,
  getFlowerById,
  updateFlowerById,
} from "./flowers.service";

const flowersRouter: Router = Router();

flowersRouter.get("/", (req: Request, res: Response) =>
  getAllFlowers(req, res)
);
flowersRouter.post("/", (req: Request, res: Response) =>
  createFlower(req, res)
);
flowersRouter.get("/:id", (req: Request, res: Response) =>
  getFlowerById(req, res)
);
flowersRouter.put("/:id", (req: Request, res: Response) =>
  updateFlowerById(req, res)
);
flowersRouter.delete("/:id", (req: Request, res: Response) =>
  deleteFlowerById(req, res)
);

export default flowersRouter;
