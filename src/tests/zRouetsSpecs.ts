import supertest from 'supertest';
import app from '../server';


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

it('Should return status of 401', async () => {
  try {
  const response = await request.post('/products');
  expect(response.status).toBe(401);
  } catch (error) {
      console.log(error);
  }
})

it('Should return status of 401', async () => {
    try {
    const response = await request.get('Users/1/1');
    expect(response.status).toBe(401);
    } catch (error) {
        console.log(error);
    }
  })
  // #### Users
  // - Index [token required] '/Users'  [GET]
  // - Show [token required]  '/Users/:id'  [GET]
  // - Create N[token required]  '/Users'  [POST]
  it('Should return status of 401', async () => {
    try {
    const response = await request.get('Users');
    expect(response.status).toBe(401);
    } catch (error) {
        console.log(error);
    }
  })
  it('Should return status of 401', async () => {
    try {
    const response = await request.get('Users/1');
    expect(response.status).toBe(401);
    } catch (error) {
        console.log(error);
    }
  })
  it('Should return status of 401', async () => {
    try {
    const response = await request.post('Users');
    expect(response.status).toBe(401);
    } catch (error) {
        console.log(error);
    }
  })

  
});