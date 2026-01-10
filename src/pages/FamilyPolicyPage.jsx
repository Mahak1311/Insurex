import { useState } from 'react'
import { Users, AlertTriangle, CheckCircle, Plus, TrendingUp, UserPlus } from 'lucide-react'
import './FamilyPolicyPage.css'

function FamilyPolicyPage() {
  const [familyMembers, setFamilyMembers] = useState([])

  const gaps = []
  const overlaps = []

  const totalCoverage = familyMembers.reduce((sum, member) => sum + member.coverage, 0)
  const totalUsed = familyMembers.reduce((sum, member) => sum + member.used, 0)
  const totalClaims = familyMembers.reduce((sum, member) => sum + member.claims, 0)

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
          <button className="btn btn-primary">
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
              <button className="btn btn-primary btn-large">
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
    </div>
  )
}

export default FamilyPolicyPage
