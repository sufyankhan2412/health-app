import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import heroSec from "../assets/herosec.png";
import doctorWithLaptop from "../assets/doctorwithlaptop.png";
import femaleDoc from "../assets/femaledoc.png";
import medicine from "../assets/medicine.png";
import boy from "../assets/boy.png";
import world from "../assets/world.png";
import doctorSticker from "../assets/doctorsticker.png";
import characters from "../assets/characters.png";
import backImg from "../assets/back.png";
import basicImg from "../assets/thebasic.png";
import myAccountImg from "../assets/myaccount.png";
import medicalCareImg from "../assets/medicalcare.png";
import privacyImg from "../assets/privacy.png";
import { removeToken } from "../api/auth";
import './Home.css'; 

const services = [
  { label: "Pre-Travel Check",      bg: "#C3EBE5", iconUrl: "🛡️" },
  { label: "Video Consultation",    bg: "#FFF0A6", iconUrl: "📹" },
  { label: "Documentation Support", bg: "#C4DAEA", iconUrl: "📋" },
];

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B1B1B" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1B1B1B" strokeWidth="1.5">
    <line x1="4" y1="6"  x2="20" y2="6"  strokeLinecap="round" />
    <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
    <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0457B4" strokeWidth="1.5">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TESTIMONIALS = [
  {
    quote: `"Smooth and Stress-Free." I was worried when I couldn't find my regular medication in Dubai. Expat Care reviewed my prescription, explained the equivalent UAE-approved option, and arranged everything quickly. The video call with the pharmacist gave me real confidence.\nIt was simple, professional, and reassuring — exactly what you need when you're living abroad.`,
    name: "Linda A.",
    role: "Patient",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
  },
  {
    quote: `Expat Cares' strategic guidance has been invaluable in optimizing our healthcare management. Their insights and expertise helped us streamline operations, improve productivity, and drive growth. We highly recommend them to any organization seeking to enhance their healthcare efficiency.`,
    name: "John Thompson",
    role: "COO, Stellar Enterprises",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    quote: `We've had the pleasure of partnering with Expat Cares, and it's been a game-changer for our team's health management. Their platform has significantly reduced our time-to-resolution and improved the quality of guidance we receive. We couldn't be happier with the results.`,
    name: "Emily Patel",
    role: "Talent Acquisition Manager, GlobalTech Solutions",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;
  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const getCard = (offset) => {
    const idx = (active + offset + total) % total;
    return TESTIMONIALS[idx];
  };

  return (
    <section className="testi-section">
      <h2 className="testi-big-title">Testimonials</h2>

      <div className="testi-carousel">
        {/* Prev ghost card */}
        <div className="testi-card testi-card-ghost testi-card-left">
          <span className="testi-quote-icon">"</span>
          <p className="testi-ghost-text">{getCard(-1).quote}</p>
          <p className="testi-ghost-name">{getCard(-1).name}</p>
          <p className="testi-ghost-role">{getCard(-1).role}</p>
        </div>

        {/* Active card */}
        <div className="testi-card testi-card-active">
          <div className="testi-card-left-col">
            <span className="testi-quote-icon testi-quote-blue">"</span>
            <p className="testi-active-text">{getCard(0).quote}</p>
            <div className="testi-author">
              <span className="testi-quote-icon testi-quote-blue testi-quote-close">"</span>
              <div>
                <p className="testi-name">- {getCard(0).name}</p>
                <p className="testi-role">{getCard(0).role}</p>
              </div>
            </div>
          </div>
          <div className="testi-card-right-col">
            <img src={getCard(0).avatar} alt={getCard(0).name} className="testi-avatar" />
          </div>
        </div>

        {/* Next ghost card */}
        <div className="testi-card testi-card-ghost testi-card-right">
          <span className="testi-quote-icon">"</span>
          <p className="testi-ghost-text">{getCard(1).quote}</p>
          <p className="testi-ghost-name">{getCard(1).name}</p>
          <p className="testi-ghost-role">{getCard(1).role}</p>
        </div>
      </div>

      {/* Nav arrows */}
      <button className="testi-arrow testi-arrow-left" onClick={prev} aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="testi-arrow testi-arrow-right" onClick={next} aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="testi-dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`testi-dot ${i === active ? "testi-dot-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What is expat care and how does it work?",
    a: "Expat care is a service designed for individuals living abroad who want to ensure their loved ones receive reliable, professional care in their home country. It provides peace of mind by connecting families with trusted caregivers, healthcare support, and regular monitoring services.",
  },
  {
    q: "Is expat care available in multiple locations?",
    a: "Yes, our services are available across multiple cities and countries. We have a growing network of licensed professionals ready to assist wherever you are.",
  },
  {
    q: "How do you ensure patient safety and quality care?",
    a: "All our pharmacists and healthcare professionals are licensed by the Dubai Health Authority (DHA). We follow strict quality protocols and conduct regular audits to maintain the highest standards.",
  },
  {
    q: "Who can benefit from expat care services?",
    a: "Anyone living abroad who needs guidance on UAE medication regulations, prescription equivalents, or healthcare navigation can benefit from our services.",
  },
  {
    q: "Is 24/7 care support available?",
    a: "We offer extended support hours and emergency consultation services. Our team is committed to being available when you need us most.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section">
      {/* Background image with blue overlay */}
      <div className="faq-bg">
        <img src={backImg} alt="" className="faq-bg-img" />
        <div className="faq-bg-overlay" />
      </div>

      <div className="faq-inner">
        {/* Left text */}
        <div className="faq-left">
          <p className="faq-label">FAQ,S</p>
          <h2 className="faq-heading">Got Questions?<br />We've Got<br />Answers</h2>
          <p className="faq-sub">
            Discover detailed insights and answers designed to guide you through every aspect of your experience with ease and clarity.
          </p>
        </div>

        {/* Right accordion card */}
        <div className="faq-card">
          <h3 className="faq-card-title">Do you have questions?</h3>
          <div className="faq-list">
            {FAQS.map((item, i) => (
              <div
                key={i}
                className={`faq-item ${open === i ? "faq-item-open" : ""}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <svg
                    className={`faq-chevron ${open === i ? "faq-chevron-up" : ""}`}
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="#FAFAFA" strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {open === i && (
                  <p className="faq-answer">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const HELP_CARDS = [
  { img: basicImg,      label: "The Basic" },
  { img: myAccountImg,  label: "My Account" },
  { img: medicalCareImg,label: "Medical Care" },
  { img: privacyImg,    label: "Privacy security" },
];

function HelpCenterSection() {
  const [query, setQuery] = useState("");
  return (
    <section className="help-section">
      <h2 className="help-title">Help Center</h2>
      <p className="help-sub">Everything you need to know, all in one place.</p>

      {/* Search bar */}
      <div className="help-search-wrap">
        <input
          type="text"
          className="help-search"
          placeholder="How can we help you"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search help center"
        />
        <button className="help-search-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B1B1B" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
        </button>
      </div>
      <div className="help-divider" />

      {/* 4 image cards */}
      <div className="help-cards">
        {HELP_CARDS.map((c) => (
          <div className="help-card" key={c.label}>
            <img src={c.img} alt={c.label} className="help-card-img" />
            <p className="help-card-label">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      {/* Top grid */}
      <div className="footer-grid">
        {/* Col 1 — Brand */}
        <div className="footer-brand">
          <img src={logo} alt="Expat Cares" className="footer-logo" />
          <p className="footer-tagline">
            Moving is complex. Your health shouldn't be. We provide the local expertise to clear your prescriptions for the UAE.
          </p>
          <div className="footer-socials">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="footer-social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="footer-social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="footer-social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="footer-social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>

          <div className="footer-contact">
            <p className="footer-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A99D" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
              23 Main Street, 12345, Pakistan
            </p>
            <p className="footer-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A99D" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              alihassanux@gmail.com
            </p>
            <p className="footer-contact-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A99D" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
              1234567890
            </p>
          </div>
        </div>

        {/* Col 2 — Main Pages */}
        <div className="footer-col">
          <h4 className="footer-col-title">Main Pages</h4>
          {["Services","Blog","About us","Speak to Doctor","How it Works","Check Medications"].map(l => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
        </div>

        {/* Col 3 — Customer Support */}
        <div className="footer-col">
          <h4 className="footer-col-title">Customer Support</h4>
          {["FAQ's","Contact us","Privacy policy","Terms and Conditions"].map(l => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
        </div>

        {/* Col 4 — Our Services */}
        <div className="footer-col">
          <h4 className="footer-col-title">Our Services</h4>
          {["Pre-Travel Check","Video Consultation","Find a Replacement","Documentation Support"].map(l => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
          <button className="footer-back-top" onClick={scrollTop}>
            Back To Top &nbsp; ↑
          </button>
        </div>
      </div>

      {/* Big watermark text */}
      <div className="footer-watermark">Expat Cares</div>
    </footer>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = () => { removeToken(); navigate("/login"); };
  return (
    <div className="home-root">

      {/* ── Announcement bar ── */}
      <div className="announcement-bar">
        We make medication changes simple, secure, and clinically reviewed — wherever you are in the world.
      </div>

      <div className="page-wrapper">

      {/* ── White content area ── */}
      <div className="white-area">

        {/* Navbar */}
        <nav className="navbar">
          <img src={logo} alt="Expat Cares" className="nav-logo" />
          <div className="nav-right">
            <button className="login-btn" onClick={handleLogout}>
              <UserIcon />
              <span>Log Out</span>
            </button>
            <button className="menu-btn" aria-label="Menu">
              <MenuIcon />
            </button>
          </div>
        </nav>

        {/* Hero headline */}
        <section className="hero-text-section">
          <h1 className="hero-title">
            <span className="hero-blue">Enjoy Dubai.</span>
            <br />
            We'll Handle The Meds!
          </h1>
          <div className="divider-line" />

          {/* Service cards */}
          <div className="service-cards">
            {services.map((s) => (
              <div className="service-card" key={s.label} style={{ background: s.bg }}>
                <span className="service-icon-wrap">{s.iconUrl}</span>
                <span className="service-label">{s.label}</span>
                <span className="service-arrow"><ArrowIcon /></span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Hero gradient section ── */}
      <section className="hero-gradient-section">
        <h2 className="hero-gradient-title">
          Enjoy Dubai.<br />We'll handle the meds.
        </h2>

        <div className="hero-img-wrap">
          <img src={heroSec} alt="Hero" className="hero-img" />
        </div>

      </section>

      {/* ── About Expat Cares section ── */}
      <section className="about-section">
        <p className="about-label">About Expat Cares</p>
        <h2 className="about-title">Dubai Health. Decoded.</h2>

        <div className="about-img-wrap">
          {/* Left stat badges */}
          <div className="about-badges">
            <div className="badge badge-solid">
              <span className="badge-num">30+</span>
              <span className="badge-text">Nationalities served</span>
            </div>
            <div className="badge badge-light">
              <span className="badge-num">24 hrs</span>
              <span className="badge-text">Average guidance</span>
            </div>
          </div>

          {/* Main photo */}
          <img
            src={doctorWithLaptop}
            alt="Healthcare professional"
            className="about-img"
          />

          {/* Right clients badge */}
          <div className="clients-badge">
            <div className="clients-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#0457B4">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <p className="clients-num">12+ Clients</p>
          </div>
        </div>

        <h3 className="about-verified">Your Health, Verified.</h3>
        <p className="about-sub">
          We provide the <span className="about-link">DHA-licensed expertise</span> you need<br />to land safely.
        </p>
        <button className="learn-more-btn">Learn More</button>
      </section>

      {/* ── How it Works section ── */}
      <section className="hiw-section">
        {/* Decorative curved lines with dots */}
        <svg className="hiw-curve-blue" viewBox="0 0 540 180" fill="none" preserveAspectRatio="none">
          <path d="M0 160 Q135 80 270 100 Q405 120 540 20" stroke="#080B6C" strokeWidth="1" fill="none"/>
          <circle cx="0"   cy="160" r="4" fill="#080B6C"/>
          <circle cx="90"  cy="112" r="4" fill="#080B6C"/>
          <circle cx="200" cy="104" r="4" fill="#080B6C"/>
          <circle cx="310" cy="110" r="4" fill="#080B6C"/>
          <circle cx="430" cy="60"  r="4" fill="#080B6C"/>
          <circle cx="540" cy="20"  r="4" fill="#080B6C"/>
        </svg>
        <svg className="hiw-curve-yellow" viewBox="0 0 540 180" fill="none" preserveAspectRatio="none">
          <path d="M0 20 Q135 100 270 80 Q405 60 540 160" stroke="#FFF0A6" strokeWidth="1" strokeDasharray="4 6" fill="none"/>
          <circle cx="80"  cy="60"  r="4" fill="#FFF0A6"/>
          <circle cx="220" cy="76"  r="4" fill="#FFF0A6"/>
          <circle cx="360" cy="68"  r="4" fill="#FFF0A6"/>
          <circle cx="480" cy="130" r="4" fill="#FFF0A6"/>
        </svg>

        <h2 className="hiw-title">How it Works</h2>

        {/* Center doctor image */}
        <div className="hiw-doctor-wrap">
          <img src={femaleDoc} alt="Doctor" className="hiw-doctor-img" />
          <div className="hiw-cta-row">
            <button className="hiw-btn-primary">Speak To Doctor</button>
            <button className="hiw-btn-secondary">Check Medication</button>
          </div>
        </div>

        {/* Two cards */}
        <div className="hiw-cards">
          <div className="hiw-card">
            <p className="hiw-card-title">Upload or ask about</p>
            <p className="hiw-card-sub">your medication</p>
            <div className="hiw-card-img-wrap">
              <img src={medicine} alt="Medication" className="hiw-card-img" />
            </div>
            <button className="hiw-learn-btn">Learn More</button>
          </div>

          <div className="hiw-card">
            <p className="hiw-card-title">Reviewed by licensed</p>
            <p className="hiw-card-sub">pharmacists</p>
            <div className="hiw-card-img-wrap">
              <img src={boy} alt="Pharmacist" className="hiw-card-img hiw-card-img-person" />
            </div>
            <button className="hiw-learn-btn">Learn More</button>
          </div>
        </div>

        <p className="hiw-footer-text">
          We make medication changes simple, secure, and clinically reviewed —<br />
          wherever you are in the world.
        </p>
      </section>

      {/* ── Trusted Care section ── */}
      <section className="trusted-section">
        <h2 className="trusted-title">
          Trusted care, wherever<br />you're from
        </h2>

        {/* Top wide card — International standards */}
        <div className="trusted-card trusted-card-wide">
          <p className="trusted-card-heading">International<br />standards</p>
          <div className="trusted-card-center-img">
            <img src={world} alt="International standards" className="trusted-world-img" />
          </div>
          <p className="trusted-card-desc">
            Our guidance follows globally recognized pharmaceutical and patient-safety standards, adapted to UAE regulations.
          </p>
        </div>

        {/* Bottom two cards */}
        <div className="trusted-bottom-row">
          <div className="trusted-card trusted-card-half">
            <p className="trusted-card-heading">Licensed<br />pharmacists</p>
            <div className="trusted-card-img-wrap">
              <img src={doctorSticker} alt="Licensed pharmacists" className="trusted-sticker-img" />
            </div>
            <p className="trusted-card-desc-sm">
              All advice is provided by pharmacists licensed by the Dubai Health Authority
            </p>
          </div>

          <div className="trusted-card trusted-card-half">
            <p className="trusted-card-heading">Multilingual<br />support</p>
            <div className="trusted-card-img-wrap">
              <img src={characters} alt="Multilingual support" className="trusted-sticker-img" />
            </div>
            <p className="trusted-card-desc-sm">
              Clear guidance in the language you're most comfortable with.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials section ── */}
      <TestimonialsSection />

      {/* ── FAQ section ── */}
      <FaqSection />

      {/* ── Help Center section ── */}
      <HelpCenterSection />

      {/* ── Footer ── */}
      <Footer />

      </div>{/* end page-wrapper */}
    </div>
  );
}
