const User = require("../models/User");
const { sendOtp } = require("../utils/mailer");
const { signToken } = require("../utils/jwt");
const crypto = require("crypto");

// Generate 6-digit OTP
const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// ── POST /api/patient/register ──────────────────────────────────────────────
const register = async (req, res) => {
  try {
    console.log("📝 Register request received:", { 
      body: req.body, 
      hasEmail: !!req.body.email,
      hasPassword: !!req.body.password 
    });

    const { email, fullName, password, phone } = req.body;
    if (!email || !fullName || !password || !phone) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await User.findOne({ email });
    if (existing && existing.isVerified) {
      console.log("❌ Email already exists");
      return res.status(409).json({ message: "Email already registered. Please log in." });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    if (existing) {
      // Re-send OTP for unverified account
      console.log("♻️ Resending OTP to existing unverified user");
      existing.otp = otp;
      existing.otpExpiry = otpExpiry;
      await existing.save();
    } else {
      console.log("✨ Creating new user");
      await User.create({ fullName, email, password, phone, otp, otpExpiry });
    }

    console.log("📧 Sending OTP email...");
    await sendOtp(email, otp);
    console.log("✅ OTP sent successfully");

    return res.status(201).json({ message: "OTP sent to your email. Please verify." });
  } catch (err) {
    console.error("💥 Register error:", err);
    return res.status(500).json({ message: "Server error.", error: err.message });
  }
};

// ── POST /api/user/verifyEmail ───────────────────────────────────────────────
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.isVerified) return res.status(400).json({ message: "Email already verified." });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP." });
    if (user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired. Please register again." });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = signToken({ id: user._id, email: user.email });

    return res.status(200).json({
      message: "Email verified successfully.",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

// ── POST /api/user/login ─────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });
    if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first." });

    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials." });

    const token = signToken({ id: user._id, email: user.email });

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error." });
  }
};

// ── GET /api/user/me (protected) ─────────────────────────────────────────────
const getMe = async (req, res) => {
  return res.status(200).json({ user: req.user });
};

module.exports = { register, verifyEmail, login, getMe };
