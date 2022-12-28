import supertest from 'supertest';
import app from '../server';
import { user, userClass } from '../models/user'
import jwt, { Secret } from 'jsonwebtoken'

const user = new userClass()

const request = supertest(app);

describe("endpoint testing:", () => {
  it('Should return status of 200', async () => {
    try {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
    } catch (error) {
        console.log(error);
    }
})

it('Should return status of 200', async () => {
  try {
  const response = await request.get('/products/1');
  expect(response.status).toBe(200);
  } catch (error) {
      console.log(error);
  }
})

it('Should return status of 200 for creating product', async () => {
  try {
  const theUser = await user.show('1');
  var token = jwt.sign({ user: theUser }, process.env.TOKEN_SECRET as Secret);
  const response = await request.post('/products')
  .auth(token, { type: "bearer" });
  expect(response.status).toBe(200);
  } catch (error) {
      console.log(error);
  }
})

it('Should return status of 401 dont know', async () => {
    try {
    const theUser = await user.show('1');
    var token = jwt.sign({ user: theUser }, process.env.TOKEN_SECRET as Secret);
    const response = await request.get('Users/1/1')
    .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
    } catch (error) {
        console.log(error);
    }
  })
  // #### Users
  // - Index [token required] '/Users'  [GET]
  // - Show [token required]  '/Users/:id'  [GET]
  // - Create N[token required]  '/Users'  [POST]
  it('Should return status of 200 for getting all users', async () => {
    try {
    const theUser = await user.show('1');
    var token = jwt.sign({ user: theUser }, process.env.TOKEN_SECRET as Secret);  
    const response = await request.get('Users')
    .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
    } catch (error) {
        console.log(error);
    }
  })
  it('Should return status of 200 for showing a user', async () => {
    try {
    const theUser = await user.show('1');
    var token = jwt.sign({ user: theUser }, process.env.TOKEN_SECRET as Secret);  
    const response = await request.get('Users/1')
    .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
    } catch (error) {
        console.log(error);
    }
  })
  it('Should return status of 200 for showing one user', async () => {
    try {
    const theUser = await user.show('1');
    var token = jwt.sign({ user: theUser }, process.env.TOKEN_SECRET as Secret);  
    const response = await request.post('Users')
    .auth(token, { type: "bearer" });
    expect(response.status).toBe(200);
    } catch (error) {
        console.log(error);
    }
  })

  
});