import express, { Request, Response } from 'express'
import { user, userClass } from '../models/user'
import jwt, { Secret } from 'jsonwebtoken'

const user = new userClass()

const index = async (_req: Request, res: Response) => {
  const theUser = await user.index()
  res.json(theUser)
}

const show = async (req: Request, res: Response) => {
   const theUsers = await user.show(req.body.id)
   res.json(theUsers)
}

const create = async (req: Request, res: Response) => {
    try {
        const User: user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
        const theUser = await user.create(User)
        var token = jwt.sign({ user: theUser }, process.env.TOKEN_SECRET as Secret);
        res.json(token)
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

const useraRoutes = (app: express.Application) => {
  app.get('/users',verifyAuthToken, index)
  app.get('/users/:id',verifyAuthToken, show)
  app.post('/users', create)
}

export default useraRoutes