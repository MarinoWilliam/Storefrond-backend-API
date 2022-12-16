import { order, orderClass } from '../models/order';
import { user, userClass } from '../models/user';
import supertest from 'supertest';
import app from '../server';

const user = new userClass()
const order = new orderClass()
const request = supertest(app);

describe("Order Model", () => {
    it('should have a show method', () => {
        expect(order.show).toBeDefined();
      });
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
      });
    
      it('create method should add an order', async () => {
        const User = await user.create({
          firstName:"what",
          lastName:"a name",
          password: "ps"
        });

        const result = await order.create({
        quantity:5,
        userid:User.id as number,
        orderstate:"open"
        });
        expect(result).toEqual({
          id: 1,  
          quantity:5,
          userid:1,
          orderstate:"open"
        });
      });

      it('show method should return the correct order', async () => {
        const result = await order.show("1");
        expect(result).toEqual({
          id: 1,  
          quantity:5,
            userid:1,
            orderstate:"open"
        });
      });
 
});