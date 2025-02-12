import { WebSocketServer } from "ws";
import { setupWebSocketServer } from "./handlers/websocketHandler";

const wss = new WebSocketServer({ port: 8080 });
setupWebSocketServer(wss);
console.log("WebSocket server running on ws://localhost:8080");