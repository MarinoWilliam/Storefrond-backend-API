import client from '../database'

export type product = {
     id?: number;
     title: string;
     price: number;
}

export class productClass {
  async index(): Promise<product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<product> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(p: product): Promise<product> {
      try {
    const sql = 'INSERT INTO products (title, price) VALUES($1, $2) RETURNING *'

    const conn = await client.connect()

    const result = await conn
        .query(sql, [p.title, p.price])

    const product = result.rows[0]

    conn.release()

    return product
      } catch (err) {
          throw new Error(`Could not add new product ${p.title}. Error: ${err}`)
      }
  }

 
  
}