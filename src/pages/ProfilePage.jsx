import { User, Mail, Phone, MapPin, Shield, Bell, Globe, LogOut } from 'lucide-react'
import './ProfilePage.css'

function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">Profile & Settings</h1>

        <div className="profile-grid">
          {/* Profile Info */}
          <div className="profile-section card">
            <div className="profile-header">
              <div className="profile-avatar-large">
                RK
              </div>
              <div>
                <h2 className="profile-name">Rajesh Kumar</h2>
                <p className="profile-email">rajesh.kumar@example.com</p>
                <span className="profile-badge">Premium Member</span>
              </div>
            </div>

            <div className="profile-info">
              <div className="info-item">
                <Phone size={18} />
                <div>
                  <div className="info-label">Phone Number</div>
                  <div className="info-value">+91 98765 43210</div>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={18} />
                <div>
                  <div className="info-label">Location</div>
                  <div className="info-value">New Delhi, India</div>
                </div>
              </div>
              <div className="info-item">
                <Shield size={18} />
                <div>
                  <div className="info-label">Policy Number</div>
                  <div className="info-value">POL-2024-456789</div>
                </div>
              </div>
            </div>

            <button className="btn btn-secondary">
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
                  <input type="checkbox" className="toggle" defaultChecked />
                </label>
                <label className="setting-option">
                  <div>
                    <div className="setting-label">SMS Alerts</div>
                    <div className="setting-desc">Important alerts on phone</div>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </label>
                <label className="setting-option">
                  <div>
                    <div className="setting-label">Claim Updates</div>
                    <div className="setting-desc">Notify on claim status changes</div>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
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
                  <select className="setting-select">
                    <option>English</option>
                    <option>हिन्दी</option>
                    <option>ગુજરાતી</option>
                  </select>
                </div>
                <label className="setting-option">
                  <div>
                    <div className="setting-label">Voice Explanations</div>
                    <div className="setting-desc">Enable audio explanations</div>
                  </div>
                  <input type="checkbox" className="toggle" />
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
                  <input type="checkbox" className="toggle" />
                </label>
                <div className="setting-option">
                  <div>
                    <div className="setting-label">Data Retention</div>
                    <div className="setting-desc">Auto-delete after 30 days</div>
                  </div>
                  <span className="setting-status">Active</span>
                </div>
              </div>
              <button className="btn btn-secondary">
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
          <button className="btn btn-danger">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
