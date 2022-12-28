"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const order = new order_1.orderClass();
const show = async (req, res) => {
    try {
        const theOrder = await order.show(req.params.id);
        res.json(theOrder);
    }
    catch (error) {
        res.status(404);
    }
};
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
const ordersRoutes = (app) => {
    app.get('/Users/:id/currentOrder', verifyAuthToken, show);
};
exports.default = ordersRoutes;
