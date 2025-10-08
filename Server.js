import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// CORS before routes
const allowed = (process.env.CORS_ORIGINS || "")
  .split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowed.length === 0 || allowed.includes(origin) || allowed.includes("*")) return cb(null, true);
    cb(new Error("CORS not allowed for origin: " + origin));
  }
}));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server running. Try /api/ping"));
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, now: new Date().toISOString(), uptimeSeconds: Math.round(process.uptime()) });
});
app.get("/api/health", (req, res) => res.status(200).send("OK"));

// placeholder for future risk calculation route
// app.post("/api/risk", (req, res) => { ... })

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
