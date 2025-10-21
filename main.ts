import { handleWebSocket } from "./websocket.ts";
import { client } from "./db/db.ts";

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

for (const signal of ["SIGINT", "SIGTERM"] as const) {
  Deno.addSignalListener(signal, async () => {
    console.log(`Received ${signal}, closing database connection...`);
    await client.end();
    Deno.exit();
  });
}