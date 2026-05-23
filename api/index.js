require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("../backend/routes/auth");

const app = express();

/* ---------------- CORS ---------------- */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://health-app-gules-three.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

/* Handle preflight safely */
app.options("*", cors());

/* ---------------- Middlewares ---------------- */
app.use(express.json());

/* ---------------- MongoDB ---------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err.message));

/* ---------------- Routes ---------------- */
app.use("/api", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* ---------------- EXPORT (IMPORTANT) ---------------- */
module.exports = app;