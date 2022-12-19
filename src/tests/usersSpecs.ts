import { user, userClass } from '../models/user';
import supertest from 'supertest';
import app from '../server';
import bcrypt from 'bcrypt'

const {
    PEPER,
    SALT_ROUNDS
  } = process.env

  const ps="dummyPassword"
  const  hash = bcrypt.hashSync(
      ps+PEPER, 
      parseInt(SALT_ROUNDS as string)
    );

const user = new userClass()
const request = supertest(app);

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
      firstName:"what",
      lastName:"a name",
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



  
});