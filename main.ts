import { handleWebSocket } from "./websocket.ts";

console.log("Listening on http://localhost:8000");

Deno.serve((req) => {
  const { pathname } = new URL(req.url);

  if (pathname === "/ws") {
    return handleWebSocket(req);
  }

  return new Response("Hello from Deno HTTP server!");
});
