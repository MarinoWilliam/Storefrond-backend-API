import express, { Request, Response } from 'express'
import { order, orderClass } from '../models/order'
import jwt from 'jsonwebtoken'

const order = new orderClass()


const show = async (req: Request, res: Response) => {
   const theOrder = await order.show(req.params.id)
   res.json(theOrder)
}

const verifyAuthToken = (req: Request  , res: Response, next:express.NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)

        next()
    } catch (error) {
        res.status(401)
    }
    }

const ordersRoutes = (app: express.Application) => {

  app.get('Users/:id/currentOrder',verifyAuthToken, show)
}

export default ordersRoutes