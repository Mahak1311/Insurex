import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Mail, ArrowRight, Phone } from 'lucide-react'
import './AuthPages.css'

function LoginPage() {
  const navigate = useNavigate()
  const authRef = useRef(null)
  const [mouseX, setMouseX] = useState(0.5)
  const [mouseY, setMouseY] = useState(0.5)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [otpSent, setOtpSent] = useState(false)
  const [loginMode, setLoginMode] = useState('email') // 'email', 'phone', 'google'
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const apiBase = import.meta.env.VITE_API_BASE || ''

  // Validation functions
  const validateEmail = (email) => {
    const trimmed = email.trim()
    if (!trimmed) return 'Email address is required'
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(trimmed)) return 'Please enter a valid email address'
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

  const particles = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      speed: 60 + Math.random() * 120,
      direction: Math.random() > 0.5 ? 1 : -1,
      color: `rgba(${70 + Math.random() * 70}, ${120 + Math.random() * 70}, ${210 + Math.random() * 45}, ${0.3 + Math.random() * 0.35})`
    }))
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!authRef.current || window.innerWidth < 768) return
      const rect = authRef.current.getBoundingClientRect()
      setMouseX((e.clientX - rect.left) / rect.width)
      setMouseY((e.clientY - rect.top) / rect.height)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSendOTP = (e) => {
    e.preventDefault()
    
    let error = ''
    if (loginMode === 'email') {
      setTouched({ ...touched, email: true })
      error = validateEmail(email)
      setErrors({ email: error })
      
      if (error) {
        return // Don't proceed if validation fails
      }
      console.log('OTP sent to email:', email)
    } else if (loginMode === 'phone') {
      setTouched({ ...touched, phone: true })
      error = validatePhone(phone)
      setErrors({ phone: error })
      
      if (error) {
        return // Don't proceed if validation fails
      }
      console.log('OTP sent to phone:', phone)
    }
    
    setOtpSent(true)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Mark OTP as touched and validate
    setTouched({ ...touched, otp: true })
    const otpError = validateOTP(otp)
    setErrors({ otp: otpError })
    
    if (otpError) {
      return // Don't proceed if validation fails
    }
    
    // OTP validated successfully
    const userData = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      email: loginMode === 'email' ? email : `${phone}@phone.insurex`,
      name: loginMode === 'email' ? 'Email User' : 'Phone User',
      loginMethod: loginMode
    }
    localStorage.setItem('user', JSON.stringify(userData))
    navigate('/dashboard')
  }

  const handleDemoLogin = () => {
    navigate('/dashboard')
  }

  // Load Google Identity Services script
  useEffect(() => {
    if (!googleClientId) {
      console.warn('Missing VITE_GOOGLE_CLIENT_ID')
      return
    }
    console.log('Loading Google Identity script with clientId:', googleClientId)
    const existing = document.querySelector('script[data-google-identity]')
    if (existing) return
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.dataset.googleIdentity = 'true'
    script.onload = () => console.log('Google Identity script loaded')
    script.onerror = () => console.error('Failed to load Google Identity script')
    document.body.appendChild(script)
  }, [googleClientId])

  // Initialize Google button
  useEffect(() => {
    if (!googleClientId) return
    console.log('Attempting to initialize Google with apiBase:', apiBase)
    const maxAttempts = 20
    let attempts = 0
    const interval = setInterval(() => {
      attempts++
      if (window.google?.accounts?.id) {
        console.log('✓ Google Identity ready, initializing...')
        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: async (resp) => {
              console.log('✓ Google callback triggered')
              if (!resp?.credential) {
                console.error('✗ No credential in response')
                return
              }
              try {
                console.log('Sending token to:', `${apiBase}/api/auth/google`)
                const verify = await fetch(`${apiBase}/api/auth/google`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ token: resp.credential })
                })
                const data = await verify.json()
                console.log('Backend response:', verify.status, data)
                if (!verify.ok) throw new Error(data?.error || 'Login failed')
                localStorage.setItem('user', JSON.stringify(data.user))
                navigate('/dashboard')
              } catch (err) {
                console.error('Google login error:', err.message)
                alert(`Login failed: ${err.message}`)
              }
            },
            auto_select: false,
          })

          const container = document.getElementById('google-login-button')
          if (container) {
            container.innerHTML = ''
            window.google.accounts.id.renderButton(container, {
              theme: 'outline',
              size: 'large',
              shape: 'pill',
              width: 260,
            })
            console.log('✓ Google button rendered')
          }
          clearInterval(interval)
        } catch (err) {
          console.error('Google initialization error:', err.message)
        }
      } else if (attempts >= maxAttempts) {
        console.error('✗ Google Identity not loaded after', maxAttempts, 'attempts')
        clearInterval(interval)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [googleClientId, apiBase, navigate])

  return (
    <div className="auth-page" ref={authRef}>
      <div className="auth-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="auth-particle"
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
      <div className="auth-container">
        <div className="auth-card">
          <Link to="/" className="auth-logo">
            <Shield size={40} />
            <span>Insurex</span>
          </Link>

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to access your insurance dashboard</p>

          <form onSubmit={otpSent ? handleLogin : handleSendOTP} className="auth-form">
            {loginMode === 'email' && (
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (touched.email) {
                      setErrors({ ...errors, email: validateEmail(e.target.value) })
                    }
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, email: true })
                    setErrors({ ...errors, email: validateEmail(email) })
                  }}
                  required
                  disabled={otpSent}
                  className={errors.email && touched.email ? 'input-error' : ''}
                />
                {errors.email && touched.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            )}

            {loginMode === 'phone' && (
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10)
                    setPhone(cleaned)
                    if (touched.phone) {
                      setErrors({ ...errors, phone: validatePhone(cleaned) })
                    }
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, phone: true })
                    setErrors({ ...errors, phone: validatePhone(phone) })
                  }}
                  required
                  disabled={otpSent}
                  className={errors.phone && touched.phone ? 'input-error' : ''}
                  maxLength="10"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                {errors.phone && touched.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            )}

            {otpSent && (
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 6)
                    setOtp(cleaned)
                    if (touched.otp) {
                      setErrors({ ...errors, otp: validateOTP(cleaned) })
                    }
                  }}
                  onBlur={() => {
                    setTouched({ ...touched, otp: true })
                    setErrors({ ...errors, otp: validateOTP(otp) })
                  }}
                  maxLength="6"
                  required
                  className={`otp-input ${errors.otp && touched.otp ? 'input-error' : ''}`}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                {errors.otp && touched.otp && (
                  <span className="error-message">{errors.otp}</span>
                )}
                <button 
                  type="button" 
                  className="resend-link"
                  onClick={() => {
                    setOtp('')
                    setErrors({ ...errors, otp: '' })
                    setTouched({ ...touched, otp: false })
                    console.log('OTP resent')
                  }}
                >
                  Resend OTP
                </button>
              </div>
            )}

            {!otpSent && (
              <button type="submit" className="btn btn-primary btn-large auth-submit">
                Send OTP
                <ArrowRight size={20} />
              </button>
            )}

            {otpSent && (
              <button type="submit" className="btn btn-primary btn-large auth-submit">
                Verify & Login
                <ArrowRight size={20} />
              </button>
            )}
          </form>

          {!otpSent && (
            <>
              <div className="auth-divider">
                <span>or continue with</span>
              </div>

              <div className="social-auth">
                <div id="google-login-button" className="btn-social google-btn-placeholder">Sign in with Google</div>
                <button 
                  type="button"
                  className="btn-social"
                  onClick={() => setLoginMode('phone')}
                >
                  <Phone size={20} />
                  Login with Phone Number
                </button>
              </div>

              <div className="auth-divider">
                <span>or</span>
              </div>

              <button onClick={handleDemoLogin} className="btn btn-secondary btn-large">
                Continue as Demo User
              </button>
            </>
          )}

          {otpSent && (
            <button 
              type="button"
              onClick={() => {
                setOtpSent(false)
                setOtp('')
                setEmail('')
                setPhone('')
              }}
              className="resend-link"
              style={{ marginTop: '16px', textAlign: 'center', width: '100%' }}
            >
              Back to Login
            </button>
          )}

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
