import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Mail, ArrowRight } from 'lucide-react'
import './AuthPages.css'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOTP = (e) => {
    e.preventDefault()
    // Simulate OTP sending
    setOtpSent(true)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulate login
    navigate('/dashboard')
  }

  const handleDemoLogin = () => {
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <Link to="/" className="auth-logo">
            <Shield size={40} />
            <span>Insurex</span>
          </Link>

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to access your insurance dashboard</p>

          <form onSubmit={otpSent ? handleLogin : handleSendOTP} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={20} />
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
              {otpSent ? 'Verify & Login' : 'Send OTP'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button onClick={handleDemoLogin} className="btn btn-secondary btn-large">
            Continue as Demo User
          </button>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>

        <div className="auth-visual">
          <div className="visual-content">
            <h2>Understand your coverage in seconds</h2>
            <div className="visual-stats">
              <div className="stat">
                <div className="stat-value">10,000+</div>
                <div className="stat-label">Bills Analyzed</div>
              </div>
              <div className="stat">
                <div className="stat-value">₹2.5Cr+</div>
                <div className="stat-label">Savings Identified</div>
              </div>
              <div className="stat">
                <div className="stat-value">95%</div>
                <div className="stat-label">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
