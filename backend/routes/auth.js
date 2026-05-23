const express = require("express");
const router = express.Router();
const { register, verifyEmail, login, getMe } = require("../controllers/authController");
const protect = require("../middleware/protect");

router.post("/patient/register", register);
router.post("/user/verifyEmail", verifyEmail);
router.post("/user/login", login);
router.get("/user/me", protect, getMe);   // protected — test auth

module.exports = router;
