import { Shield, TrendingUp, Star, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import './InfoPage.css'

function BestHealthPlans2026Page() {
  return (
    <div className="info-page">
      <div className="container">
        <div className="info-hero">
          <Star size={48} className="info-icon" />
          <h1>Best Health Plans 2026</h1>
          <p className="info-subtitle">Top-rated health insurance policies in India</p>
        </div>

        <div className="info-content">
          <section className="info-section">
            <h2>How We Evaluate Plans</h2>
            <div className="info-list">
              <div className="list-item">
                <CheckCircle size={20} />
                <div><strong>Claim Settlement Ratio:</strong> Higher is better (aim for 95%+)</div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div><strong>Network Hospitals:</strong> More cashless hospitals in your city</div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div><strong>Coverage Benefits:</strong> Room rent, day-care procedures, ambulance</div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div><strong>Premium vs Coverage:</strong> Best value for money</div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Top Health Insurance Plans 2026</h2>
            
            <div className="plan-card featured">
              <div className="plan-badge">Editor's Choice</div>
              <h3>Star Health Comprehensive Plan</h3>
              <div className="plan-details">
                <div className="plan-feature">
                  <strong>Coverage:</strong> ₹5L - ₹1 Cr
                </div>
                <div className="plan-feature">
                  <strong>Claim Ratio:</strong> 97.2%
                </div>
                <div className="plan-feature">
                  <strong>Starting Premium:</strong> ₹8,500/year
                </div>
              </div>
              <div className="plan-highlights">
                <h4>Key Highlights:</h4>
                <ul>
                  <li>No room rent limits</li>
                  <li>10,000+ network hospitals</li>
                  <li>Unlimited restoration benefit</li>
                  <li>Covers home treatment expenses</li>
                </ul>
              </div>
            </div>

            <div className="plan-card">
              <h3>HDFC ERGO Health Suraksha</h3>
              <div className="plan-details">
                <div className="plan-feature">
                  <strong>Coverage:</strong> ₹3L - ₹75L
                </div>
                <div className="plan-feature">
                  <strong>Claim Ratio:</strong> 96.8%
                </div>
                <div className="plan-feature">
                  <strong>Starting Premium:</strong> ₹7,200/year
                </div>
              </div>
              <div className="plan-highlights">
                <h4>Key Highlights:</h4>
                <ul>
                  <li>Affordable premiums</li>
                  <li>Online policy management</li>
                  <li>24/7 customer support</li>
                  <li>Quick claim processing</li>
                </ul>
              </div>
            </div>

            <div className="plan-card">
              <h3>Care Supreme Plan</h3>
              <div className="plan-details">
                <div className="plan-feature">
                  <strong>Coverage:</strong> ₹5L - ₹1 Cr
                </div>
                <div className="plan-feature">
                  <strong>Claim Ratio:</strong> 95.1%
                </div>
                <div className="plan-feature">
                  <strong>Starting Premium:</strong> ₹9,800/year
                </div>
              </div>
              <div className="plan-highlights">
                <h4>Key Highlights:</h4>
                <ul>
                  <li>Covers modern treatments (robotic surgery)</li>
                  <li>Worldwide coverage option</li>
                  <li>Automatic restoration of sum insured</li>
                  <li>Mental illness coverage</li>
                </ul>
              </div>
            </div>

            <div className="plan-card">
              <h3>Niva Bupa Reassure 2.0</h3>
              <div className="plan-details">
                <div className="plan-feature">
                  <strong>Coverage:</strong> ₹5L - ₹2 Cr
                </div>
                <div className="plan-feature">
                  <strong>Claim Ratio:</strong> 94.5%
                </div>
                <div className="plan-feature">
                  <strong>Starting Premium:</strong> ₹10,500/year
                </div>
              </div>
              <div className="plan-highlights">
                <h4>Key Highlights:</h4>
                <ul>
                  <li>High coverage limits</li>
                  <li>No sub-limits on rooms or diseases</li>
                  <li>Covers alternative treatments (Ayurveda, Homeopathy)</li>
                  <li>Health check-up every year</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Best for Specific Needs</h2>
            <div className="terms-grid">
              <div className="term-card">
                <h3>Best for Families</h3>
                <p><strong>Star Family Health Optima:</strong> Covers 2 adults + 4 children under one sum insured</p>
              </div>
              <div className="term-card">
                <h3>Best for Seniors</h3>
                <p><strong>Star Senior Citizen Red Carpet:</strong> Coverage up to 75 years, pre-policy medical not required</p>
              </div>
              <div className="term-card">
                <h3>Best Budget Option</h3>
                <p><strong>Aditya Birla Activ Health:</strong> Rewards for healthy living with premium discounts</p>
              </div>
              <div className="term-card">
                <h3>Best for Critical Illness</h3>
                <p><strong>Care Critical Illness:</strong> Lump sum payout on diagnosis of 60+ critical illnesses</p>
              </div>
            </div>
          </section>

          <section className="info-section cta-box">
            <h2>Need Help Choosing?</h2>
            <p>Use our Coverage Simulator to compare these plans and find the perfect fit for your needs.</p>
            <Link to="/simulator" className="btn btn-primary">
              <TrendingUp size={18} />
              Try Coverage Simulator
            </Link>
          </section>
        </div>
      </div>
    </div>
  )
}

export default BestHealthPlans2026Page
