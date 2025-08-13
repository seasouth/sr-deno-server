import { Client } from "@postgres/mod.ts";
import { loadEnv } from "../config/env.ts";

await loadEnv();

const user = Deno.env.get("PG_USER");
const db = Deno.env.get("PG_DB");
console.log("PG_USER:", user);
console.log("PG_DB:", db);

if (!user || !db) {
  throw new Error("Missing required database environment variables");
}

const client = new Client({
  user: Deno.env.get("PG_USER"),
  password: Deno.env.get("PG_PW"),
  database: Deno.env.get("PG_DB"),
  hostname: Deno.env.get("PG_HOST"),
  port: 5432
});

await client.connect();

export { client };