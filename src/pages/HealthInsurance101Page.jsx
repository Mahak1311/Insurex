import { Shield, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import './InfoPage.css'

function HealthInsurance101Page() {
  return (
    <div className="info-page">
      <div className="container">
        <div className="info-hero">
          <Shield size={48} className="info-icon" />
          <h1>Health Insurance 101</h1>
          <p className="info-subtitle">Everything you need to know about health insurance in India</p>
        </div>

        <div className="info-content">
          <section className="info-section">
            <h2>What is Health Insurance?</h2>
            <p>
              Health insurance is a type of insurance coverage that pays for medical and surgical expenses 
              incurred by the insured. It can reimburse the insured for expenses incurred from illness or 
              injury, or pay the care provider directly.
            </p>
          </section>

          <section className="info-section">
            <h2>Key Terms You Should Know</h2>
            <div className="terms-grid">
              <div className="term-card">
                <h3>Premium</h3>
                <p>The amount you pay regularly (monthly/yearly) to keep your insurance active.</p>
              </div>
              <div className="term-card">
                <h3>Sum Insured</h3>
                <p>The maximum amount your insurer will pay for covered medical expenses in a policy year.</p>
              </div>
              <div className="term-card">
                <h3>Deductible</h3>
                <p>The amount you must pay out-of-pocket before your insurance starts covering costs.</p>
              </div>
              <div className="term-card">
                <h3>Co-payment</h3>
                <p>A fixed percentage of the claim amount that you must pay, with the insurer paying the rest.</p>
              </div>
              <div className="term-card">
                <h3>Waiting Period</h3>
                <p>The time you must wait after buying a policy before you can claim for certain conditions.</p>
              </div>
              <div className="term-card">
                <h3>Cashless Treatment</h3>
                <p>Treatment at network hospitals where the insurer pays the hospital directly.</p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Types of Health Insurance in India</h2>
            <div className="info-list">
              <div className="list-item">
                <CheckCircle size={20} />
                <div>
                  <strong>Individual Health Insurance:</strong> Covers a single person.
                </div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div>
                  <strong>Family Floater:</strong> Covers entire family under one sum insured.
                </div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div>
                  <strong>Senior Citizen Plans:</strong> Designed for people above 60 years.
                </div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div>
                  <strong>Critical Illness:</strong> Provides lump sum on diagnosis of specific diseases.
                </div>
              </div>
              <div className="list-item">
                <CheckCircle size={20} />
                <div>
                  <strong>Top-up Plans:</strong> Additional coverage beyond your base policy.
                </div>
              </div>
            </div>
          </section>

          <section className="info-section alert-section">
            <AlertTriangle size={32} />
            <h2>Common Exclusions</h2>
            <p>Most health insurance policies don't cover:</p>
            <ul>
              <li>Pre-existing diseases (during waiting period)</li>
              <li>Cosmetic procedures</li>
              <li>Self-inflicted injuries</li>
              <li>Experimental treatments</li>
              <li>War or nuclear-related injuries</li>
            </ul>
          </section>

          <section className="info-section tip-section">
            <Info size={32} />
            <h2>Tips for Choosing the Right Policy</h2>
            <ul>
              <li>Choose adequate sum insured (at least ₹5-10 lakhs)</li>
              <li>Check network hospitals in your city</li>
              <li>Look for lifetime renewability</li>
              <li>Compare waiting periods</li>
              <li>Understand co-payment clauses</li>
              <li>Read the fine print carefully</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default HealthInsurance101Page
