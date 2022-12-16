"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user = new user_1.userClass();
const index = async (_req, res) => {
    const theUser = await user.index();
    res.json(theUser);
};
const show = async (req, res) => {
    const theUsers = await user.show(req.body.id);
    res.json(theUsers);
};
const create = async (req, res) => {
    try {
        const User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };
        const theUser = await user.create(User);
        var token = jsonwebtoken_1.default.sign({ user: theUser }, process.env.TOKEN_SECRET);
        res.json(token);
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
    }
};
const useraRoutes = (app) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
};
exports.default = useraRoutes;
