import type { DB } from "./db.js";

export const createTables = async (db: DB) => {
    console.log('asdfgh');
  db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    title TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    tags TEXT NOT NULL
  );
`);
};