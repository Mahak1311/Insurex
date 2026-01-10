import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Mail, User, Phone, ArrowRight } from 'lucide-react'
import './AuthPages.css'

function SignupPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: ''
  })
  const [otpSent, setOtpSent] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSendOTP = (e) => {
    e.preventDefault()
    setOtpSent(true)
  }

  const handleSignup = (e) => {
    e.preventDefault()
    navigate('/upload')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <Link to="/" className="auth-logo">
            <Shield size={40} />
            <span>Insurex</span>
          </Link>

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start understanding your insurance coverage today</p>

          <form onSubmit={otpSent ? handleSignup : handleSendOTP} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={otpSent}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={otpSent}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <Phone size={20} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={otpSent}
                />
              </div>
            </div>

            {otpSent && (
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={6}
                  required
                  className="otp-input"
                />
                <button type="button" className="resend-link">
                  Resend OTP
                </button>
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-large auth-submit">
              {otpSent ? 'Verify & Create Account' : 'Send OTP'}
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="auth-terms">
            By signing up, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
          </p>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>

        <div className="auth-visual">
          <div className="visual-content">
            <h2>Join thousands of Indians who've avoided billing surprises</h2>
            <div className="visual-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Instant bill analysis</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Coverage simulation</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Family policy tracking</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">Dispute assistance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
