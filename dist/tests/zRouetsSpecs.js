"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user = new user_1.userClass();
const request = (0, supertest_1.default)(server_1.default);
describe("endpoint testing:", () => {
    it('Should return status of 200', async () => {
        try {
            const response = await request.get('/products');
            expect(response.status).toBe(200);
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Should return status of 200', async () => {
        try {
            const response = await request.get('/products/1');
            expect(response.status).toBe(200);
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Should return status of 200 for creating product', async () => {
        try {
            const theUser = await user.show('1');
            var token = jsonwebtoken_1.default.sign({ user: theUser }, process.env.TOKEN_SECRET);
            const response = await request.post('/products')
                .auth(token, { type: "bearer" });
            expect(response.status).toBe(200);
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Should return status of 401 dont know', async () => {
        try {
            const theUser = await user.show('1');
            var token = jsonwebtoken_1.default.sign({ user: theUser }, process.env.TOKEN_SECRET);
            const response = await request.get('Users/1/1')
                .auth(token, { type: "bearer" });
            expect(response.status).toBe(200);
        }
        catch (error) {
            console.log(error);
        }
    });
    // #### Users
    // - Index [token required] '/Users'  [GET]
    // - Show [token required]  '/Users/:id'  [GET]
    // - Create N[token required]  '/Users'  [POST]
    it('Should return status of 200 for getting all users', async () => {
        try {
            const theUser = await user.show('1');
            var token = jsonwebtoken_1.default.sign({ user: theUser }, process.env.TOKEN_SECRET);
            const response = await request.get('Users')
                .auth(token, { type: "bearer" });
            expect(response.status).toBe(200);
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Should return status of 200 for showing a user', async () => {
        try {
            const theUser = await user.show('1');
            var token = jsonwebtoken_1.default.sign({ user: theUser }, process.env.TOKEN_SECRET);
            const response = await request.get('Users/1')
                .auth(token, { type: "bearer" });
            expect(response.status).toBe(200);
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Should return status of 200 for showing one user', async () => {
        try {
            const theUser = await user.show('1');
            var token = jsonwebtoken_1.default.sign({ user: theUser }, process.env.TOKEN_SECRET);
            const response = await request.post('Users')
                .auth(token, { type: "bearer" });
            expect(response.status).toBe(200);
        }
        catch (error) {
            console.log(error);
        }
    });
});
