import { Link } from 'react-router-dom'
import { useState, useEffect, useMemo, useRef } from 'react'
import { 
  Shield, 
  Upload, 
  PieChart, 
  FileText, 
  CheckCircle, 
  Lock, 
  IndianRupee,
  Users,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
} from 'lucide-react'
import './LandingPage.css'

function LandingPage() {
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)
  const [splineLoaded, setSplineLoaded] = useState(false)
  const heroRef = useRef(null)

  // Generate antigravity-style particles
  const particles = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      speed: 40 + Math.random() * 110,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: `rgba(${200 + Math.random() * 40}, ${40 + Math.random() * 60}, ${40 + Math.random() * 60}, ${0.35 + Math.random() * 0.4})`
    }))
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current || window.innerWidth < 768) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMouseX(x)
      setMouseY(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Check if spline viewer is available
    const timer = setTimeout(() => {
      if (window.customElements && window.customElements.get('spline-viewer')) {
        setSplineLoaded(true)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        {/* Animated gradient orbs background */}
        <div className="hero-animated-bg">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        {/* Interactive particles */}
        <div className="interactive-particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="antigravity-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                transform: `translate(${(mouseX - 0.5) * p.speed * p.direction}px, ${(mouseY - 0.5) * p.speed * p.direction}px)`
              }}
            />
          ))}
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>AI-Powered Insurance Clarity</span>
            </div>
            <h1 className="hero-title">
              No more hospital bill surprises.
              <br />
              <span className="gradient-text">Know what your insurance really covers.</span>
            </h1>
            <p className="hero-subtitle">
              Upload your hospital bill and policy in seconds. Get instant, clear breakdowns 
              of what's covered, what's not, and exactly what you'll pay. Built for India, 
              designed for trust.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary btn-large">
                Upload Bill & Policy
                <ArrowRight size={20} />
              </Link>
              <Link to="/simulator" className="btn btn-secondary btn-large">
                Simulate Treatment Cost
              </Link>
            </div>
            <div className="trust-badges">
              <div className="trust-badge">
                <Lock size={18} />
                <span>Bank-level Security</span>
              </div>
              <div className="trust-badge">
                <Shield size={18} />
                <span>100% Private</span>
              </div>
              <div className="trust-badge">
                <IndianRupee size={18} />
                <span>India-Ready</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <CheckCircle className="card-icon success" />
              <div>
                <div className="card-label">Covered</div>
                <div className="card-value">₹45,000</div>
              </div>
            </div>
            <div className="floating-card card-2">
              <FileText className="card-icon warning" />
              <div>
                <div className="card-label">Partial Coverage</div>
                <div className="card-value">₹12,000</div>
              </div>
            </div>
            <div className="floating-card card-3">
              <PieChart className="card-icon primary" />
              <div>
                <div className="card-label">Your Out-of-Pocket</div>
                <div className="card-value">₹8,500</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How Insurex Works</h2>
          <p className="section-subtitle">Three simple steps to complete clarity</p>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <Upload className="step-icon" />
              <h3>Upload Documents</h3>
              <p>Drop your hospital bill and insurance policy. We accept PDFs, images, and scanned documents.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <PieChart className="step-icon" />
              <h3>AI Analysis</h3>
              <p>Our AI instantly analyzes your coverage, co-pays, sub-limits, and exclusions in seconds.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <FileText className="step-icon" />
              <h3>Clear Breakdown</h3>
              <p>See exactly what's covered, what's not, and why. Get dispute scripts and savings tips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Built for Indian Healthcare</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon primary">
                <IndianRupee size={24} />
              </div>
              <h3>Treatment Cost Simulator</h3>
              <p>Estimate costs and coverage before treatment. Know your out-of-pocket expenses in advance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon success">
                <Users size={24} />
              </div>
              <h3>Family Policy Manager</h3>
              <p>Track multiple family members under one policy. Spot coverage gaps and overlaps.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon warning">
                <FileText size={24} />
              </div>
              <h3>Dispute Script Generator</h3>
              <p>AI-generated call scripts for insurance disputes. Tailored for Indian insurers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon primary">
                <Shield size={24} />
              </div>
              <h3>Cashless Hospital Search</h3>
              <p>Find network hospitals with cashless facilities. Filter by city and treatment type.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to understand your coverage?</h2>
            <p>Join thousands of Indians who've avoided billing surprises</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary btn-large">
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Demo User Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer - Ditto Style */}
      <footer className="comprehensive-footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Section with Character */}
            <div className="footer-brand-section">
              <div className="brand-with-mascot">
                <div className="mascot-icon">
                  <Shield size={48} />
                </div>
                <div className="brand-info">
                  <h3 className="brand-name">
                    <Shield size={24} />
                    Insurex
                  </h3>
                  <p className="brand-tagline">
                    With Insurex, you don't just upload bills. You understand them. 
                    Navigate complex coverage, avoid pitfalls and make better decisions.
                  </p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="contact-actions">
                <a href="tel:+918045680003" className="btn-contact primary">
                  <Phone size={18} />
                  Book a free call
                </a>
                <a href="https://wa.me/918045680003" className="btn-contact success" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>

              {/* Contact Information */}
              <div className="contact-info-block">
                <h4>Need help?</h4>
                
                <div className="contact-item">
                  <strong>General Support:</strong>
                  <p>080-45680003 | <a href="mailto:help@insurex.in">help@insurex.in</a></p>
                </div>

                <div className="contact-item">
                  <strong>Claims Assistance Only:</strong>
                  <p>080-48816818 | <a href="mailto:claims@insurex.in">claims@insurex.in</a></p>
                  <small className="text-muted">
                    Please do not call this number for any other queries. 
                    This is strictly for emergency usage.
                  </small>
                </div>

                <div className="contact-item">
                  <strong>Career Inquiries:</strong>
                  <p><a href="mailto:careers@insurex.in">careers@insurex.in</a></p>
                </div>
              </div>
            </div>

            {/* Products Column */}
            <div className="footer-column">
              <h4 className="column-title">Products</h4>
              <ul className="footer-links">
                <li><Link to="/upload">Health Insurance</Link></li>
                <li><Link to="/simulator">Term Insurance</Link></li>
                <li><Link to="/family">Family Plans</Link></li>
                <li><Link to="/dashboard">Coverage Analyzer</Link></li>
              </ul>
            </div>

            {/* Tools Column */}
            <div className="footer-column">
              <h4 className="column-title">Tools</h4>
              <ul className="footer-links">
                <li><Link to="/dashboard">Understand your insurance</Link></li>
                <li><Link to="/pre-hosp">Pre-hospitalization Guide</Link></li>
                <li><Link to="/simulator">Coverage Simulator</Link></li>
                <li><Link to="/hospitals">Find Network Hospitals</Link></li>
                <li><Link to="/dashboard">AI Dispute Forecaster</Link></li>
              </ul>
            </div>

            {/* Guides Column */}
            <div className="footer-column">
              <h4 className="column-title">Guides</h4>
              <ul className="footer-links">
                <li><Link to="/health-insurance-101">Health Insurance 101</Link></li>
                <li><Link to="/term-insurance-101">Term Insurance 101</Link></li>
                <li><Link to="/best-health-plans-2026">Best Health Plans 2026</Link></li>
                <li><Link to="/compare-policies">Compare Policies</Link></li>
                <li><Link to="/claim-process-guide">Claim Process Guide</Link></li>
              </ul>
            </div>

            {/* General Column */}
            <div className="footer-column">
              <h4 className="column-title">General</h4>
              <ul className="footer-links">
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/about">About Insurex</Link></li>
                <li><Link to="/hospitals">Partner Insurers</Link></li>
                <li><Link to="/contact">Claims Assistance</Link></li>
                <li>
                  <Link to="/contact">
                    Careers <span className="hiring-badge">We are hiring</span>
                  </Link>
                </li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="footer-social">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={24} />
            </a>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="footer-legal">
              <p>Insurex © 2021-2026. All Rights Reserved.</p>
              <p className="legal-entity">Insurex Healthcare Solutions Private Limited</p>
              <p className="legal-id">CIN: U74999KA2021PTC184423</p>
            </div>
            <div className="footer-disclaimer">
              <strong>Disclaimer:</strong> The information on this website is provided for general 
              informational purposes only as a service to the broader internet community. It does not 
              constitute insurance or financial advice. Please consult with a certified insurance advisor 
              before making policy decisions.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
