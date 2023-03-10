import client from '../database'
import bcrypt from 'bcrypt'
import { NextFunction } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

export type user = {
     id?: number;
     firstName: string;
     lastName: string;
     password: string;
}

const {
    PEPER,
    SALT_ROUNDS
  } = process.env

export class userClass {
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<user> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(u: user): Promise<user> {
      try {
    const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'

    const conn = await client.connect()
    
    const hash = bcrypt.hashSync(
        u.password + PEPER, 
        parseInt(SALT_ROUNDS as string)
      );

    const result = await conn
        .query(sql, [u.firstName, u.lastName,hash])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
          throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`)
      }
  }

  


  
}