import { useState } from 'react'
import { User, Mail, Phone, MapPin, Shield, Bell, Globe, LogOut, X, Check, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './ProfilePage.css'

function ProfilePage() {
  const navigate = useNavigate()
  
  // State management
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    policyNumber: 'POL-2024-456789'
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    claims: true
  })

  const [settings, setSettings] = useState({
    language: 'English',
    voiceExplanations: false,
    twoFactorAuth: false
  })

  const [showEditModal, setShowEditModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [editForm, setEditForm] = useState({ ...profileData })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [saveStatus, setSaveStatus] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Handlers
  const handleEditProfile = () => {
    setEditForm({ ...profileData })
    setShowEditModal(true)
  }

  const handleSaveProfile = () => {
    setProfileData({ ...editForm })
    setSaveStatus('Profile updated successfully!')
    setTimeout(() => {
      setShowEditModal(false)
      setSaveStatus('')
    }, 1500)
  }

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleLanguageChange = (e) => {
    setSettings(prev => ({ ...prev, language: e.target.value }))
    // In a real app, this would trigger i18n language change
    console.log('Language changed to:', e.target.value)
  }

  const handleVoiceToggle = () => {
    const newValue = !settings.voiceExplanations
    setSettings(prev => ({ ...prev, voiceExplanations: newValue }))
    
    if (newValue) {
      // Test voice explanation
      speakText('Voice explanations have been enabled. I can now read out information to help you understand your insurance coverage better.')
    } else {
      // Stop any ongoing speech
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.9
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utterance)
    } else {
      alert('Text-to-speech is not supported in your browser')
    }
  }

  const handleTwoFactorToggle = () => {
    setSettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))
    const message = !settings.twoFactorAuth 
      ? 'Two-Factor Authentication has been enabled. You will receive an OTP for login.'
      : 'Two-Factor Authentication has been disabled.'
    alert(message)
  }

  const handleChangePassword = () => {
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setShowPasswordModal(true)
  }

  const handleSavePassword = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      alert('Please fill all password fields')
      return
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match')
      return
    }

    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }

    // In a real app, this would make an API call
    setSaveStatus('Password changed successfully!')
    setTimeout(() => {
      setShowPasswordModal(false)
      setSaveStatus('')
    }, 1500)
  }

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      // Stop any ongoing speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
      // In a real app, this would clear auth tokens
      navigate('/login')
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">Profile & Settings</h1>

        <div className="profile-grid">
          {/* Profile Info */}
          <div className="profile-section card">
            <div className="profile-header">
              <div className="profile-avatar-large">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="profile-name">{profileData.name}</h2>
                <p className="profile-email">{profileData.email}</p>
                <span className="profile-badge">Premium Member</span>
              </div>
            </div>

            <div className="profile-info">
              <div className="info-item">
                <Phone size={18} />
                <div>
                  <div className="info-label">Phone Number</div>
                  <div className="info-value">{profileData.phone}</div>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <div className="info-label">Location</div>
                  <div className="info-value">{profileData.location}</div>
                </div>
              </div>
              <div className="info-item">
                <Shield size={18} />
                <div>
                  <div className="info-label">Policy Number</div>
                  <div className="info-value">{profileData.policyNumber}</div>
                </div>
              </div>
            </div>

            <button className="btn btn-secondary" onClick={handleEditProfile}>
              Edit Profile
            </button>
          </div>

          {/* Settings */}
          <div className="settings-section">
            <div className="settings-card card">
              <h3 className="settings-title">
                <Bell size={20} />
                Notifications
              </h3>
              <div className="settings-options">
                <label className="setting-option">
                  <div>
                    <div className="setting-label">Email Notifications</div>
                    <div className="setting-desc">Receive updates via email</div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle" 
                    checked={notifications.email}
                    onChange={() => handleNotificationToggle('email')}
                  />
                </label>
                <label className="setting-option">
                  <div>
                    <div className="setting-label">SMS Alerts</div>
                    <div className="setting-desc">Important alerts on phone</div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle" 
                    checked={notifications.sms}
                    onChange={() => handleNotificationToggle('sms')}
                  />
                </label>
                <label className="setting-option">
                  <div>
                    <div className="setting-label">Claim Updates</div>
                    <div className="setting-desc">Notify on claim status changes</div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle" 
                    checked={notifications.claims}
                    onChange={() => handleNotificationToggle('claims')}
                  />
                </label>
              </div>
            </div>

            <div className="settings-card card">
              <h3 className="settings-title">
                <Globe size={20} />
                Language & Region
              </h3>
              <div className="settings-options">
                <div className="setting-option">
                  <div>
                    <div className="setting-label">Language</div>
                    <div className="setting-desc">Choose your preferred language</div>
                  </div>
                  <select 
                    className="setting-select"
                    value={settings.language}
                    onChange={handleLanguageChange}
                  >
                    <option>English</option>
                    <option>हिन्दी</option>
                    <option>ગુજરાતી</option>
                  </select>
                </div>
                <label className="setting-option">
                  <div>
                    <div className="setting-label">Voice Explanations</div>
                    <div className="setting-desc">
                      Enable audio explanations {isSpeaking && <span className="voice-indicator">🔊 Speaking...</span>}
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle"
                    checked={settings.voiceExplanations}
                    onChange={handleVoiceToggle}
                  />
                </label>
              </div>
            </div>

            <div className="settings-card card">
              <h3 className="settings-title">
                <Shield size={20} />
                Privacy & Security
              </h3>
              <div className="settings-options">
                <label className="setting-option">
                  <div>
                    <div className="setting-label">Two-Factor Authentication</div>
                    <div className="setting-desc">Add extra security layer</div>
                  </div>
                  <input 
                    type="checkbox" 
                    className="toggle"
                    checked={settings.twoFactorAuth}
                    onChange={handleTwoFactorToggle}
                  />
                </label>
                <div className="setting-option">
                  <div>
                    <div className="setting-label">Data Retention</div>
                    <div className="setting-desc">Auto-delete after 30 days</div>
                  </div>
                  <span className="setting-status">Active</span>
                </div>
              </div>
              <button className="btn btn-secondary" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Insurance Policies */}
        <div className="policies-section card">
          <h2 className="section-title">Your Insurance Policies</h2>
          <div className="policies-grid">
            <div className="policy-card">
              <div className="policy-header">
                <Shield className="policy-icon" />
                <div>
                  <h3 className="policy-name">Star Health Family Plan</h3>
                  <p className="policy-number">POL-2024-456789</p>
                </div>
              </div>
              <div className="policy-details">
                <div className="policy-detail">
                  <span>Coverage</span>
                  <strong>₹5,00,000</strong>
                </div>
                <div className="policy-detail">
                  <span>Valid Until</span>
                  <strong>Dec 31, 2024</strong>
                </div>
              </div>
              <button className="btn btn-secondary">
                View Policy
              </button>
            </div>

            <div className="policy-card">
              <div className="policy-header">
                <Shield className="policy-icon" />
                <div>
                  <h3 className="policy-name">Senior Citizen Care</h3>
                  <p className="policy-number">POL-2024-789012</p>
                </div>
              </div>
              <div className="policy-details">
                <div className="policy-detail">
                  <span>Coverage</span>
                  <strong>₹3,00,000</strong>
                </div>
                <div className="policy-detail">
                  <span>Valid Until</span>
                  <strong>Mar 15, 2025</strong>
                </div>
              </div>
              <button className="btn btn-secondary">
                View Policy
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button className="btn btn-danger" onClick={handleSignOut}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit Profile</h2>
                <button className="modal-close" onClick={() => setShowEditModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    placeholder="Enter your location"
                  />
                </div>

                {saveStatus && (
                  <div className="save-status success">
                    <Check size={18} />
                    {saveStatus}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
            <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Change Password</h2>
                <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                    <button 
                      className="password-toggle"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    >
                      {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Enter new password (min 8 characters)"
                    />
                    <button 
                      className="password-toggle"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    >
                      {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                    />
                    <button 
                      className="password-toggle"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    >
                      {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {saveStatus && (
                  <div className="save-status success">
                    <Check size={18} />
                    {saveStatus}
                  </div>
                )}

                <div className="password-requirements">
                  <small>
                    <strong>Password Requirements:</strong>
                    <ul>
                      <li>At least 8 characters long</li>
                      <li>Mix of letters and numbers recommended</li>
                      <li>Avoid common passwords</li>
                    </ul>
                  </small>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSavePassword}>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
