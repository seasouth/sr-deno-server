import { client } from "./db/db.ts";
import { insertRowToTable } from "./db/insertRowToTable.ts";

export function handleWebSocket(req: Request): Response {
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (e) => {
    console.log("WebSocket message received:", e);
    const message = e.data;
    console.log("Received:", message);

    const parsedMessage = JSON.parse(message);
    console.log("Parsed message:", parsedMessage);

    if (parsedMessage?.type == "message") {
      const generatedId = crypto.randomUUID();
      console.log("Generated ID:", generatedId);
      parsedMessage.id = generatedId
      parsedMessage.sent_at = new Date();
      insertRowToTable("messages", parsedMessage.data, client)
        .then(() => {
          console.log("Row inserted successfully");
        })
        .catch((error) => {
          console.error("Error inserting row:", error);
        });
    } else if (parsedMessage?.type == "group") {
      insertRowToTable("chats", parsedMessage.data, client)
        .then(() => {
          console.log("Chat inserted successfully");
        })
        .catch((error) => {
          console.error("Error inserting chat:", error);
        });
    }
  };

  socket.onerror = (e) => {
    console.error("WebSocket error:", e);
  };

  return response;
}
