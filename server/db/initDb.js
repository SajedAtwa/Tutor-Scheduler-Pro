// server/db/initDb.js
const fs = require("fs");
const path = require("path");
const db = require("../config/database");

let hasInitialized = false;

async function initDb() {
  if (hasInitialized) return;
  hasInitialized = true;

  // NOTE: schema.sql is in this same folder: server/db/schema.sql
  const schemaPath = path.join(__dirname, "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");

  // split on ; + run each statement (simple + works for this schema)
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  for (const stmt of statements) {
    await db.query(stmt);
  }

  console.log("✅ Database schema ensured (tables created if missing).");

  // ✅ Seed the service table so class creation always works
  await seedServices();

  console.log("✅ Service table seeded (INSERT IGNORE).");
}

async function seedServices() {
  // Keep this list in sync with your Provider.js service/class type mapping
  const services = [
    ["Math", "Calc 1"],
    ["Math", "Calc 2"],
    ["Math", "Calc 3"],
    ["Math", "Linear Algebra"],

    ["English", "English 101"],
    ["English", "Literature"],
    ["English", "English 102"],

    ["Science", "Chemistry"],
    ["Science", "Biology"],
    ["Science", "Physics"],
    ["Science", "Astronomy"],

    ["History", "American History"],
    ["History", "Modern Europe"],
    ["History", "Ancient Civilizations"],
    ["History", "Governent"], // keep spelling exactly as your frontend currently uses

    ["Foreign Language", "Chinese"],
    ["Foreign Language", "Spanish"],
    ["Foreign Language", "Latin"],
    ["Foreign Language", "French"],
  ];

  // INSERT IGNORE prevents duplicate key errors because of uniq_service(service_type, class_type)
  const sql = `
    INSERT IGNORE INTO service (service_type, class_type)
    VALUES ${services.map(() => "(?, ?)").join(", ")}
  `;

  const params = services.flat();
  await db.execute(sql, params);
}

module.exports = { initDb };