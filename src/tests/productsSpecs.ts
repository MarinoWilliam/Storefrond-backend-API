import { product, productClass } from '../models/product';
import supertest from 'supertest';
import app from '../server';


const product = new productClass()
const request = supertest(app);

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
      title:"test product",
      price:10
    });
    expect(result).toEqual({
      id: 1,
      title:"test product",
      price:10
    });
  });

  it('index method should return a list of products', async () => {
    const result = await product.index();
    expect(result).toEqual([{
        id: 1,
        title:"test product",
        price:10
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await product.show("1");
    expect(result).toEqual({
        id: 1,
        title:"test product",
        price:10
    });
  });

  
 
});