import { Router } from "express";
import {
  createFlower,
  deleteFlowerById,
  getAllFlowers,
  getFlowerById,
  updateFlowerById,
} from "./flowers.service.js";

const flowersRouter = Router();

flowersRouter.get("/", getAllFlowers);

flowersRouter.post("/", createFlower);

flowersRouter.get("/:id", getFlowerById);

flowersRouter.put("/:id", updateFlowerById);

flowersRouter.delete("/:id", deleteFlowerById);

export default flowersRouter;