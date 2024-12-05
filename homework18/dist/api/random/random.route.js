"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fiftyFifty_middleware_1 = require("../../middleware/fiftyFifty.middleware");
const randomRouter = (0, express_1.Router)();
randomRouter.get("/", fiftyFifty_middleware_1.fiftyFifty, (req, res) => {
    res.send("lucky");
});
exports.default = randomRouter;
