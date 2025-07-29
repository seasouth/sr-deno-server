import { handleWebSocket } from "./websocket.ts";

const port = parseInt(Deno.env.get("PORT") ?? "8000");

Deno.serve({ port }, (req: Request) => {
  const { pathname } = new URL(req.url);

  if (pathname === "/ws") {
    try {
      const response = handleWebSocket(req);
      return response;
    } catch (error) {
      console.error("Error handling WebSocket request:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  return new Response("Hello from Deno HTTP server!", { status: 200, headers: { "Content-Type": "text/plain" }});
});
