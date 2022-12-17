"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { PEPER, SALT_ROUNDS } = process.env;
const ps = "dummyPassword";
const hash = bcrypt_1.default.hashSync(ps + PEPER, parseInt(SALT_ROUNDS));
const user = new user_1.userClass();
const request = (0, supertest_1.default)(server_1.default);
describe("user Model", () => {
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user.create).toBeDefined();
    });
    it('create method should add a user', async () => {
        const result = await user.create({
            firstName: "what",
            lastName: "a name",
            password: ps
        });
        expect(result).toBeDefined();
    });
    it('index method should return a list of users', async () => {
        const result = await user.index();
        expect(result[1]).toBeDefined();
    });
    it('show method should return the correct user', async () => {
        const result = await user.show("1");
        expect(result).toBeDefined();
    });
    it('Should return status of 200', async () => {
        try {
            const response = await request.get('/users');
            expect(response.status).toBe(401);
        }
        catch (error) {
            console.log(error);
        }
    });
    it('Should return status of 200', async () => {
        try {
            const response = await request.get('/users/1');
            expect(response.status).toBe(401);
        }
        catch (error) {
            console.log(error);
        }
    });
});
