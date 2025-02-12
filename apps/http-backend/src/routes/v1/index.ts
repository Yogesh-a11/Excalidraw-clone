import { Router } from "express";
import { LoginSchema, SignupSchema } from "../../types";
import bcrypt from 'bcryptjs'
import { prismaClient } from "@repo/db/client"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { spaceRouter } from "./space.ts";
import { JWT_SECRET } from "../../config";
export const router:Router = Router()

router.post('/signup', async (req, res) => {
    const parsedData = SignupSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json(parsedData.error)
        return
    }
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10)

    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: hashedPassword,
                name: parsedData.data.name,
            }
        })
        res.json({
            userId: user.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "something went wrong"})
    }
})

router.post("/signin", async (req, res) => {
    const parsedData = LoginSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json(parsedData.error)
        return
    }
    try {
        const user = await prismaClient.user.findUnique({
            where: {
                email: parsedData.data.email
            }
        })
        if (!user) {
            res.status(403).json({message: "User not found"})
            return
        }

        const isPasswprdValid = await bcrypt.compare(parsedData.data.password, user.password)
        if (!isPasswprdValid) {
            res.status(403).json({message: "Invalid password"})
            return
        }
        const token = jwt.sign({
            userId: user.id,
        }, JWT_SECRET as string) 

        res.json({
            userId: user.id,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "something went wrong"})
    }
})

router.use("/space", spaceRouter)