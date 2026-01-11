import { useState, useMemo } from 'react'
import { 
  PieChart, 
  Download, 
  Share2, 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  FileText,
  Filter,
  Info,
  Heart,
  ArrowRight,
  Copy,
  Phone,
  Mail,
  Shield as ShieldIcon
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './DashboardPage.css'
import { analyzeCoverage } from '../lib/coverageEngine'
import { getDisputeSummary, generateDisputeScript } from '../lib/disputeForecaster'

function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [billItems, setBillItems] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showPolicyForm, setShowPolicyForm] = useState(false)
  const [showDisputeModal, setShowDisputeModal] = useState(false)
  const [selectedDispute, setSelectedDispute] = useState(null)
  const [copiedText, setCopiedText] = useState('')
  const [formData, setFormData] = useState({
    item: '',
    category: 'room',
    cost: '',
    days: ''
  })
  const [policyForm, setPolicyForm] = useState({
    roomRentCapPerDay: '',
    coveredProceduresCSV: '',
    excludedItemsCSV: '',
    diagnosticCoveragePercent: '',
    coPayPercent: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handlePolicyInputChange = (e) => {
    const { name, value } = e.target
    setPolicyForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newItem = {
      id: Date.now(),
      name: formData.item,
      category: formData.category,
      cost: parseInt(formData.cost),
      days: formData.days ? parseInt(formData.days) : undefined
    }
    setBillItems([...billItems, newItem])
    setFormData({ item: '', category: 'room', cost: '', days: '' })
    setShowAddForm(false)
  }

  const normalizedPolicy = useMemo(() => ({
    roomRentCapPerDay: policyForm.roomRentCapPerDay ? parseInt(policyForm.roomRentCapPerDay) : 0,
    coveredProcedures: policyForm.coveredProceduresCSV ? policyForm.coveredProceduresCSV.split(',').map(s => s.trim()).filter(Boolean) : [],
    excludedItems: policyForm.excludedItemsCSV ? policyForm.excludedItemsCSV.split(',').map(s => s.trim()).filter(Boolean) : [],
    diagnosticCoveragePercent: policyForm.diagnosticCoveragePercent ? parseInt(policyForm.diagnosticCoveragePercent) : 0,
    coPayPercent: policyForm.coPayPercent ? parseInt(policyForm.coPayPercent) : 0
  }), [policyForm])

  const analysis = useMemo(() => analyzeCoverage(normalizedPolicy, billItems), [normalizedPolicy, billItems])

  // Dispute forecaster analysis
  const disputeAnalysis = useMemo(() => {
    if (analysis.breakdown.length === 0) return { disputes: [], summary: {} }
    return getDisputeSummary(analysis.breakdown, normalizedPolicy)
  }, [analysis.breakdown, normalizedPolicy])

  const billData = {
    totalBill: analysis.summary.totalBill,
    covered: analysis.summary.coveredAmount,
    partialCover: analysis.summary.partiallyCoveredAmount,
    notCovered: analysis.summary.notCoveredAmount,
    outOfPocket: analysis.summary.outOfPocket
  }

  const filteredItems = analysis.breakdown.filter(item => 
    activeFilter === 'all' || 
    (activeFilter === 'covered' && item.status === 'covered') ||
    (activeFilter === 'partial' && item.status === 'partially_covered') ||
    (activeFilter === 'excluded' && item.status === 'not_covered')
  )

  const handleCopyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      alert('Failed to copy to clipboard')
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      covered: { label: 'Covered', class: 'badge-success', icon: CheckCircle },
      partially_covered: { label: 'Partial', class: 'badge-warning', icon: AlertTriangle },
      not_covered: { label: 'Excluded', class: 'badge-danger', icon: XCircle }
    }
    const badge = badges[status]
    const Icon = badge.icon
    return (
      <span className={`badge ${badge.class}`}>
        <Icon size={12} />
        {badge.label}
      </span>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Coverage Breakdown</h1>
            <p className="page-subtitle">Hospital Bill Analysis</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => setShowPolicyForm(true)}>
              <FileText size={18} />
              Edit Policy Rules
            </button>
            {analysis.breakdown.length > 0 && (
              <>
                <button className="btn btn-secondary">
                  <Share2 size={18} />
                  Share
                </button>
                <button className="btn btn-primary">
                  <Download size={18} />
                  Export PDF
                </button>
              </>
            )}
          </div>
        </div>

        {/* Pre-Hospitalization Banner */}
        <div className="pre-hosp-banner">
          <div className="banner-content">
            <Heart className="banner-icon" size={40} />
            <div className="banner-text">
              <h3>Planning a procedure?</h3>
              <p>Get cost estimates and coverage clarity BEFORE treatment begins</p>
            </div>
          </div>
          <Link to="/pre-hospitalization" className="banner-button">
            Check Coverage Now
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Empty State or Add Button */}
        {analysis.breakdown.length === 0 ? (
          <div className="empty-state">
            <FileText size={64} className="empty-icon" />
            <h2>No Bill Items Added</h2>
            <p>Start by adding items from your hospital bill to see coverage breakdown</p>
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
              Add Your First Bill Item
            </button>
          </div>
        ) : (
          <div className="add-item-button-container">
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
              Add Bill Item
            </button>
          </div>
        )}

        {/* Add Item Modal */}
        {showAddForm && (
          <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Add Bill Item</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Item Name*</label>
                  <input
                    type="text"
                    name="item"
                    value={formData.item}
                    onChange={handleInputChange}
                    placeholder="e.g., Room Charges, Surgery"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category*</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} required>
                      <option value="room">Room</option>
                      <option value="procedure">Procedure</option>
                      <option value="diagnostic">Diagnostic</option>
                      <option value="medicine">Medicine</option>
                      <option value="consumable">Consumable</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Cost (₹)*</label>
                    <input
                      type="number"
                      name="cost"
                      value={formData.cost}
                      onChange={handleInputChange}
                      placeholder="10000"
                      required
                    />
                  </div>
                </div>
                {formData.category === 'room' && (
                  <div className="form-group">
                    <label>Days (for room)*</label>
                    <input
                      type="number"
                      name="days"
                      value={formData.days}
                      onChange={handleInputChange}
                      placeholder="3"
                    />
                  </div>
                )}
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Policy Rules Modal */}
        {showPolicyForm && (
          <div className="modal-overlay" onClick={() => setShowPolicyForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Edit Policy Rules</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Room Rent Cap Per Day (₹)</label>
                  <input type="number" name="roomRentCapPerDay" value={policyForm.roomRentCapPerDay} onChange={handlePolicyInputChange} placeholder="5000" />
                </div>
                <div className="form-group">
                  <label>Diagnostic Coverage %</label>
                  <input type="number" name="diagnosticCoveragePercent" value={policyForm.diagnosticCoveragePercent} onChange={handlePolicyInputChange} placeholder="50" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Co-pay %</label>
                  <input type="number" name="coPayPercent" value={policyForm.coPayPercent} onChange={handlePolicyInputChange} placeholder="10" />
                </div>
                <div className="form-group">
                  <label>Covered Procedures (comma-separated)</label>
                  <input type="text" name="coveredProceduresCSV" value={policyForm.coveredProceduresCSV} onChange={handlePolicyInputChange} placeholder="Appendectomy, Cataract" />
                </div>
              </div>
              <div className="form-group">
                <label>Excluded Items (comma-separated)</label>
                <input type="text" name="excludedItemsCSV" value={policyForm.excludedItemsCSV} onChange={handlePolicyInputChange} placeholder="Physiotherapy, Deluxe Room" />
              </div>
              <div className="form-actions">
                <button className="btn btn-secondary" onClick={() => setShowPolicyForm(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        {analysis.breakdown.length > 0 && (
        <div className="summary-grid">
          <div className="summary-card total">
            <div className="summary-icon">
              <FileText size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Total Bill Amount</div>
              <div className="summary-value">₹{billData.totalBill.toLocaleString()}</div>
            </div>
          </div>

          <div className="summary-card covered">
            <div className="summary-icon">
              <CheckCircle size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Covered Amount</div>
              <div className="summary-value">₹{billData.covered.toLocaleString()}</div>
              <div className="summary-percent">{Math.round((billData.covered / billData.totalBill) * 100)}% covered</div>
            </div>
          </div>

          <div className="summary-card partial">
            <div className="summary-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Partially Covered</div>
              <div className="summary-value">₹{billData.partialCover.toLocaleString()}</div>
              <div className="summary-percent">{Math.round((billData.partialCover / billData.totalBill) * 100)}% partial</div>
            </div>
          </div>

          <div className="summary-card excluded">
            <div className="summary-icon">
              <XCircle size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Not Covered</div>
              <div className="summary-value">₹{billData.notCovered.toLocaleString()}</div>
              <div className="summary-percent">{Math.round((billData.notCovered / billData.totalBill) * 100)}% excluded</div>
            </div>
          </div>

          <div className="summary-card oop">
            <div className="summary-icon">
              <AlertCircle size={24} />
            </div>
            <div className="summary-content">
              <div className="summary-label">Your Out-of-Pocket</div>
              <div className="summary-value highlight">₹{billData.outOfPocket.toLocaleString()}</div>
              <div className="summary-percent">{Math.round((billData.outOfPocket / billData.totalBill) * 100)}% of total</div>
            </div>
          </div>
        </div>
        )}

        {/* Visual Chart */}
        {analysis.breakdown.length > 0 && (
        <div className="chart-section card">
          <h2 className="section-title">Coverage Distribution</h2>
          <div className="chart-container">
            <div className="pie-chart">
              <PieChart size={200} />
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-dot covered"></div>
                <div>
                  <div className="legend-label">Covered</div>
                  <div className="legend-value">₹{billData.covered.toLocaleString()}</div>
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-dot partial"></div>
                <div>
                  <div className="legend-label">Partial Coverage</div>
                  <div className="legend-value">₹{billData.partialCover.toLocaleString()}</div>
                </div>
              </div>
              <div className="legend-item">
                <div className="legend-dot excluded"></div>
                <div>
                  <div className="legend-label">Not Covered</div>
                  <div className="legend-value">₹{billData.notCovered.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Detailed Breakdown */}
        {analysis.breakdown.length > 0 && (
        <div className="breakdown-section card">
          <div className="breakdown-header">
            <h2 className="section-title">Detailed Bill Items</h2>
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Items
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'covered' ? 'active' : ''}`}
                onClick={() => setActiveFilter('covered')}
              >
                <Filter size={14} />
                Covered
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'partial' ? 'active' : ''}`}
                onClick={() => setActiveFilter('partial')}
              >
                <Filter size={14} />
                Partial
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'excluded' ? 'active' : ''}`}
                onClick={() => setActiveFilter('excluded')}
              >
                <Filter size={14} />
                Excluded
              </button>
            </div>
          </div>

          <div className="bill-items-table">
            <div className="table-header">
              <div>Bill Item</div>
              <div>Cost</div>
              <div>Coverage</div>
              <div>Status</div>
              <div>Explanation</div>
            </div>
            {filteredItems.map((item, idx) => (
              <div key={idx} className="table-row">
                <div className="item-name">{item.itemName}</div>
                <div className="item-cost">₹{item.originalCost.toLocaleString()}</div>
                <div className="item-coverage">
                  <div className="coverage-bar">
                    <div 
                      className={`coverage-fill ${item.status}`} 
                      style={{ width: `${Math.round((item.coveredCost / Math.max(1, item.originalCost)) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="coverage-text">₹{item.coveredCost.toLocaleString()} covered</span>
                </div>
                <div className="item-status">
                  {getStatusBadge(item.status)}
                </div>
                <div className="item-explanation">
                  <Info size={14} />
                  <span>{item.explanation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* AI Dispute Forecaster */}
        {disputeAnalysis.disputes.length > 0 && (
          <div className="dispute-forecaster-section">
            <div className="section-header-with-badge">
              <div>
                <h2 className="section-title">🤖 AI Dispute Forecaster</h2>
                <p className="section-subtitle">Automated analysis of potentially disputable charges</p>
              </div>
              <div className="dispute-summary-badges">
                <div className="summary-badge high">
                  <AlertCircle size={16} />
                  <span>{disputeAnalysis.summary.highRiskCount} High Risk</span>
                </div>
                <div className="summary-badge medium">
                  <AlertTriangle size={16} />
                  <span>{disputeAnalysis.summary.mediumRiskCount} Medium</span>
                </div>
                <div className="summary-badge low">
                  <Info size={16} />
                  <span>{disputeAnalysis.summary.lowRiskCount} Low</span>
                </div>
              </div>
            </div>

            <div className="dispute-stats-card">
              <div className="dispute-stat">
                <div className="stat-value">₹{disputeAnalysis.summary.totalDisputableAmount.toLocaleString()}</div>
                <div className="stat-label">Total Disputable Amount</div>
              </div>
              <div className="dispute-stat">
                <div className="stat-value">{disputeAnalysis.summary.averageSuccessRate}%</div>
                <div className="stat-label">Avg. Success Rate</div>
              </div>
              <div className="dispute-stat">
                <div className="stat-value">{disputeAnalysis.summary.totalDisputeCount}</div>
                <div className="stat-label">Items to Review</div>
              </div>
            </div>

            <div className="dispute-cards-grid">
              {disputeAnalysis.disputes.map((dispute, idx) => {
                const itemDetails = {
                  itemName: dispute.itemName,
                  originalCost: dispute.itemCost,
                  coveredCost: dispute.coveredCost
                }
                const scripts = generateDisputeScript(dispute, itemDetails)

                return (
                  <div key={idx} className={`dispute-card dispute-${dispute.riskLevel}`}>
                    <div className="dispute-header">
                      <div className="dispute-risk-badge">
                        {dispute.riskLevel === 'high' && <AlertCircle size={18} />}
                        {dispute.riskLevel === 'medium' && <AlertTriangle size={18} />}
                        {dispute.riskLevel === 'low' && <Info size={18} />}
                        <span>{dispute.riskLevel.toUpperCase()} RISK</span>
                      </div>
                      <div className="dispute-success-rate">
                        {dispute.successRate}% success rate
                      </div>
                    </div>

                    <h3 className="dispute-title">{dispute.reason}</h3>
                    <div className="dispute-amount">
                      <span className="amount-label">Disputable:</span>
                      <span className="amount-value">₹{dispute.uncoveredAmount.toLocaleString()}</span>
                    </div>

                    <div className="dispute-item-info">
                      <strong>Item:</strong> {dispute.itemName}<br />
                      <strong>Billed:</strong> ₹{dispute.itemCost.toLocaleString()} | 
                      <strong> Covered:</strong> ₹{dispute.coveredCost.toLocaleString()}
                    </div>

                    <div className="dispute-details">
                      <p><strong>Why this may be disputable:</strong></p>
                      <p>{dispute.disputeReason}</p>
                    </div>

                    <div className="dispute-actions-points">
                      <p><strong>Action points:</strong></p>
                      <ul>
                        {dispute.actionPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="dispute-actions">
                      <button 
                        className="btn-dispute-action primary"
                        onClick={() => {
                          setSelectedDispute({ dispute, itemDetails, scripts })
                          setShowDisputeModal(true)
                        }}
                      >
                        <Phone size={16} />
                        Get Call Script
                      </button>
                      <button 
                        className="btn-dispute-action secondary"
                        onClick={() => handleCopyToClipboard(scripts.emailScript, `email-${idx}`)}
                      >
                        {copiedText === `email-${idx}` ? (
                          <><CheckCircle size={16} /> Copied!</>
                        ) : (
                          <><Copy size={16} /> Copy Email</>
                        )}
                      </button>
                    </div>

                    <div className="dispute-disclaimer">
                      ⚠️ <strong>Dispute Guidance:</strong> This analysis is for informational purposes. 
                      Success depends on policy terms and documentation. No guarantee of claim approval.
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="dispute-info-footer">
              <ShieldIcon size={20} />
              <div>
                <strong>IRDAI Regulation:</strong> Insurance companies must respond to disputes within 15 days 
                and provide clear written reasons for claim rejections. You have the right to escalate to 
                the Insurance Ombudsman if unsatisfied.
              </div>
            </div>
          </div>
        )}

        {/* Dispute Script Modal */}
        {showDisputeModal && selectedDispute && (
          <div className="modal-overlay" onClick={() => setShowDisputeModal(false)}>
            <div className="modal-content dispute-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>📞 Dispute Communication Scripts</h2>
                <button className="modal-close" onClick={() => setShowDisputeModal(false)}>×</button>
              </div>

              <div className="script-tabs">
                <div className="script-section">
                  <div className="script-header">
                    <Phone size={20} />
                    <h3>Call Script</h3>
                    <button 
                      className="btn-copy-script"
                      onClick={() => handleCopyToClipboard(selectedDispute.scripts.callScript, 'call')}
                    >
                      {copiedText === 'call' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="script-content">{selectedDispute.scripts.callScript}</pre>
                </div>

                <div className="script-section">
                  <div className="script-header">
                    <Mail size={20} />
                    <h3>Email Template</h3>
                    <button 
                      className="btn-copy-script"
                      onClick={() => handleCopyToClipboard(selectedDispute.scripts.emailScript, 'email-modal')}
                    >
                      {copiedText === 'email-modal' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="script-content">{selectedDispute.scripts.emailScript}</pre>
                </div>
              </div>

              <div className="modal-footer-note">
                <AlertCircle size={18} />
                <p>
                  <strong>Important:</strong> Review and personalize these scripts before use. 
                  Add your specific policy details, claim number, and personal information. 
                  Keep records of all communication with your insurer.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
