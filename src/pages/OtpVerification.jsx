import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import girlOtp from "../assets/girlotp.png";
import { verifyEmail, saveToken } from "../api/auth";
import "./OtpVerification.css";

const TIMER_SECONDS = 60;

export default function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [expired, setExpired] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) { setExpired(true); return; }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    setTimer(TIMER_SECONDS);
    setExpired(false);
    inputRefs.current[0]?.focus();
  };

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = [...otp];
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const email = sessionStorage.getItem("pendingEmail") || "";
      const data = await verifyEmail(email, otp.join(""));
      saveToken(data.token);
      sessionStorage.removeItem("pendingEmail");
      navigate("/success");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-wrapper">
      <div className="otp-card">

        {/* Left panel */}
        <div className="otp-left">
          <img src={girlOtp} alt="OTP verification" className="otp-bg" />

          <div className="otp-caption">
            <p>Welcome to the Expat Cares</p>
            <p>Create Account to explore</p>
            <div className="dots">
              <span className="dot" />
              <span className="dot" />
              <span className="dot active" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="otp-right">
          {/* Header */}
          <div className="otp-header">
            <button className="close-btn" aria-label="Close">✕</button>
            <span className="otp-title">Verification Code</span>
          </div>

          {/* Content */}
          <div className="otp-content">
            <h2 className="otp-heading">
              We've Sent A 6-Digit Verification Code<br />To Your Email.
            </h2>
            <p className="otp-sub">Please enter the code below to continue securely.</p>

            <form onSubmit={handleSubmit}>
              <div className="otp-inputs" onPaste={handlePaste}>
                {otp.map((val, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={(e) => handleChange(e.target.value, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`otp-box ${val ? "filled" : ""}`}
                    aria-label={`OTP digit ${idx + 1}`}
                  />
                ))}
              </div>

              <p className="expire-text">
                {expired
                  ? <span className="expired-msg">Code expired.</span>
                  : <>Expire in <strong>{formatTime(timer)}</strong></>
                }
              </p>

              <button type="button" className="resend-btn" onClick={handleResend}>
                Resend
              </button>

              <button
                type="submit"
                className="continue-btn"
                disabled={otp.some((d) => !d) || loading}
              >
                {loading ? "Verifying..." : "Continue"}
              </button>
              {error && <p className="form-error">{error}</p>}
            </form>

            <a href="#" className="back-login">Back to login</a>
          </div>
        </div>

      </div>
    </div>
  );
}
