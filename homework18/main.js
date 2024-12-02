import express from "express";
const app = express();
import expensesRouter from "./api/expenses/expenses.route.js";
import randomRouter from "./api/random/random.route.js";
import flowersRouter from "./api/flowers/flowers.route.js"
import bodyParser from "body-parser";
import cors from "cors";
import { connectionToDb } from "./db/db.js";

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/expenses", expensesRouter);
app.use("/random", randomRouter);
app.use("/flowers", flowersRouter);
app.use(express.static("public"));

const PORT = 3000;
connectionToDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
