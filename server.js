const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); 

const app = express();

const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json());

// Simple health check
app.get("/health", (req, res) => {
  res.json({ ok: true, status: "Merchenary API is running" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Merchenary backend is live ✅");
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ ok: true, now: result.rows[0].now });
  } catch (err) {
    console.error("DB test error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/reps", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role, created_at FROM reps ORDER BY id");
    res.json({ ok: true, reps: result.rows });
  } catch (err) {
    console.error("Error fetching reps:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Merchenary API listening on port ${PORT}`);
});
