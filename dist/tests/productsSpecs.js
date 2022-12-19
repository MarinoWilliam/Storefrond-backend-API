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
describe("product Model", () => {
    it('should have an index method', () => {
        expect(product.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(product.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(product.create).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await product.create({
            title: "test product",
            price: 10
        });
        expect(result).toEqual({
            id: 1,
            title: "test product",
            price: 10
        });
    });
    it('index method should return a list of products', async () => {
        const result = await product.index();
        expect(result).toEqual([{
                id: 1,
                title: "test product",
                price: 10
            }]);
    });
    it('show method should return the correct product', async () => {
        const result = await product.show("1");
        expect(result).toEqual({
            id: 1,
            title: "test product",
            price: 10
        });
    });
});
