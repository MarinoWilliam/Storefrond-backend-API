"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const user_1 = require("../models/user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const user = new user_1.userClass();
const order = new order_1.orderClass();
const request = (0, supertest_1.default)(server_1.default);
describe("Order Model", () => {
    it('should have a show method', () => {
        expect(order.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('create method should add an order', async () => {
        const User = await user.create({
            firstName: "what",
            lastName: "a name",
            password: "ps"
        });
        const result = await order.create({
            quantity: 5,
            userid: User.id,
            orderstate: "open"
        });
        expect(result).toEqual({
            id: 1,
            quantity: 5,
            userid: 1,
            orderstate: "open"
        });
    });
    it('show method should return the correct order', async () => {
        const result = await order.show("1");
        expect(result).toEqual({
            id: 1,
            quantity: 5,
            userid: 1,
            orderstate: "open"
        });
    });
});
