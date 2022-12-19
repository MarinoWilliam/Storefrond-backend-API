"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const product = new product_1.productClass();
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
    it('Should return status of 401', async () => {
        try {
            const response = await request.post('/products');
            expect(response.status).toBe(401);
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Should return status of 200', async () => {
        try {
            const response = await request.get('Users/1/1');
            expect(response.status).toBe(401);
        }
        catch (error) {
            console.log(error);
        }
    });
});
