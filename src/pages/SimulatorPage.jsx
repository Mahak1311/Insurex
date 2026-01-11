import { useState } from 'react'
import {
  Calculator,
  MapPin,
  Building2,
  IndianRupee,
  AlertCircle,
  TrendingUp,
  Info,
  Search,
  Loader2
} from 'lucide-react'
import './SimulatorPage.css'

function SimulatorPage() {
  const [formData, setFormData] = useState({
    procedure: '',
    pincode: '',
    hospitalType: '',
    roomType: 'general',
    isNetworkHospital: true,
    policyStartDate: ''
  })
  const [results, setResults] = useState(null)
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(false)
  const [pincodeError, setPincodeError] = useState('')
  const [showPolicyModal, setShowPolicyModal] = useState(false)
  const [saveFeedback, setSaveFeedback] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [liveGuidance, setLiveGuidance] = useState([])
  const [showPreAuthChecklist, setShowPreAuthChecklist] = useState(false)

  // Procedure base costs (in rupees)
  const procedureCosts = {
    'heart surgery': 300000,
    'appendectomy': 80000,
    'knee replacement': 250000,
    'cataract surgery': 40000,
    'hysterectomy': 150000,
    'hernia repair': 60000,
    'caesarean section': 120000,
    'normal delivery': 30000,
    'gallbladder removal': 90000,
    'liver transplant': 2000000,
    'kidney transplant': 1500000,
    'bypass surgery': 400000,
    'angioplasty': 250000,
    'default': 100000
  }

  // Hospital type multipliers
  const hospitalMultipliers = {
    'govt': 0.7,
    'private-tier3': 1.0,
    'private-tier2': 1.4,
    'private-tier1': 1.8
  }

  // Metro vs non-metro adjustment
  const isMetro = (pincode) => {
    const metroPincodes = ['110001', '110002', '400001', '560001', '700001', '380001', '411001']
    return metroPincodes.includes(pincode)
  }

  // Room type limits (per day)
  const roomTypeLimits = {
    'general': { limit: 1500, multiplier: 1.0, label: 'General Ward' },
    'semi-private': { limit: 2500, multiplier: 1.3, label: 'Semi-Private' },
    'private': { limit: 4000, multiplier: 1.6, label: 'Private Room' },
    'deluxe': { limit: 6000, multiplier: 2.0, label: 'Deluxe/ICU' }
  }

  // Waiting period procedures (in months)
  const waitingPeriods = {
    'knee replacement': 24,
    'hernia repair': 24,
    'cataract surgery': 24,
    'hysterectomy': 24,
    'caesarean section': 9,
    'normal delivery': 9,
    'default': 0
  }

  // Check if procedure requires waiting period
  const checkWaitingPeriod = (procedure, policyStartDate) => {
    if (!procedure || !policyStartDate) return null
    
    const procKey = Object.keys(waitingPeriods).find(
      key => key.toLowerCase() === procedure.toLowerCase()
    ) || 'default'
    
    const requiredMonths = waitingPeriods[procKey]
    if (requiredMonths === 0) return null

    const startDate = new Date(policyStartDate)
    const now = new Date()
    const monthsElapsed = (now.getFullYear() - startDate.getFullYear()) * 12 + 
                          (now.getMonth() - startDate.getMonth())
    
    if (monthsElapsed < requiredMonths) {
      return {
        required: requiredMonths,
        elapsed: monthsElapsed,
        remaining: requiredMonths - monthsElapsed,
        covered: false
      }
    }
    return { covered: true }
  }

  const calculateCosts = (procedure, pincode, hospitalType, roomType = 'general', isNetwork = true) => {
    if (!procedure || !pincode || !hospitalType) {
      return null
    }

    // Get base cost for procedure (case insensitive)
    const procKey = Object.keys(procedureCosts).find(
      key => key.toLowerCase() === procedure.toLowerCase()
    ) || 'default'
    
    let baseCost = procedureCosts[procKey]

    // Apply hospital type multiplier
    const multiplier = hospitalMultipliers[hospitalType] || 1.0
    let hospitalCost = baseCost * multiplier

    // Apply metro adjustment (metro = +20%)
    if (isMetro(pincode)) {
      hospitalCost *= 1.2
    }

    // Apply room type multiplier
    const roomConfig = roomTypeLimits[roomType] || roomTypeLimits['general']
    hospitalCost *= roomConfig.multiplier

    // Split into components
    const surgeryCost = Math.round(hospitalCost * 0.55)
    let roomCost = Math.round(hospitalCost * 0.25)
    const medicineCost = Math.round(hospitalCost * 0.15)
    const diagnosticsCost = Math.round(hospitalCost * 0.05)

    // Assume 5 days hospitalization for room calculation
    const daysStay = 5
    const dailyRoomCost = Math.round(roomCost / daysStay)
    
    const totalCost = surgeryCost + roomCost + medicineCost + diagnosticsCost

    // Calculate coverage with room sub-limit
    const surgerycovered = Math.min(surgeryCost, Math.round(surgeryCost * 0.9))
    
    // Room coverage with sub-limit per day
    let roomCovered = 0
    if (dailyRoomCost <= roomConfig.limit) {
      roomCovered = Math.round(roomCost * 0.8) // 80% if within limit
    } else {
      roomCovered = roomConfig.limit * daysStay * 0.8 // Only cover up to limit
    }
    
    const medicineCovered = Math.min(medicineCost, Math.round(medicineCost * 0.8))
    const diagnosticsCovered = Math.min(diagnosticsCost, Math.round(diagnosticsCost * 0.7))

    let totalCovered = surgerycovered + roomCovered + medicineCovered + diagnosticsCovered
    
    // Apply co-payment for non-network hospitals (20%)
    let copayAmount = 0
    if (!isNetwork) {
      copayAmount = Math.round(totalCovered * 0.20)
      totalCovered -= copayAmount
    }
    
    const outOfPocket = totalCost - totalCovered

    return {
      estimatedCost: totalCost,
      insuranceCoverage: totalCovered,
      outOfPocket,
      copayAmount,
      dailyRoomCost,
      roomLimit: roomConfig.limit,
      daysStay,
      breakdown: [
        { item: 'Surgery Fees', cost: surgeryCost, covered: surgerycovered },
        { item: 'Room Charges', cost: roomCost, covered: roomCovered, dailyCost: dailyRoomCost, limit: roomConfig.limit },
        { item: 'Medicines', cost: medicineCost, covered: medicineCovered },
        { item: 'Diagnostic Tests', cost: diagnosticsCost, covered: diagnosticsCovered }
      ],
      risks: [
        dailyRoomCost > roomConfig.limit ? `⚠️ Room cost (₹${dailyRoomCost}/day) exceeds policy limit (₹${roomConfig.limit}/day)` : `✓ Room cost within policy limit`,
        'Pre-existing condition waiting period: usually 2-4 years',
        hospitalType === 'private-tier1' ? '⚠️ Premium hospitals may charge additional facility charges' : '✓ Mid-range hospital selected',
        isMetro(pincode) ? '⚠️ Metro cities have 20% higher costs' : '✓ Regional pricing applicable',
        !isNetwork ? '⚠️ Non-network hospital: 20% co-payment applies' : '✓ Network hospital: No co-payment'
      ]
    }
  }

  const fetchHospitals = async (pincode) => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError('Please enter a valid 6-digit pincode')
      setHospitals([])
      return
    }

    setPincodeError('')
    setLoading(true)

    try {
      const response = await fetch(`http://localhost:5000/api/hospitals?pincode=${pincode}`)
      const data = await response.json()

      if (data.error) {
        setPincodeError(data.error)
        setHospitals([])
      } else {
        setHospitals(data.hospitals || [])
      }
    } catch (error) {
      setPincodeError('Failed to fetch hospitals. Make sure the server is running.')
      setHospitals([])
    } finally {
      setLoading(false)
    }
  }

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setFormData({ ...formData, pincode: value })

    if (value.length === 6) {
      fetchHospitals(value)
    } else {
      setHospitals([])
      setPincodeError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.procedure || !formData.pincode || !formData.hospitalType) {
      alert('Please fill in all required fields')
      return
    }
    // Calculate costs on button click
    setShowResults(true)
    const costs = calculateCosts(
      formData.procedure, 
      formData.pincode, 
      formData.hospitalType,
      formData.roomType,
      formData.isNetworkHospital
    )
    setResults(costs)
    setShowPreAuthChecklist(true)
  }

  const handleUpdateResults = () => {
    // Recalculate with current values
    if (!formData.procedure || !formData.pincode || !formData.hospitalType) {
      alert('Please fill in all required fields')
      return
    }
    setShowResults(true)
    const costs = calculateCosts(
      formData.procedure, 
      formData.pincode, 
      formData.hospitalType,
      formData.roomType,
      formData.isNetworkHospital
    )
    setResults(costs)
    alert('✓ Coverage calculation updated!')
  }

  // Generate live guidance as user types
  const generateLiveGuidance = (data) => {
    const guidance = []

    // Waiting period check
    if (data.procedure && data.policyStartDate) {
      const waitingCheck = checkWaitingPeriod(data.procedure, data.policyStartDate)
      if (waitingCheck && !waitingCheck.covered) {
        guidance.push({
          type: 'warning',
          title: 'Waiting Period Alert',
          message: `This procedure requires ${waitingCheck.required} months waiting period. You have ${waitingCheck.elapsed} months. Coverage starts in ${waitingCheck.remaining} months.`,
          icon: '⏳'
        })
      } else if (waitingCheck && waitingCheck.covered) {
        guidance.push({
          type: 'success',
          title: 'Waiting Period Complete',
          message: 'Your waiting period is satisfied. This procedure is covered.',
          icon: '✓'
        })
      }
    }

    // Room type warning
    if (data.roomType && data.roomType !== 'general') {
      const roomConfig = roomTypeLimits[data.roomType]
      guidance.push({
        type: 'info',
        title: 'Room Type Selection',
        message: `${roomConfig.label} selected. Policy covers up to ₹${roomConfig.limit}/day. Higher room costs will increase your out-of-pocket expenses.`,
        icon: '🛏️'
      })
    }

    // Network hospital
    if (data.isNetworkHospital === false) {
      guidance.push({
        type: 'caution',
        title: 'Non-Network Hospital',
        message: 'Non-network hospitals require 20% co-payment. Consider network hospitals for lower out-of-pocket costs and cashless treatment.',
        icon: '💳'
      })
    } else if (data.isNetworkHospital === true && data.hospitalType) {
      guidance.push({
        type: 'success',
        title: 'Network Hospital Selected',
        message: 'No co-payment required. You can avail cashless treatment with pre-authorization.',
        icon: '✓'
      })
    }

    // Metro pricing
    if (data.pincode && isMetro(data.pincode)) {
      guidance.push({
        type: 'info',
        title: 'Metro City Pricing',
        message: 'Metro cities have approximately 20% higher hospital costs. Consider nearby tier-2 cities if time permits.',
        icon: '🏙️'
      })
    }

    // Pre-authorization reminder
    if (data.procedure && data.hospitalType) {
      guidance.push({
        type: 'info',
        title: 'Pre-Authorization Required',
        message: 'For cashless treatment, inform your insurer 48 hours before planned hospitalization (24 hours for emergency).',
        icon: '📋'
      })
    }

    setLiveGuidance(guidance)
  }

  // Trigger live guidance on form changes
  const handleFormChange = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    generateLiveGuidance(newData)
  }

  const handleViewPolicyDetails = () => {
    setShowPolicyModal(true)
  }

  const handleFindNetworkHospitals = () => {
    // Already displayed hospitals from API, but can also navigate
    if (hospitals.length === 0) {
      alert('Please enter a pincode to find nearby hospitals')
      return
    }
    // Highlight hospitals section or navigate to hospital page
    const hospitalsSection = document.querySelector('.hospitals-list')
    if (hospitalsSection) {
      hospitalsSection.scrollIntoView({ behavior: 'smooth' })
      alert(`Found ${hospitals.length} network hospitals in your area!`)
    }
  }

  const handleSaveEstimate = () => {
    if (!results) {
      alert('Please generate an estimate first')
      return
    }

    // Save to localStorage
    const estimate = {
      timestamp: new Date().toISOString(),
      formData,
      results,
      hospitals: hospitals.slice(0, 5) // Save top 5 hospitals
    }

    // Get existing estimates
    const estimates = JSON.parse(localStorage.getItem('savedEstimates') || '[]')
    estimates.push(estimate)
    
    // Keep only last 10 estimates
    if (estimates.length > 10) {
      estimates.shift()
    }

    localStorage.setItem('savedEstimates', JSON.stringify(estimates))
    
    setSaveFeedback('✓ Estimate saved successfully!')
    setTimeout(() => setSaveFeedback(''), 3000)
  }

  return (
    <div className="simulator-page">
      <div className="container">
        <div className="simulator-header">
          <h1 className="page-title">Treatment Coverage Simulator</h1>
          <p className="page-subtitle">
            Estimate your treatment costs and insurance coverage before hospitalization
          </p>
        </div>

        <div className="simulator-grid">
          {/* Input Form */}
          <div className="simulator-form-section card">
            <h2 className="section-title">
              <Calculator size={24} />
              Enter Treatment Details
            </h2>

            <form onSubmit={handleSubmit} className="simulator-form">
              <div className="form-group">
                <label>Procedure or Symptoms</label>
                <input
                  type="text"
                  placeholder="e.g., Appendectomy, Knee Replacement"
                  value={formData.procedure}
                  onChange={(e) => handleFormChange('procedure', e.target.value)}
                  required
                />
                <span className="input-hint">Start typing to see suggestions</span>
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Enter 6-digit pincode (e.g., 110001)"
                    value={formData.pincode}
                    onChange={handlePincodeChange}
                    maxLength={6}
                    required
                  />
                  {loading && <Loader2 size={20} className="spinning" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />}
                </div>
                {pincodeError && <span className="input-error">{pincodeError}</span>}
                {hospitals.length > 0 && (
                  <span className="input-hint success">Found {hospitals.length} hospitals nearby</span>
                )}
              </div>

              {hospitals.length > 0 && (
                <div className="form-group">
                  <label>Nearby Hospitals</label>
                  <div className="hospitals-list">
                    {hospitals.slice(0, 5).map((hospital, index) => (
                      <div key={hospital.placeId || index} className="hospital-item">
                        <Building2 size={16} />
                        <div className="hospital-info">
                          <span className="hospital-name">{hospital.name}</span>
                          <span className="hospital-distance">{hospital.distanceKm} km away</span>
                          {hospital.rating && (
                            <span className="hospital-rating">★ {hospital.rating}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Hospital Type</label>
                <select
                  value={formData.hospitalType}
                  onChange={(e) => handleFormChange('hospitalType', e.target.value)}
                  required
                >
                  <option value="">Select Hospital Type</option>
                  <option value="govt">Government Hospital</option>
                  <option value="private-tier1">Private - Tier 1 (Premium)</option>
                  <option value="private-tier2">Private - Tier 2 (Mid-range)</option>
                  <option value="private-tier3">Private - Tier 3 (Budget)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Room Type</label>
                <select
                  value={formData.roomType}
                  onChange={(e) => handleFormChange('roomType', e.target.value)}
                  required
                >
                  <option value="general">General Ward (₹1,500/day limit)</option>
                  <option value="semi-private">Semi-Private (₹2,500/day limit)</option>
                  <option value="private">Private Room (₹4,000/day limit)</option>
                  <option value="deluxe">Deluxe/ICU (₹6,000/day limit)</option>
                </select>
                <span className="input-hint">Policy covers up to the daily limit shown</span>
              </div>

              <div className="form-group">
                <label>Hospital Network Status</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="network"
                      checked={formData.isNetworkHospital === true}
                      onChange={() => handleFormChange('isNetworkHospital', true)}
                    />
                    <span>Network Hospital (Cashless)</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="network"
                      checked={formData.isNetworkHospital === false}
                      onChange={() => handleFormChange('isNetworkHospital', false)}
                    />
                    <span>Non-Network (20% Co-pay)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Policy Start Date (Optional - for waiting period check)</label>
                <input
                  type="date"
                  value={formData.policyStartDate}
                  onChange={(e) => handleFormChange('policyStartDate', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                <Calculator size={20} />
                {results ? 'Update Results' : 'Calculate Coverage'}
              </button>
            </form>

            <div className="info-box">
              <Info size={20} />
              <p>
                Estimates are based on average costs and your policy terms.
                Actual costs may vary. Consult your hospital for accurate quotes.
              </p>
            </div>
          </div>

          {/* Results */}
          {showResults && results && (
            <div className="simulator-results">
              {/* Summary Cards */}
              <div className="result-summary-grid">
                <div className="result-card total">
                  <div className="result-icon">
                    <IndianRupee size={24} />
                  </div>
                  <div className="result-content">
                    <div className="result-label">Estimated Total Cost</div>
                    <div className="result-value">₹{results.estimatedCost.toLocaleString()}</div>
                  </div>
                </div>

                <div className="result-card covered">
                  <div className="result-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="result-content">
                    <div className="result-label">Insurance Coverage</div>
                    <div className="result-value">₹{results.insuranceCoverage.toLocaleString()}</div>
                    <div className="result-percent">
                      {Math.round((results.insuranceCoverage / results.estimatedCost) * 100)}% covered
                    </div>
                  </div>
                </div>

                <div className="result-card oop">
                  <div className="result-icon">
                    <AlertCircle size={24} />
                  </div>
                  <div className="result-content">
                    <div className="result-label">Your Out-of-Pocket</div>
                    <div className="result-value highlight">₹{results.outOfPocket.toLocaleString()}</div>
                    <div className="result-percent">
                      {Math.round((results.outOfPocket / results.estimatedCost) * 100)}% of total
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="result-breakdown card">
                <h3 className="section-title">Cost Breakdown</h3>
                <div className="breakdown-items">
                  {results.breakdown.map((item, index) => (
                    <div key={index} className="breakdown-item">
                      <div className="breakdown-item-header">
                        <span className="breakdown-item-name">{item.item}</span>
                        <span className="breakdown-item-cost">₹{item.cost.toLocaleString()}</span>
                      </div>
                      <div className="breakdown-bar">
                        <div
                          className="breakdown-fill"
                          style={{ width: `${(item.covered / item.cost) * 100}%` }}
                        ></div>
                      </div>
                      <div className="breakdown-item-footer">
                        <span className="covered-amount">
                          Covered: ₹{item.covered.toLocaleString()}
                        </span>
                        <span className="uncovered-amount">
                          You Pay: ₹{(item.cost - item.covered).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Warnings */}
              <div className="result-risks card">
                <h3 className="section-title">
                  <AlertCircle size={20} />
                  Potential Coverage Issues
                </h3>
                <div className="risk-items">
                  {results.risks.map((risk, index) => (
                    <div key={index} className="risk-item">
                      <div className="risk-dot"></div>
                      <span>{risk}</span>
                    </div>
                  ))}
                </div>
                <button className="btn btn-secondary" onClick={handleViewPolicyDetails}>
                  View Full Policy Details
                </button>
              </div>

              {/* Action Buttons */}
              <div className="result-actions">
                <button className="btn btn-primary" onClick={handleFindNetworkHospitals}>
                  Find Network Hospitals
                </button>
                <button className="btn btn-secondary" onClick={handleSaveEstimate}>
                  Save Estimate
                  {saveFeedback && <span style={{ marginLeft: '8px' }}>{saveFeedback}</span>}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="disclaimer card">
          <AlertCircle size={24} />
          <div>
            <h3>Important Disclaimer</h3>
            <p>
              These estimates are for informational purposes only and based on average costs and your policy terms.
              Actual hospital bills may vary significantly based on complications, length of stay, and specific
              hospital pricing. Always confirm costs with your hospital and insurer before treatment.
            </p>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      {showPolicyModal && (
        <div className="modal-overlay" onClick={() => setShowPolicyModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Insurance Policy Details</h2>
              <button 
                className="modal-close" 
                onClick={() => setShowPolicyModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="policy-section">
                <h3>Coverage Summary</h3>
                <ul>
                  <li><strong>Surgery Fees:</strong> 90% coverage up to ₹5,00,000</li>
                  <li><strong>Room Charges:</strong> 60% coverage, ₹1,500-₹3,000/day limit</li>
                  <li><strong>Medicines:</strong> 80% coverage up to ₹50,000</li>
                  <li><strong>Diagnostics:</strong> 70% coverage</li>
                  <li><strong>Hospitalization:</strong> 30-90 days depending on procedure</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>Exclusions & Waiting Periods</h3>
                <ul>
                  <li>Pre-existing conditions: 2-4 year waiting period</li>
                  <li>Maternity: 12-month waiting period (9 months for normal delivery)</li>
                  <li>Routine checkups and preventive care excluded</li>
                  <li>Treatment abroad: Limited to emergency cases</li>
                  <li>Cosmetic procedures: Not covered</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>Claim Process</h3>
                <ol>
                  <li>Inform insurer before hospitalization (pre-authorization required)</li>
                  <li>Provide original policy document and ID proof</li>
                  <li>Submit hospital bill and discharge summary within 30 days</li>
                  <li>Claim approval within 7-15 days</li>
                </ol>
              </div>

              <div className="policy-section">
                <h3>Network Hospitals</h3>
                <p>
                  Get cashless treatment at 5,000+ network hospitals across India.
                  Direct billing with your insurer—no upfront payment needed.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary"
                onClick={() => setShowPolicyModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SimulatorPage
