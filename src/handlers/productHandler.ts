import express, { Request, Response } from 'express'
import { product, productClass } from '../models/product'
import jwt from 'jsonwebtoken'

const product = new productClass()

const index = async (_req: Request, res: Response) => {
  const theProducts = await product.index()
  res.json(theProducts)
}

const show = async (req: Request, res: Response) => {
   const theProduct = await product.show(req.params.id)
   res.json(theProduct)
}

const create = async (req: Request, res: Response) => {
    try {
        const Product: product = {
            title: req.body.title,
            price: req.body.price,
        }

        const theProduct = await product.create(Product)
        res.json(theProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const verifyAuthToken = (req: Request  , res: Response, next:express.NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
    }
    }



const productsRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products',verifyAuthToken, create)
}

export default productsRoutes