import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Mail, User, Phone, ArrowRight, Check } from 'lucide-react'
import './AuthPages.css'

function SignupPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [otpSent, setOtpSent] = useState(false)

  // Validation functions
  const validateName = (name) => {
    const trimmed = name.trim()
    if (!trimmed) return 'Full name is required'
    if (trimmed.length < 2) return 'Name must be at least 2 characters'
    if (trimmed.length > 50) return 'Name must be less than 50 characters'
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return 'Name can only contain letters, spaces, and basic punctuation'
    if (!/[a-zA-Z]{2,}/.test(trimmed)) return 'Please enter a valid full name'
    return ''
  }

  const validateEmail = (email) => {
    const trimmed = email.trim()
    if (!trimmed) return 'Email address is required'
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(trimmed)) return 'Please enter a valid email address'
    if (trimmed.length > 100) return 'Email is too long'
    return ''
  }

  const validatePhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    if (!cleaned) return 'Phone number is required'
    if (cleaned.length !== 10) return 'Phone number must be 10 digits'
    if (!cleaned.startsWith('6') && !cleaned.startsWith('7') && !cleaned.startsWith('8') && !cleaned.startsWith('9')) {
      return 'Please enter a valid Indian mobile number'
    }
    return ''
  }

  const validateOTP = (otp) => {
    if (!otp) return 'OTP is required'
    if (!/^\d{6}$/.test(otp)) return 'OTP must be 6 digits'
    return ''
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    let processedValue = value

    // Format phone number - only allow digits
    if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, 10)
    }

    // Format OTP - only allow digits
    if (name === 'otp') {
      processedValue = value.replace(/\D/g, '').slice(0, 6)
    }

    // Limit name length
    if (name === 'name') {
      processedValue = value.slice(0, 50)
    }

    setFormData({ ...formData, [name]: processedValue })

    // Validate on change if field was touched
    if (touched[name]) {
      validateField(name, processedValue)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched({ ...touched, [name]: true })
    validateField(name, formData[name])
  }

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'name':
        error = validateName(value)
        break
      case 'email':
        error = validateEmail(value)
        break
      case 'phone':
        error = validatePhone(value)
        break
      case 'otp':
        error = validateOTP(value)
        break
      default:
        break
    }
    setErrors({ ...errors, [name]: error })
    return error
  }

  const handleSendOTP = (e) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true })

    // Validate all fields
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const phoneError = validatePhone(formData.phone)

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError
    })

    // Check if there are any errors
    if (nameError || emailError || phoneError) {
      return // Don't proceed if validation fails
    }

    // All validations passed - send OTP
    console.log('Sending OTP to:', formData.phone)
    setOtpSent(true)
  }

  const handleSignup = (e) => {
    e.preventDefault()

    // Mark OTP as touched
    setTouched({ ...touched, otp: true })

    // Validate OTP
    const otpError = validateOTP(formData.otp)
    setErrors({ ...errors, otp: otpError })

    if (otpError) {
      return // Don't proceed if validation fails
    }

    // All validations passed - create account
    console.log('Creating account for:', formData.name)
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
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={otpSent}
                className={errors.name && touched.name ? 'input-error' : ''}
              />
              {errors.name && touched.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={otpSent}
                className={errors.email && touched.email ? 'input-error' : ''}
              />
              {errors.email && touched.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                disabled={otpSent}
                className={errors.phone && touched.phone ? 'input-error' : ''}
                maxLength="10"
              />
              {errors.phone && touched.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
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
                  onBlur={handleBlur}
                  maxLength="6"
                  required
                  className={`otp-input ${errors.otp && touched.otp ? 'input-error' : ''}`}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                {errors.otp && touched.otp && (
                  <span className="error-message">{errors.otp}</span>
                )}
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

          {!otpSent && (
            <>
              <div className="auth-divider">
                <span>or continue with</span>
              </div>

              <div className="social-auth">
                <button className="btn-social">
                  <img src="https://www.google.com/favicon.ico" alt="Google" />
                  Sign up with Google
                </button>
                <button className="btn-social">
                  <Mail size={20} />
                  Sign up with Gmail
                </button>
                <button className="btn-social" onClick={() => setOtpSent(true)}>
                  <Phone size={20} />
                  Sign up with Phone Number
                </button>
              </div>
            </>
          )}

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
                <div className="feature-icon"><Check size={24} /></div>
                <div className="feature-text">Instant bill analysis</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Check size={24} /></div>
                <div className="feature-text">Coverage simulation</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Check size={24} /></div>
                <div className="feature-text">Family policy tracking</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><Check size={24} /></div>
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
