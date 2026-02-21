// server/db/initDb.js
const fs = require("fs");
const path = require("path");
const db = require("../config/database");

let hasInitialized = false;

async function initDb() {
  if (hasInitialized) return;
  hasInitialized = true;

  const schemaPath = path.join(__dirname, "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");

  // split on ; + run each statement (simple + works for this schema)
  const statements = sql
    .split(";")
    .map(s => s.trim())
    .filter(Boolean);

  for (const stmt of statements) {
    await db.query(stmt);
  }

  console.log("✅ Database schema ensured (tables created if missing).");
}

module.exports = { initDb };