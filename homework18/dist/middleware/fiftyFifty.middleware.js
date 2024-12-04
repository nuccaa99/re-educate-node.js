"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fiftyFifty = void 0;
const fiftyFifty = (req, res, next) => {
    const randNum = Math.random();
    if (randNum > 0.5) {
        res.status(401).json({ error: "not lucky" });
    }
    next();
};
exports.fiftyFifty = fiftyFifty;
