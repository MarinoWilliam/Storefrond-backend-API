"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const product = new product_1.productClass();
const index = async (_req, res) => {
    try {
        const theProducts = await product.index();
        res.json(theProducts);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const theProduct = await product.show(req.params.id);
        res.json(theProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res) => {
    try {
        const Product = {
            title: req.body.title,
            price: req.body.price,
        };
        const theProduct = await product.create(Product);
        res.json(theProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
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
        res.json('Access denied, invalid token');
    }
};
const productsRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
};
exports.default = productsRoutes;
