import { useNavigate } from "react-router-dom";
import successBoy from "../assets/successboy.png";
import "./AccountSuccess.css";

const PhoneSuccessIcon = () => (
  <div className="phone-icon-wrap">
    <div className="phone-body">
      <div className="phone-screen">
        <div className="avatar-circle">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#7c6fcd">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
        <div className="phone-lines">
          <span />
          <span />
        </div>
      </div>
    </div>
    <div className="check-badge">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    </div>
  </div>
);

export default function AccountSuccess() {
  const navigate = useNavigate();
  return (
    <div className="success-wrapper">
      <div className="success-card">
        {/* Left panel */}
        <div className="success-left">
          <img src={successBoy} alt="Success" className="success-bg" />
          <div className="success-caption">
            <p>Welcome to the Expat Cares</p>
            <p>Create Account to explore</p>
            <div className="dots">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="dot active" />
              <span className="dot" />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="success-right">
          <PhoneSuccessIcon />
          <h2 className="success-heading">Account Created Successfully</h2>
          <p className="success-sub">
            Welcome to Expat Cares. Your account has been securely created, and
            you can now access consultations, prescription services, and
            personalized healthcare support.
          </p>
          <button className="dashboard-btn" onClick={() => navigate("/")}>Continue To Dashboard</button>
        </div>
      </div>
    </div>
  );
}
