import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectionToDb } from "./db/db.js";
import expensesRouter from "./api/expenses/expenses.route.js";
import randomRouter from "./api/random/random.route.js";
import flowersRouter from "./api/flowers/flowers.route.js";

const app: Application = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/expenses", expensesRouter);
app.use("/random", randomRouter);
app.use("/flowers", flowersRouter);

connectionToDb();

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
