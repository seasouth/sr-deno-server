import { client } from "./db.ts";

export async function handleWebSocket(req: Request): Promise<Response> {
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = async (e) => {
    const message = e.data;
    console.log("Received:", message);

    // Echo or do a DB query
    if (message === "get_messages") {
      const result = await client.queryObject("SELECT * FROM messages;");
      socket.send(JSON.stringify(result.rows));
    } else {
      socket.send(`Echo: ${message}`);
    }
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  socket.onerror = (e) => {
    console.error("WebSocket error:", e);
  };

  return response;
}
