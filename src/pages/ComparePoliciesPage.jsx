import { PieChart, FileText, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import './InfoPage.css'

function ComparePoliciesPage() {
  return (
    <div className="info-page">
      <div className="container">
        <div className="info-hero">
          <PieChart size={48} className="info-icon" />
          <h1>Compare Insurance Policies</h1>
          <p className="info-subtitle">Make informed decisions by comparing coverage, benefits, and costs</p>
        </div>

        <div className="info-content">
          <section className="info-section">
            <h2>How to Compare Health Insurance Policies</h2>
            <div className="comparison-guide">
              <div className="guide-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Check Sum Insured</h3>
                  <p>Ensure the coverage amount is adequate for your family's medical needs. Minimum recommended: ₹5-10 lakhs.</p>
                </div>
              </div>
              <div className="guide-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Compare Network Hospitals</h3>
                  <p>More network hospitals = easier cashless treatment. Check if hospitals in your city are covered.</p>
                </div>
              </div>
              <div className="guide-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Review Claim Settlement Ratio</h3>
                  <p>Higher CSR means better chances of claim approval. Look for 95%+ settlement ratios.</p>
                </div>
              </div>
              <div className="guide-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Check Sub-limits and Co-payments</h3>
                  <p>Lower sub-limits on room rent or treatments can increase out-of-pocket expenses.</p>
                </div>
              </div>
              <div className="guide-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Waiting Periods</h3>
                  <p>Compare waiting periods for pre-existing diseases (typically 2-4 years).</p>
                </div>
              </div>
              <div className="guide-step">
                <div className="step-number">6</div>
                <div className="step-content">
                  <h3>Additional Benefits</h3>
                  <p>Look for restoration benefits, maternity coverage, mental health coverage, preventive health check-ups.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Key Parameters to Compare</h2>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>What to Look For</th>
                    <th>Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Room Rent Limit</strong></td>
                    <td>No limits or higher percentage</td>
                    <td>Avoids proportionate deductions on entire bill</td>
                  </tr>
                  <tr>
                    <td><strong>Pre & Post Hospitalization</strong></td>
                    <td>60 days pre, 180 days post</td>
                    <td>Covers diagnostic tests and follow-up treatments</td>
                  </tr>
                  <tr>
                    <td><strong>Day Care Procedures</strong></td>
                    <td>More procedures covered</td>
                    <td>Modern treatments don't require 24-hour hospitalization</td>
                  </tr>
                  <tr>
                    <td><strong>Ambulance Charges</strong></td>
                    <td>Higher per hospitalization</td>
                    <td>Emergency transport can be expensive</td>
                  </tr>
                  <tr>
                    <td><strong>No Claim Bonus</strong></td>
                    <td>10-50% per claim-free year</td>
                    <td>Rewards healthy living with increased coverage</td>
                  </tr>
                  <tr>
                    <td><strong>Restoration Benefit</strong></td>
                    <td>Unlimited or 100% restoration</td>
                    <td>Sum insured replenishes if exhausted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="info-section tip-section">
            <Info size={32} />
            <h2>Pro Tips for Comparison</h2>
            <ul>
              <li>Don't just compare premiums - cheaper policies may have more exclusions</li>
              <li>Read policy wordings carefully, not just brochures</li>
              <li>Check customer reviews and claim settlement experiences</li>
              <li>Consider your family's medical history when choosing coverage</li>
              <li>Look for policies with lifetime renewability</li>
              <li>Consider add-on riders for comprehensive protection</li>
            </ul>
          </section>

          <section className="info-section cta-box">
            <h2>Use Our Tools to Compare</h2>
            <p>Upload your policy documents and get instant comparison with AI-powered analysis.</p>
            <div className="cta-buttons">
              <Link to="/upload" className="btn btn-primary">
                <FileText size={18} />
                Upload Policy Document
              </Link>
              <Link to="/simulator" className="btn btn-secondary">
                <PieChart size={18} />
                Try Coverage Simulator
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ComparePoliciesPage
