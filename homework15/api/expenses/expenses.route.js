import { Router } from 'express';
import {
  createExpense,
  deleteExpenseById,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
} from './expenses.service.js';
import { isValid } from '../../middlewares/isValid.middleware.js';
import { arePresent } from '../../middlewares/arePresent.middleware.js';
const expensesRouter = Router();

expensesRouter.get('/', getAllExpenses);

expensesRouter.post('/', arePresent, createExpense);

expensesRouter.get('/:id', getExpenseById);

expensesRouter.put('/:id', updateExpenseById);

expensesRouter.delete('/:id', isValid, deleteExpenseById);

export default expensesRouter;
