import { Router } from "express";
import { userMiddleware } from "../../middleware";
import { CreateSpaceSchema } from "../../types";
import { prismaClient } from "@repo/db/client";

export const spaceRouter: Router = Router()
spaceRouter.use(userMiddleware)


spaceRouter.get("/spaces", async (req, res) => {
    try {
        const userId = req.userId!;

        const spaces = await prismaClient.space.findMany({
            where: { adminId: userId },
            orderBy: { id: "desc" },
        });

        res.json({ spaces });
        return
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


spaceRouter.post("/space", async (req, res) => {
    const parsedData = CreateSpaceSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json(parsedData.error)
        return
    }

    try {
        const space = await prismaClient.space.create({
            data: {
                slug : parsedData.data.name,
                adminId: req.userId!
            }
        })
        res.json({
            spaceSlug: space.slug,
            spaceId: space.id
        })
    } catch (error) {
        res.status(500).json({message: "something went wrong"})
    }
})



spaceRouter.get("/space/:spaceId", async (req, res) => {
    try{
        const spaceId = Number(req.params.spaceId)
        const space = await prismaClient.shape.findMany({
            where: {
                spceId: spaceId
            },
            orderBy: {
                id: "desc"
            }
        })

        res.json({
            space
        })
    } catch (error) {
        console.log(error)
        res.json({
            spaces: []
        })

    }
})

