require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

/* ---------------- CORS ---------------- */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://health-le6v6w1ec-sufyans-projects-d0e763b2.vercel.app" // change later
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.options("*", cors());

app.use(express.json());

/* ---------------- MongoDB ---------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ---------------- Routes ---------------- */
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

/* ---------------- Start Server (Render needs this) ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});