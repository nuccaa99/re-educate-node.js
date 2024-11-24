import { Router } from 'express';
import {
  addExpense,
  createExpense,
  deleteExpenseById,
  editExpense,
  expenseDetails,
  getAllExpenses,
  getExpenseById,
  updateExpenseById,
} from './expenses.service.js';
import { isValid } from '../../middleware/isValid.middleware.js';
import { arePresent } from '../../middleware/arePresent.middleware.js';
const expensesRouter = Router();

expensesRouter.get('/', getAllExpenses);

expensesRouter.get('/expense/:id', expenseDetails);

expensesRouter.get('/add', addExpense);

expensesRouter.get('/edit/:id', editExpense);

expensesRouter.post('/', arePresent, createExpense);

expensesRouter.get('/:id', getExpenseById);

expensesRouter.put('/:id', updateExpenseById);

expensesRouter.delete('/:id', isValid, deleteExpenseById);

export default expensesRouter;
