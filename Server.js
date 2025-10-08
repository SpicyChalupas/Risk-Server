import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// CORS: allow static site origin
const allowed = (process.env.CORS_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true); // allow curl or same-origin
    if (allowed.length === 0 || allowed.includes(origin) || allowed.includes("*")) return cb(null, true);
    cb(new Error("CORS not allowed for origin: " + origin));
  }
}));
app.use(express.json());

// health endpoints
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, now: new Date().toISOString(), uptimeSeconds: Math.round(process.uptime()) });
});
app.get("/api/health", (req, res) => res.status(200).send("OK"));

// placeholder for future risk calculation route
// app.post("/api/risk", (req, res) => { ... })

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
