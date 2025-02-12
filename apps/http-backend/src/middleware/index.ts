import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { JWT_SECRET } from "../config"
export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]
    const token = header?.split(" ")[1]
    
    if (!token) {
        res.status(403).json({message: "No token provided"})
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET ) as {userId: string}

        req.userId = decoded.userId
        next()

    } catch (error) {
        res.status(403).json({message: "Invalid token"})
        return
    }
}
