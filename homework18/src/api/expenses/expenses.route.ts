import { Router, Request, Response, NextFunction } from "express";
import {
  addExpense,
  createExpense,
  deleteExpenseById,
  editExpense,
  expenseDetails,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
} from "./expenses.service";
import { isValid } from "../../middleware/isValid.middleware";
import { arePresent } from "../../middleware/arePresent.middleware";

const expensesRouter: Router = Router();

expensesRouter.get("/", (req: Request, res: Response) =>
  getAllExpenses(req, res)
);

expensesRouter.get("/expense/:id", (req: Request, res: Response) =>
  expenseDetails(req, res)
);

expensesRouter.get("/add", (req: Request, res: Response) =>
  addExpense(req, res)
);

expensesRouter.get("/edit/:id", (req: Request, res: Response) =>
  editExpense(req, res)
);

expensesRouter.post("/", arePresent, (req: Request, res: Response) =>
  createExpense(req, res)
);

expensesRouter.get("/:id", (req: Request, res: Response) =>
  getExpenseById(req, res)
);

expensesRouter.put("/:id", (req: Request, res: Response) =>
  updateExpenseById(req, res)
);

expensesRouter.delete("/:id", isValid, (req: Request, res: Response) =>
  deleteExpenseById(req, res)
);

export default expensesRouter;
