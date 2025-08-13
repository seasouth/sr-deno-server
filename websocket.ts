import { client } from "./db/db.ts";
import { insertRowToTable } from "./db/insertRowToTable.ts";

export function handleWebSocket(req: Request): Response {
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = async (e) => {
    console.log("WebSocket message received:", e);
    const message = e.data;
    console.log("Received:", message);

    const parsedMessage = JSON.parse(message);
    const generatedId = crypto.randomUUID();
    console.log("Generated ID:", generatedId);
    parsedMessage.id = generatedId
    parsedMessage.sent_at = new Date();
    console.log("Parsed message:", parsedMessage);

    insertRowToTable("messages", parsedMessage, client)
      .then(() => {
        console.log("Row inserted successfully");
      })
      .catch((error) => {
        console.error("Error inserting row:", error);
      });

    // Echo or do a DB query
    if (message === "get_messages") {
      const result = await client.queryObject("SELECT * FROM messages;");
      socket.send(JSON.stringify(result.rows));
    } else {
      console.log(`Echoing message: ${message}`);
      socket.send(message);
    }
  };

  socket.onclose = async () => {
    console.log("WebSocket closed");
    await client.end();
  };

  socket.onerror = (e) => {
    console.error("WebSocket error:", e);
  };

  return response;
}
