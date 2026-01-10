import { useState } from 'react'
import { 
  Calculator, 
  MapPin, 
  Building2, 
  IndianRupee, 
  AlertCircle,
  TrendingUp,
  Info,
  Search
} from 'lucide-react'
import './SimulatorPage.css'

function SimulatorPage() {
  const [formData, setFormData] = useState({
    procedure: '',
    city: '',
    hospitalType: ''
  })
  const [results, setResults] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate calculation
    setResults({
      estimatedCost: 85000,
      insuranceCoverage: 68000,
      outOfPocket: 17000,
      breakdown: [
        { item: 'Surgery Fees', cost: 45000, covered: 45000 },
        { item: 'Room Charges', cost: 20000, covered: 12000 },
        { item: 'Medicines', cost: 12000, covered: 11000 },
        { item: 'Diagnostic Tests', cost: 8000, covered: 0 }
      ],
      risks: [
        'Room rent sub-limit may apply (₹1,500/day max)',
        'Pre-existing condition waiting period check required',
        'Specific procedure exclusions in policy'
      ]
    })
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
                <div className="input-with-icon">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="e.g., Appendectomy, Knee Replacement"
                    value={formData.procedure}
                    onChange={(e) => setFormData({ ...formData, procedure: e.target.value })}
                    required
                  />
                </div>
                <span className="input-hint">Start typing to see suggestions</span>
              </div>

              <div className="form-group">
                <label>City</label>
                <div className="input-with-icon">
                  <MapPin size={20} />
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  >
                    <option value="">Select City</option>
                    <option value="delhi">Delhi</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="hyderabad">Hyderabad</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Hospital Type</label>
                <div className="input-with-icon">
                  <Building2 size={20} />
                  <select
                    value={formData.hospitalType}
                    onChange={(e) => setFormData({ ...formData, hospitalType: e.target.value })}
                    required
                  >
                    <option value="">Select Hospital Type</option>
                    <option value="govt">Government Hospital</option>
                    <option value="private-tier1">Private - Tier 1 (Premium)</option>
                    <option value="private-tier2">Private - Tier 2 (Mid-range)</option>
                    <option value="private-tier3">Private - Tier 3 (Budget)</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-large">
                <Calculator size={20} />
                Calculate Coverage
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
          {results && (
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
                <button className="btn btn-secondary">
                  View Full Policy Details
                </button>
              </div>

              {/* Action Buttons */}
              <div className="result-actions">
                <button className="btn btn-primary">
                  Find Network Hospitals
                </button>
                <button className="btn btn-secondary">
                  Save Estimate
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
    </div>
  )
}

export default SimulatorPage
