import { Link } from 'react-router-dom'
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
  Sparkles
} from 'lucide-react'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
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
          <h2 className="section-title">How ClearCare Works</h2>
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

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Shield size={28} />
              <span>ClearCare</span>
            </div>
            <p className="footer-text">
              Making healthcare insurance transparent for every Indian family.
            </p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
