import express from 'express';
const app = express();
import expensesRouter from './api/expenses/expenses.route.js';
import randomRouter from './api/random/random.route.js';

app.use(express.json());
app.use('/expenses', expensesRouter);
app.use('/random', randomRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
