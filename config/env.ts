import { config } from "@dotenv/mod.ts";

export async function loadEnv() {
  try {
    const env = Deno.env.get("DENO_ENV") || "local";
    const result = await config({ path: `.env.${env}`, export: true });
    console.log("Environment loaded:", Object.keys(result));
    return result;
  } catch (error) {
    console.error("Error loading environment:", error);
    throw error;
  }
}