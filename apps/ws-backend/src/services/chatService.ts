import { prismaClient } from "@repo/db/client";

export async function saveChatMessage(spceId: number, design: string, userId: string) {
    return prismaClient.shape.create({
        data: { spceId, design, userId },
    });
}
