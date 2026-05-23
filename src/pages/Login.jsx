import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import loginPhoto from "../assets/login-photo.png";
import { loginUser, saveToken } from "../api/auth";

const LOGIN_PHOTO = loginPhoto;

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path
      d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.5C10.5 6.6 11.6 5.5 13.5 5.5H15.5V8Z"
      fill="white"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#fff" stroke="#ddd" />
    <path d="M20.64 12.2c0-.638-.057-1.252-.164-1.84H12v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M12 21c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H3.957v2.332A8.997 8.997 0 0012 21z" fill="#34A853"/>
    <path d="M6.964 13.706a5.41 5.41 0 010-3.412V7.962H3.957a9.002 9.002 0 000 8.076l3.007-2.332z" fill="#FBBC05"/>
    <path d="M12 6.583c1.321 0 2.508.454 3.44 1.345l2.582-2.58C16.463 3.891 14.426 3 12 3a8.997 8.997 0 00-8.043 4.962l3.007 2.332C7.672 8.167 9.656 6.583 12 6.583z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#000" />
    <path
      d="M15.6 12.8c0-1.6 1.3-2.4 1.4-2.4-.8-1.1-2-1.3-2.4-1.3-1 0-2 .6-2.5.6s-1.3-.6-2.2-.6c-1.1 0-2.2.7-2.8 1.7-1.2 2-.3 5 .8 6.6.6.8 1.2 1.7 2.1 1.7.8 0 1.1-.5 2.1-.5s1.3.5 2.1.5c.9 0 1.5-.8 2-1.7.4-.6.7-1.2.8-1.9-1.4-.5-1.4-2.7-1.4-2.7z"
      fill="white"
    />
    <path
      d="M14.1 8.3c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-.9z"
      fill="white"
    />
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

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ fullName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(form.fullName, form.password);
      saveToken(data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Left panel */}
        <div className="login-left">
          <img src={LOGIN_PHOTO} alt="Expat Cares" className="login-bg" />
          <div className="login-caption">
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
        <div className="login-right">
          <div className="login-header">
            <button className="close-btn" aria-label="Close">✕</button>
            <span className="login-title">Login</span>
          </div>

          <h2 className="welcome-text">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field-group">
              <label>Full name <span className="required">*</span></label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div className="field-group">
              <label>Password <span className="required">*</span></label>
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
              <div className="forgot-row">
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Please wait..." : "Log In"}
            </button>
            {error && <p className="form-error">{error}</p>}
          </form>

          <p className="signin-with">Sign in With</p>
          <div className="social-icons">
            <button aria-label="Facebook"><FacebookIcon /></button>
            <button aria-label="Google"><GoogleIcon /></button>
            <button aria-label="Apple"><AppleIcon /></button>
          </div>

          <p className="signup-text">
            First time here?{" "}
            <Link to="/register" className="create-link">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
