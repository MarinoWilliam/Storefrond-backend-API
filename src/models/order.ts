import client from '../database'

export type order = {
     id?: number;
     quantity: number;
     userid: number;
     orderstate: string;
}

export class orderClass {
  async show(id: string): Promise<order> {
    try {
        
    const sql = "SELECT * FROM orders WHERE (userID=($1) AND orderstate='open')"
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(o: order): Promise<order> {
    try {
  const sql = 'INSERT INTO orders (orderstate, quantity, userID) VALUES($1, $2, $3) RETURNING *'

  const conn = await client.connect()

  const result = await conn
      .query(sql, [o.orderstate, o.quantity,o.userid])

  const order = result.rows[0]

  conn.release()

  return order
    } catch (err) {
        throw new Error(`Could not add new order. Error: ${err}`)
    }
}
  
}