import { join } from "path";
import type { DB } from "./db.js";
import { createTables } from "./tables.js";

export const setup = async (db: DB) => {
  await createTables(db);
};