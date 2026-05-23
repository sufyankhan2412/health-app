import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import familyPhoto from "../assets/family.png";
import { registerUser } from "../api/auth";
import "./Register.css";

const COUNTRY_CODES = [
  { code: "+1", country: "US" }, { code: "+1", country: "CA" },
  { code: "+7", country: "RU" }, { code: "+20", country: "EG" },
  { code: "+27", country: "ZA" }, { code: "+30", country: "GR" },
  { code: "+31", country: "NL" }, { code: "+32", country: "BE" },
  { code: "+33", country: "FR" }, { code: "+34", country: "ES" },
  { code: "+36", country: "HU" }, { code: "+39", country: "IT" },
  { code: "+40", country: "RO" }, { code: "+41", country: "CH" },
  { code: "+43", country: "AT" }, { code: "+44", country: "GB" },
  { code: "+45", country: "DK" }, { code: "+46", country: "SE" },
  { code: "+47", country: "NO" }, { code: "+48", country: "PL" },
  { code: "+49", country: "DE" }, { code: "+51", country: "PE" },
  { code: "+52", country: "MX" }, { code: "+54", country: "AR" },
  { code: "+55", country: "BR" }, { code: "+56", country: "CL" },
  { code: "+57", country: "CO" }, { code: "+58", country: "VE" },
  { code: "+60", country: "MY" }, { code: "+61", country: "AU" },
  { code: "+62", country: "ID" }, { code: "+63", country: "PH" },
  { code: "+64", country: "NZ" }, { code: "+65", country: "SG" },
  { code: "+66", country: "TH" }, { code: "+81", country: "JP" },
  { code: "+82", country: "KR" }, { code: "+84", country: "VN" },
  { code: "+86", country: "CN" }, { code: "+90", country: "TR" },
  { code: "+91", country: "IN" }, { code: "+92", country: "PK" },
  { code: "+93", country: "AF" }, { code: "+94", country: "LK" },
  { code: "+95", country: "MM" }, { code: "+98", country: "IR" },
  { code: "+212", country: "MA" }, { code: "+213", country: "DZ" },
  { code: "+216", country: "TN" }, { code: "+218", country: "LY" },
  { code: "+220", country: "GM" }, { code: "+221", country: "SN" },
  { code: "+234", country: "NG" }, { code: "+254", country: "KE" },
  { code: "+255", country: "TZ" }, { code: "+256", country: "UG" },
  { code: "+260", country: "ZM" }, { code: "+263", country: "ZW" },
  { code: "+351", country: "PT" }, { code: "+352", country: "LU" },
  { code: "+353", country: "IE" }, { code: "+358", country: "FI" },
  { code: "+380", country: "UA" }, { code: "+381", country: "RS" },
  { code: "+385", country: "HR" }, { code: "+386", country: "SI" },
  { code: "+420", country: "CZ" }, { code: "+421", country: "SK" },
  { code: "+966", country: "SA" }, { code: "+971", country: "AE" },
  { code: "+972", country: "IL" }, { code: "+973", country: "BH" },
  { code: "+974", country: "QA" }, { code: "+975", country: "BT" },
  { code: "+976", country: "MN" }, { code: "+977", country: "NP" },
  { code: "+992", country: "TJ" }, { code: "+994", country: "AZ" },
  { code: "+995", country: "GE" }, { code: "+996", country: "KG" },
  { code: "+998", country: "UZ" },
];

const FacebookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z" fill="white" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#fff" stroke="#ddd" />
    <path d="M20.64 12.2c0-.638-.057-1.252-.164-1.84H12v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
    <path d="M12 21c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H3.957v2.332A8.997 8.997 0 0012 21z" fill="#34A853" />
    <path d="M6.964 13.706a5.41 5.41 0 010-3.412V7.962H3.957a9.002 9.002 0 000 8.076l3.007-2.332z" fill="#FBBC05" />
    <path d="M12 6.583c1.321 0 2.508.454 3.44 1.345l2.582-2.58C16.463 3.891 14.426 3 12 3a8.997 8.997 0 00-8.043 4.962l3.007 2.332C7.672 8.167 9.656 6.583 12 6.583z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#000" />
    <path d="M15.6 12.8c0-1.6 1.3-2.4 1.4-2.4-.8-1.1-2-1.3-2.4-1.3-1 0-2 .6-2.5.6s-1.3-.6-2.2-.6c-1.1 0-2.2.7-2.8 1.7-1.2 2-.3 5 .8 6.6.6.8 1.2 1.7 2.1 1.7.8 0 1.1-.5 2.1-.5s1.3.5 2.1.5c.9 0 1.5-.8 2-1.7.4-.6.7-1.2.8-1.9-1.4-.5-1.4-2.7-1.4-2.7z" fill="white" />
    <path d="M14.1 8.3c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-.9z" fill="white" />
  </svg>
);

const EyeIcon = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("🔥 SUBMIT FIRED"); // ADD THIS

  setError("");
  setLoading(true);

  try {
    console.log("🚀 CALLING API"); // ADD THIS

    const res = await registerUser({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      phone: countryCode + form.phone,
    });

    console.log("✅ RESPONSE:", res);

    sessionStorage.setItem("pendingEmail", form.email);
    navigate("/otp");

  } catch (err) {
    console.log("❌ ERROR:", err.message);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="reg-wrapper">
      <div className="reg-card">
        {/* Left panel */}
        <div className="reg-left">
          <img src={familyPhoto} alt="Family" className="reg-bg" />
          <div className="reg-caption">
            <p>Welcome to the Expat Cares</p>
            <p>Login to explore</p>
            <div className="dots">
              <span className="dot" />
              <span className="dot active" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="reg-right">
          <div className="reg-header">
            <button className="close-btn" aria-label="Close">✕</button>
            <span className="reg-title">Create an account</span>
          </div>

          <h2 className="reg-heading">Let's Get Your Account Set Up</h2>

          <form onSubmit={handleSubmit} className="reg-form">
            <div className="field-group">
              <label>Full name <span className="req">*</span></label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div className="field-group">
              <label>Email <span className="req">*</span></label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="field-group">
              <label>Phone No <span className="req">*</span></label>
              <div className="phone-row">
                <select
                  className="country-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  aria-label="Country code"
                >
                  {COUNTRY_CODES.map((c, i) => (
                    <option key={i} value={c.code}>
                      {c.code} {c.country}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Enter your contact number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="field-group">
              <label>Password <span className="req">*</span></label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <button type="submit" className="continue-btn" disabled={loading}>
              {loading ? "Please wait..." : "Continue"}
            </button>
            {error && <p className="form-error">{error}</p>}
          </form>

          <p className="signin-with">Sign in With</p>
          <div className="social-icons">
            <button aria-label="Facebook"><FacebookIcon /></button>
            <button aria-label="Google"><GoogleIcon /></button>
            <button aria-label="Apple"><AppleIcon /></button>
          </div>

          <p className="terms-text">
            By creating an account using email, Google or Apple, I agree to the{" "}
            <a href="#" className="link">Terms &amp; Conditions</a> and acknowledge the{" "}
            <a href="#" className="link">Privacy Policy.</a>
          </p>

          <p className="login-text">
            Already have an account? <Link to="/login" className="link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
