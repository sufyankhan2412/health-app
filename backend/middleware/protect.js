const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorised. No token." });
  }
  try {
    const decoded = verifyToken(auth.split(" ")[1]);
    req.user = await User.findById(decoded.id).select("-password -otp -otpExpiry");
    if (!req.user) return res.status(401).json({ message: "User not found." });
    next();
  } catch {
    return res.status(401).json({ message: "Token invalid or expired." });
  }
};

module.exports = protect;
