import { Client } from "@postgres/mod.ts";

export async function insertRowToTable(table: string, row: Record<string, unknown>, client: Client) {
  const keys = Object.keys(row);
  const values = Object.values(row);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
  console.log("placeholders", placeholders);
  const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`;
  console.log("sql", sql);
  await client.queryObject({ text: sql, args: values });
}