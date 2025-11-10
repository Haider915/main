const express = require("express");
const cors = require("cors");

const app = express();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Merchenary API listening on port ${PORT}`);
});
