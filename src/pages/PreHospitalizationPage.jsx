import { useState, useEffect, useCallback } from 'react'
import { AlertCircle, Info, AlertTriangle, CheckCircle, TrendingUp, Heart, MapPin, Building2, Bed, Loader2 } from 'lucide-react'
import './PreHospitalizationPage.css'
import { generatePreHospitalizationGuidance, getProcedureList } from '../lib/preHospitalizationEngine'
import OutOfPocketRippleGraph from '../components/OutOfPocketRippleGraph'

// Reusable InsightCard component
function InsightCard({ insight, type }) {
  const iconMap = {
    info: <Info className="insight-icon" />,
    warning: <AlertTriangle className="insight-icon" />,
    caution: <AlertCircle className="insight-icon" />,
    recommendation: <CheckCircle className="insight-icon" />
  }

  const severityClass = insight.severity || type

  return (
    <div className={`insight-card insight-${severityClass}`}>
      <div className="insight-header">
        {iconMap[type] || iconMap.info}
        <h3>{insight.title}</h3>
      </div>
      <p className="insight-message">{insight.message}</p>
      {insight.impact && (
        <div className="insight-impact">
          <strong>Estimated Impact:</strong> {insight.impact}
        </div>
      )}
      {insight.potentialSaving && (
        <div className="insight-saving">
          <strong>Potential Saving:</strong> {insight.potentialSaving}
        </div>
      )}
    </div>
  )
}

function PreHospitalizationPage() {
  const procedureList = getProcedureList()

  const [formData, setFormData] = useState({
    procedure: '',
    pincode: '',
    hospitalType: 'network',
    roomType: 'semi-private',
    sumInsured: '500000',
    roomRentCap: '0',
    coPayPercent: '0',
    subLimitsInput: ''
  })

  const [guidance, setGuidance] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  // Generate guidance with all current form data
  const generateGuidance = useCallback(() => {
    setIsCalculating(true)
    const subLimitsArray = formData.subLimitsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    const inputs = {
      procedure: formData.procedure,
      pincode: formData.pincode,
      hospitalType: formData.hospitalType,
      roomType: formData.roomType,
      sumInsured: Number(formData.sumInsured) || 500000,
      roomRentCap: Number(formData.roomRentCap) || 0,
      coPayPercent: Number(formData.coPayPercent) || 0,
      subLimits: subLimitsArray
    }

    const result = generatePreHospitalizationGuidance(inputs)
    setGuidance(result)
    setShowResults(true)
    setIsCalculating(false)
  }, [formData])

  // Real-time guidance generation on input change - FULLY DYNAMIC
  useEffect(() => {
    // Only generate if minimum required fields are filled
    if (formData.procedure && formData.pincode && formData.hospitalType) {
      // Show calculating state immediately
      setIsCalculating(true)
      
      // Debounce for smoother UX (reduced to 300ms for instant feel)
      const timer = setTimeout(() => {
        generateGuidance()
      }, 300)

      return () => {
        clearTimeout(timer)
        setIsCalculating(false)
      }
    } else {
      setShowResults(false)
      setIsCalculating(false)
    }
  }, [formData, generateGuidance])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="pre-hosp-page">
      <div className="page-header">
        <div className="header-content">
          <Heart className="header-icon" />
          <div>
            <h1>Pre-Hospitalization Insurance Guidance</h1>
            <p className="header-subtitle">
              Get clarity on your insurance coverage BEFORE treatment begins
            </p>
          </div>
        </div>
      </div>

      <div className="pre-hosp-container">
        {/* Input Form Section */}
        <section className="input-section">
          <div className="section-header">
            <h2>Treatment Details</h2>
            <p>Enter your planned treatment details to receive personalized guidance</p>
          </div>

          <form className="guidance-form">
            {/* Dynamic Calculation Indicator */}
            {isCalculating && (
              <div className="calculating-banner">
                <Loader2 className="spinner" size={16} />
                <span>Recalculating estimates...</span>
              </div>
            )}
            
            {/* Procedure Selection */}
            <div className="form-row">
              <div className="form-group full-width">
                <label>
                  <TrendingUp size={18} />
                  Medical Procedure *
                </label>
                <select
                  name="procedure"
                  value={formData.procedure}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a procedure...</option>
                  {procedureList.map(proc => (
                    <option key={proc.value} value={proc.value}>
                      {proc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location and Hospital */}
            <div className="form-row">
              <div className="form-group">
                <label>
                  <MapPin size={18} />
                  Hospital Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="e.g., 110001"
                  maxLength="6"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Building2 size={18} />
                  Hospital Type *
                </label>
                <select
                  name="hospitalType"
                  value={formData.hospitalType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="network">Network Hospital</option>
                  <option value="non-network">Non-Network Hospital</option>
                  <option value="government">Government Hospital</option>
                </select>
              </div>
            </div>

            {/* Room Type */}
            <div className="form-row">
              <div className="form-group">
                <label>
                  <Bed size={18} />
                  Preferred Room Type
                </label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                >
                  <option value="general">General Ward</option>
                  <option value="semi-private">Semi-Private</option>
                  <option value="private">Private Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                </select>
              </div>

              <div className="form-group">
                <label>Room Rent Cap (₹/day)</label>
                <input
                  type="number"
                  name="roomRentCap"
                  value={formData.roomRentCap}
                  onChange={handleInputChange}
                  placeholder="Enter 0 if no cap"
                  min="0"
                />
              </div>
            </div>

            {/* Policy Details */}
            <div className="form-row">
              <div className="form-group">
                <label>Sum Insured (₹)</label>
                <input
                  type="number"
                  name="sumInsured"
                  value={formData.sumInsured}
                  onChange={handleInputChange}
                  placeholder="500000"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Co-Payment (%)</label>
                <input
                  type="number"
                  name="coPayPercent"
                  value={formData.coPayPercent}
                  onChange={handleInputChange}
                  placeholder="Enter 0 if none"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            {/* Sub-limits */}
            <div className="form-row">
              <div className="form-group full-width">
                <label>Sub-Limits in Your Policy (comma-separated)</label>
                <input
                  type="text"
                  name="subLimitsInput"
                  value={formData.subLimitsInput}
                  onChange={handleInputChange}
                  placeholder="e.g., stents, implants, maternity"
                />
                <small className="form-hint">
                  Enter any specific coverage limits mentioned in your policy
                </small>
              </div>
            </div>
          </form>
        </section>

        {/* Results Section */}
        {showResults && guidance && (
          <>
            {/* Cost Estimate Section */}
            {guidance.estimate && (
              <section className={`estimate-section ${isCalculating ? 'updating' : ''}`}>
                <div className="estimate-header">
                  <h2>{guidance.estimate.pretreatmentLabel}</h2>
                  <p className="estimate-disclaimer">
                    This is an indicative estimate based on typical costs. Actual costs may vary.
                  </p>
                </div>

                <div className="estimate-cards">
                  <div className="estimate-card primary">
                    <h3>Total Estimated Cost</h3>
                    <div className="estimate-value">
                      {formatCurrency(guidance.estimate.totalEstimatedCost)}
                    </div>
                    <div className="estimate-days">
                      Expected Duration: {guidance.estimate.expectedDays} days
                    </div>
                  </div>

                  <div className="estimate-card success">
                    <h3>Insurance Coverage</h3>
                    <div className="estimate-value">
                      {formatCurrency(guidance.estimate.insuranceCoverage)}
                    </div>
                    <div className="estimate-percent">
                      {guidance.estimate.coveragePercentage}% of total cost
                    </div>
                  </div>

                  <div className={`estimate-card ${guidance.estimate.estimatedOutOfPocket > guidance.estimate.totalEstimatedCost * 0.2 ? 'danger' : 'warning'}`}>
                    <h3>Your Out-of-Pocket</h3>
                    <div className="estimate-value">
                      {formatCurrency(guidance.estimate.estimatedOutOfPocket)}
                    </div>
                    <div className="estimate-percent">
                      {Math.round((guidance.estimate.estimatedOutOfPocket / guidance.estimate.totalEstimatedCost) * 100)}% of total cost
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="cost-breakdown">
                  <h3>Cost Breakdown</h3>
                  <div className="breakdown-items">
                    <div className="breakdown-item">
                      <span>Room Charges</span>
                      <span>{formatCurrency(guidance.estimate.breakdown.room)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Procedure Cost</span>
                      <span>{formatCurrency(guidance.estimate.breakdown.procedure)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Consumables</span>
                      <span>{formatCurrency(guidance.estimate.breakdown.consumables)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Diagnostics</span>
                      <span>{formatCurrency(guidance.estimate.breakdown.diagnostics)}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Other Charges</span>
                      <span>{formatCurrency(guidance.estimate.breakdown.others)}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}
            {/* Out-of-Pocket Ripple Graph */}
            {guidance.estimate && (
              <OutOfPocketRippleGraph 
                formData={formData}
                estimatedCost={guidance.estimate.totalEstimatedCost}
                coveredAmount={guidance.estimate.insuranceCoverage}
              />
            )}
            {/* Warnings Section */}
            {guidance.warnings && guidance.warnings.length > 0 && (
              <section className="insights-section">
                <h2 className="section-title">⚠️ Important Warnings</h2>
                <div className="insights-grid">
                  {guidance.warnings.map((warning, idx) => (
                    <InsightCard key={idx} insight={warning} type="warning" />
                  ))}
                </div>
              </section>
            )}

            {/* General Insights */}
            {guidance.insights && guidance.insights.length > 0 && (
              <section className="insights-section">
                <h2 className="section-title">💡 Coverage Insights</h2>
                <div className="insights-grid">
                  {guidance.insights.map((insight, idx) => (
                    <InsightCard key={idx} insight={insight} type="info" />
                  ))}
                </div>
              </section>
            )}

            {/* Recommendations */}
            {guidance.recommendations && guidance.recommendations.length > 0 && (
              <section className="insights-section">
                <h2 className="section-title">✅ Recommendations</h2>
                <div className="insights-grid">
                  {guidance.recommendations.map((rec, idx) => (
                    <InsightCard key={idx} insight={rec} type="recommendation" />
                  ))}
                </div>
              </section>
            )}

            {/* Action Footer */}
            <section className="action-footer">
              <div className="action-content">
                <h3>Ready to proceed?</h3>
                <p>
                  Share this estimate with your insurance provider for pre-authorization.
                  Always verify coverage details before admission.
                </p>
                <div className="action-buttons">
                  <button className="btn-primary" onClick={() => window.print()}>
                    Print Estimate
                  </button>
                  <button className="btn-secondary" onClick={() => setFormData({
                    procedure: '',
                    pincode: '',
                    hospitalType: 'network',
                    roomType: 'semi-private',
                    sumInsured: '500000',
                    roomRentCap: '0',
                    coPayPercent: '0',
                    subLimitsInput: ''
                  })}>
                    Start New Estimate
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Empty State */}
        {!showResults && (
          <section className="empty-state">
            <AlertCircle size={64} className="empty-icon" />
            <h3>Enter treatment details to get started</h3>
            <p>
              Fill in the procedure, pincode, and hospital type to receive
              personalized insurance guidance and cost estimates.
            </p>
            <div className="empty-state-features">
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Real-time cost calculations</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Instant coverage warnings</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} />
                <span>Smart cost-saving tips</span>
              </div>
            </div>
            <button 
              className="btn-demo" 
              onClick={() => {
                setFormData({
                  procedure: 'knee replacement',
                  pincode: '110001',
                  hospitalType: 'network',
                  roomType: 'private',
                  sumInsured: '500000',
                  roomRentCap: '5000',
                  coPayPercent: '10',
                  subLimitsInput: 'joint replacement, implants'
                })
              }}
            >
              Try with Demo Data
            </button>
          </section>
        )}
      </div>
    </div>
  )
}

export default PreHospitalizationPage
