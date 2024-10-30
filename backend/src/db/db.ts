import Database from "better-sqlite3";

export const db = new Database('dev.db');
export type DB = typeof db;

export default db;