import { handleWebSocket } from "./websocket.ts";

console.log("Listening...");

const port = parseInt(Deno.env.get("PORT") ?? "8000");

Deno.serve({ port }, (req: Request) => {
  const { pathname } = new URL(req.url);

  if (pathname === "/ws") {
    return handleWebSocket(req);
  }

  return new Response("Hello from Deno HTTP server!");
});
