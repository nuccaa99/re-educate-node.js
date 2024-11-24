import express from "express";
const app = express();
import expensesRouter from "./api/expenses/expenses.route.js";
import randomRouter from "./api/random/random.route.js";
import bodyParser from "body-parser";
import cors from "cors";

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/expenses", expensesRouter);
app.use("/random", randomRouter);
app.use(express.static("public"));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 1) ejs ის დახმარებით გამოიტანეთ(გამოაჩინეთ დომში) იქსფენსების ლისი
// 2) შექმნით ახალი იქსფენსის დამატება დომში.
// 3) დაამატეთ წაშლის ფუნქციონალი ესეც დომში.
// 4) დაამატეთ განახლების ფუნცქიონალი შეგიძლია როგორც შექმნის ფეიჯი იქნება მსგავსი გაკეთოთ და იქ როცა გადავა და შეავსებს(დააფდეითებს) ინფოს მერე დააფდეითდეს.
// 5) თითეულ იქსფენსს უნდა ჰქონდეს ბათონი ან ლინკი რომლის მეშვეობითაც შევძლებ გადავიდე ამ იქსფენსის დეტალებში.

// უნდა გამოიყენოთ შემდეგი ტექნოლოგიები:  express, ejs, fs module.
