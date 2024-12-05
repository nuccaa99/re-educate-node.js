"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db/db");
const expenses_route_1 = __importDefault(require("./api/expenses/expenses.route"));
const random_route_1 = __importDefault(require("./api/random/random.route"));
const flowers_route_1 = __importDefault(require("./api/flowers/flowers.route"));
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("/expenses", expenses_route_1.default);
app.use("/random", random_route_1.default);
app.use("/flowers", flowers_route_1.default);
const PORT = 3000;
(0, db_1.connectionToDb)();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
