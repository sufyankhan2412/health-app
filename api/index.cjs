const app = require("../backend/server.js");

module.exports = async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
      return res.status(200).end();
    }
    return app(req, res);
  } catch (err) {
    console.error("API CRASH:", err.message);
    return res.status(500).json({ error: err.message });
  }
};