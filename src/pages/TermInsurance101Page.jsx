import { Shield, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import './InfoPage.css'

function TermInsurance101Page() {
  return (
    <div className="info-page">
      <div className="container">
        <div className="info-hero">
          <Shield size={48} className="info-icon" />
          <h1>Term Insurance 101</h1>
          <p className="info-subtitle">Complete guide to term life insurance in India</p>
        </div>

        <div className="info-content">
          <section className="info-section">
            <h2>What is Term Insurance?</h2>
            <p>
              Term insurance is the purest form of life insurance that provides financial protection to your 
              family in case of your untimely demise. It pays a lump sum amount (death benefit) to your 
              nominees if you pass away during the policy term.
            </p>
          </section>

          <section className="info-section">
            <h2>Key Features</h2>
            <div className="terms-grid">
              <div className="term-card">
                <h3>High Coverage</h3>
                <p>Get ₹1 crore coverage for as low as ₹500-800 per month.</p>
              </div>
              <div className="term-card">
                <h3>Affordable Premiums</h3>
                <p>Much cheaper than other life insurance policies.</p>
              </div>
              <div className="term-card">
                <h3>Pure Protection</h3>
                <p>No investment component - just pure life cover.</p>
              </div>
              <div className="term-card">
                <h3>Tax Benefits</h3>
                <p>Premiums eligible for deduction under Section 80C.</p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>How Much Coverage Do You Need?</h2>
            <div className="info-list">
              <div className="list-item">
                <CheckCircle size={20} />
                <div>
                  <strong>Rule of Thumb:</strong> 10-15 times your annual income
                </div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div>
                  <strong>Consider Liabilities:</strong> Add outstanding loans (home, car, personal)
                </div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div>
                  <strong>Future Expenses:</strong> Children's education, marriage, parents' care
                </div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div>
                  <strong>Existing Coverage:</strong> Subtract any existing life insurance or savings
                </div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Types of Term Insurance</h2>
            <div className="info-list">
              <div className="list-item">
                <Shield size={20} />
                <div>
                  <strong>Level Term:</strong> Same coverage throughout the policy term
                </div>
              </div>
              <div className="list-item">
                <Shield size={20} />
                <div>
                  <strong>Increasing Term:</strong> Coverage amount increases over time
                </div>
              </div>
              <div className="list-item">
                <Shield size={20} />
                <div>
                  <strong>Decreasing Term:</strong> Coverage reduces over time (good for loan protection)
                </div>
              </div>
              <div className="list-item">
                <Shield size={20} />
                <div>
                  <strong>Return of Premium:</strong> Get premiums back if you survive the term
                </div>
              </div>
            </div>
          </section>

          <section className="info-section tip-section">
            <Info size={32} />
            <h2>When to Buy Term Insurance?</h2>
            <ul>
              <li><strong>Buy Early:</strong> Premiums are lowest in your 20s-30s</li>
              <li><strong>Life Changes:</strong> Marriage, having children, buying a home</li>
              <li><strong>Career Growth:</strong> When you have dependents relying on your income</li>
              <li><strong>Health is Good:</strong> Before any medical conditions develop</li>
            </ul>
          </section>

          <section className="info-section alert-section">
            <AlertTriangle size={32} />
            <h2>Common Mistakes to Avoid</h2>
            <ul>
              <li>Underestimating coverage needs</li>
              <li>Not disclosing medical history (can lead to claim rejection)</li>
              <li>Ignoring rider benefits (critical illness, accidental death)</li>
              <li>Choosing policy term that's too short</li>
              <li>Not reviewing and updating nominees</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermInsurance101Page
