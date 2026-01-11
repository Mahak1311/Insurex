import { useState } from 'react'
import { Users, AlertTriangle, CheckCircle, Plus, TrendingUp, UserPlus, X } from 'lucide-react'
import './FamilyPolicyPage.css'

function FamilyPolicyPage() {
  const [familyMembers, setFamilyMembers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    relation: '',
    age: '',
    coverage: '',
    used: '',
    claims: ''
  })

  const gaps = []
  const overlaps = []

  const totalCoverage = familyMembers.reduce((sum, member) => sum + member.coverage, 0)
  const totalUsed = familyMembers.reduce((sum, member) => sum + member.used, 0)
  const totalClaims = familyMembers.reduce((sum, member) => sum + member.claims, 0)

  const handleOpenModal = () => {
    setShowModal(true)
    setFormData({
      name: '',
      relation: '',
      age: '',
      coverage: '',
      used: '',
      claims: ''
    })
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMember = {
      id: Date.now(),
      name: formData.name,
      relation: formData.relation,
      age: parseInt(formData.age),
      coverage: parseInt(formData.coverage),
      used: parseInt(formData.used || 0),
      remaining: parseInt(formData.coverage) - parseInt(formData.used || 0),
      status: (parseInt(formData.used || 0) / parseInt(formData.coverage)) > 0.9 ? 'warning' : 'active',
      claims: parseInt(formData.claims || 0)
    }
    setFamilyMembers([...familyMembers, newMember])
    setShowModal(false)
  }

  return (
    <div className="family-policy-page">
      <div className="container">
        <div className="family-header">
          <div>
            <h1 className="page-title">Family Policy Manager</h1>
            <p className="page-subtitle">
              Track coverage for all family members in one place
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleOpenModal}>
            <Plus size={18} />
            Add Family Member
          </button>
        </div>

        {/* Overall Summary */}
        <div className="family-summary-grid">
          <div className="family-summary-card total">
            <div className="summary-icon">
              <Users size={28} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Total Members</div>
              <div className="summary-value">{familyMembers.length}</div>
            </div>
          </div>

          <div className="family-summary-card coverage">
            <div className="summary-icon">
              <CheckCircle size={28} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Total Coverage</div>
              <div className="summary-value">₹{totalCoverage > 0 ? (totalCoverage / 100000).toFixed(1) + 'L' : '0'}</div>
            </div>
          </div>

          <div className="family-summary-card used">
            <div className="summary-icon">
              <TrendingUp size={28} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Amount Used</div>
              <div className="summary-value">₹{totalUsed > 0 ? (totalUsed / 100000).toFixed(2) + 'L' : '0'}</div>
              <div className="summary-percent">{totalCoverage > 0 ? Math.round((totalUsed / totalCoverage) * 100) : 0}% utilized</div>
            </div>
          </div>

          <div className="family-summary-card claims">
            <div className="summary-icon">
              <AlertTriangle size={28} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Active Claims</div>
              <div className="summary-value">{totalClaims}</div>
              <div className="summary-percent">This year</div>
            </div>
          </div>
        </div>

        {/* Member Cards */}
        <div className="members-section">
          <h2 className="section-title">Family Members</h2>
          {familyMembers.length === 0 ? (
            <div className="empty-state card">
              <UserPlus size={64} className="empty-icon" />
              <h3 className="empty-title">No Family Members Added Yet</h3>
              <p className="empty-description">
                Start by adding your family members to track their insurance coverage and claims in one place.
              </p>
              <button className="btn btn-primary btn-large" onClick={handleOpenModal}>
                <Plus size={20} />
                Add Your First Member
              </button>
            </div>
          ) : (
            <div className="members-grid">
              {familyMembers.map(member => (
              <div key={member.id} className={`member-card card ${member.status}`}>
                <div className="member-header">
                  <div className="member-avatar">
                    {member.name.charAt(0)}
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-relation">{member.relation} • {member.age} years</p>
                  </div>
                  {member.status === 'warning' && (
                    <div className="warning-badge">
                      <AlertTriangle size={16} />
                    </div>
                  )}
                </div>

                <div className="coverage-section">
                  <div className="coverage-stats">
                    <div className="coverage-stat">
                      <div className="stat-label">Total Coverage</div>
                      <div className="stat-value">₹{(member.coverage / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="coverage-stat">
                      <div className="stat-label">Used</div>
                      <div className="stat-value red">₹{(member.used / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="coverage-stat">
                      <div className="stat-label">Remaining</div>
                      <div className="stat-value green">₹{(member.remaining / 1000).toFixed(0)}K</div>
                    </div>
                  </div>

                  <div className="coverage-bar">
                    <div 
                      className="coverage-fill"
                      style={{ width: `${(member.used / member.coverage) * 100}%` }}
                    ></div>
                  </div>
                  <p className="coverage-text">
                    {Math.round((member.used / member.coverage) * 100)}% coverage utilized
                  </p>
                </div>

                <div className="member-actions">
                  <button className="btn btn-secondary btn-small">
                    View Claims ({member.claims})
                  </button>
                  <button className="btn btn-secondary btn-small">
                    Policy Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* Gaps and Overlaps */}
        {(gaps.length > 0 || overlaps.length > 0) && (
        <div className="insights-grid">
          {gaps.length > 0 && (
          <div className="insights-card card gaps">
            <h3 className="insights-title">
              <AlertTriangle size={20} />
              Coverage Gaps Detected
            </h3>
            <div className="insights-list">
              {gaps.map((gap, index) => (
                <div key={index} className="insight-item">
                  <div className="insight-dot danger"></div>
                  <span>{gap}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary">
              Get Coverage Recommendations
            </button>
          </div>
          )}

          {overlaps.length > 0 && (
          <div className="insights-card card overlaps">
            <h3 className="insights-title">
              <CheckCircle size={20} />
              Policy Overlaps
            </h3>
            <div className="insights-list">
              {overlaps.map((overlap, index) => (
                <div key={index} className="insight-item">
                  <div className="insight-dot warning"></div>
                  <span>{overlap}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary">
              Optimize Policies
            </button>
          </div>
          )}
        </div>
        )}

        {/* Savings Tracker */}
        {familyMembers.length > 0 && (
        <div className="savings-card card">
          <div className="savings-header">
            <div>
              <h2 className="section-title">Savings Tracker</h2>
              <p className="savings-subtitle">Money saved by using Insurex</p>
            </div>
            <div className="savings-badge">
              <TrendingUp size={24} />
              <div>
                <div className="savings-amount">₹45,000</div>
                <div className="savings-label">Total Saved</div>
              </div>
            </div>
          </div>

          <div className="savings-items">
            <div className="savings-item">
              <CheckCircle className="savings-icon" />
              <div className="savings-content">
                <div className="savings-item-title">Avoided overbilling for room charges</div>
                <div className="savings-item-amount">₹25,000</div>
              </div>
            </div>
            <div className="savings-item">
              <CheckCircle className="savings-icon" />
              <div className="savings-content">
                <div className="savings-item-title">Successfully disputed excluded charges</div>
                <div className="savings-item-amount">₹12,000</div>
              </div>
            </div>
            <div className="savings-item">
              <CheckCircle className="savings-icon" />
              <div className="savings-content">
                <div className="savings-item-title">Found cashless hospital alternative</div>
                <div className="savings-item-amount">₹8,000</div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Add Member Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add Family Member</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Relation *</label>
                  <select
                    name="relation"
                    value={formData.relation}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select relation</option>
                    <option value="Self">Self</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter age"
                    min="0"
                    max="120"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Coverage Amount (₹) *</label>
                  <input
                    type="number"
                    name="coverage"
                    value={formData.coverage}
                    onChange={handleInputChange}
                    placeholder="e.g., 500000"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Amount Used (₹)</label>
                  <input
                    type="number"
                    name="used"
                    value={formData.used}
                    onChange={handleInputChange}
                    placeholder="e.g., 45000"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Number of Claims</label>
                  <input
                    type="number"
                    name="claims"
                    value={formData.claims}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Plus size={18} />
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default FamilyPolicyPage
