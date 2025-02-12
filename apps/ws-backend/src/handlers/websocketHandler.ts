import { WebSocket, WebSocketServer } from "ws";
import { verifyToken } from "../auth";
import { saveChatMessage } from "../services/chatService";

interface User {
    ws: WebSocket;
    space: Set<string>;
    userId: string;
}

const users = new Map<string, User>();

export function setupWebSocketServer(server: WebSocketServer) {
    server.on("connection", (ws, request) => {
        const url = request.url;
        if (!url) return;

        const queryParams = new URLSearchParams(url.split("?")[1]);
        const token = queryParams.get("token") || "";
        const userId = verifyToken(token);

        if (!userId) {
            ws.close();
            return;
        }

        // If user already exists, retain their spaces and update WebSocket reference
        if (users.has(userId)) {
            const existingUser = users.get(userId);
            if (existingUser) {
                existingUser.ws = ws; // Update WebSocket connection
            }
        } else {
            // New user, create an entry
            users.set(userId, { userId, space: new Set(), ws });
        }

        ws.on("message", async (data) => {
            try {
                const parsedData = JSON.parse(data.toString());
                if (!parsedData.type) throw new Error("Invalid message format");
                handleWebSocketMessage(parsedData, userId, ws);
            } catch (error) {
                console.error("Invalid JSON received", error);
            }
        });

        ws.on("close", () => {
            // Do not delete user or their spaces, just close WebSocket connection
            const user = users.get(userId);
            if (user) {
                user.ws = null as unknown as WebSocket; // Nullify WebSocket reference
            }
        });
    });
}

async function handleWebSocketMessage(parsedData: any, userId: string, ws: WebSocket) {
    const user = users.get(userId);
    if (!user) return;

    switch (parsedData.type) {
        case "join_space":
            user.space.add(parsedData.spaceId); // User joins a space
            break;

        case "leave_space":
            user.space.delete(parsedData.spaceId); // User leaves a space
            break;

        case "shape":
            if (!user.space.has(parsedData.spaceId)) return; // Ensure user is in the space
            await saveChatMessage(Number(parsedData.spaceId), parsedData.design, userId);

            users.forEach((u, uid) => {
                if (u.space.has(parsedData.spaceId) && u.ws.readyState === WebSocket.OPEN) {
                    console.log(`Sending shape to user ${uid} in space ${parsedData.spaceId}`);
                    u.ws.send(JSON.stringify({ 
                        type: "shape", 
                        design: parsedData.design, 
                        spaceId: parsedData.spaceId 
                    }));
                }
            });
            break;  

        default:
            console.warn("Unknown message type received:", parsedData.type);
    }
}
