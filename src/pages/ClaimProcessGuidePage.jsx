import { FileText, CheckCircle, AlertTriangle, Phone, Mail } from 'lucide-react'
import './InfoPage.css'

function ClaimProcessGuidePage() {
  return (
    <div className="info-page">
      <div className="container">
        <div className="info-hero">
          <FileText size={48} className="info-icon" />
          <h1>Health Insurance Claim Process Guide</h1>
          <p className="info-subtitle">Step-by-step guide to filing successful insurance claims</p>
        </div>

        <div className="info-content">
          <section className="info-section">
            <h2>Types of Claims</h2>
            <div className="terms-grid">
              <div className="term-card">
                <h3>Cashless Claims</h3>
                <p>Hospital bills are settled directly by the insurer at network hospitals. You don't pay upfront.</p>
              </div>
              <div className="term-card">
                <h3>Reimbursement Claims</h3>
                <p>You pay the hospital first, then file a claim to get reimbursed by your insurer.</p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Cashless Claim Process</h2>
            <div className="process-timeline">
              <div className="timeline-step">
                <div className="step-marker">
                  <CheckCircle size={24} />
                </div>
                <div className="step-content">
                  <h3>Step 1: Choose Network Hospital</h3>
                  <p>Visit a hospital in your insurer's network. Check the list on your insurer's website or app.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-marker">
                  <CheckCircle size={24} />
                </div>
                <div className="step-content">
                  <h3>Step 2: Inform Insurance Desk</h3>
                  <p>Show your health card at the hospital's insurance desk. They will verify your policy details.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-marker">
                  <CheckCircle size={24} />
                </div>
                <div className="step-content">
                  <h3>Step 3: Pre-Authorization</h3>
                  <p>Hospital sends treatment estimate to insurer. Insurer approves or requests more information within 2-6 hours.</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-marker">
                  <CheckCircle size={24} />
                </div>
                <div className="step-content">
                  <h3>Step 4: Treatment & Settlement</h3>
                  <p>Receive treatment. Hospital bills insurer directly. You only pay for non-covered items (co-pay, deductibles).</p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="step-marker">
                  <CheckCircle size={24} />
                </div>
                <div className="step-content">
                  <h3>Step 5: Final Settlement</h3>
                  <p>Review the final bill. Pay any applicable co-payment or excluded expenses. Get discharge summary.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Reimbursement Claim Process</h2>
            <div className="info-list">
              <div className="list-item">
                <div className="step-number">1</div>
                <div>
                  <strong>Inform Your Insurer:</strong> Notify within 24-48 hours of hospitalization (check policy for exact timeframe)
                </div>
              </div>
              <div className="list-item">
                <div className="step-number">2</div>
                <div>
                  <strong>Complete Treatment:</strong> Get all treatment done and pay the hospital bills
                </div>
              </div>
              <div className="list-item">
                <div className="step-number">3</div>
                <div>
                  <strong>Collect Documents:</strong> Get all bills, discharge summary, prescriptions, investigation reports
                </div>
              </div>
              <div className="list-item">
                <div className="step-number">4</div>
                <div>
                  <strong>File Claim:</strong> Submit claim form with all documents within 15-30 days of discharge
                </div>
              </div>
              <div className="list-item">
                <div className="step-number">5</div>
                <div>
                  <strong>Follow Up:</strong> Insurer processes claim in 7-30 days. Amount credited to your bank account
                </div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Essential Documents Required</h2>
            <div className="documents-checklist">
              <div className="doc-category">
                <h4>Must-Have Documents</h4>
                <ul className="checklist">
                  <li><CheckCircle size={16} /> Duly filled claim form</li>
                  <li><CheckCircle size={16} /> Original hospital bills and receipts</li>
                  <li><CheckCircle size={16} /> Discharge summary/card</li>
                  <li><CheckCircle size={16} /> Doctor's prescription and investigation reports</li>
                  <li><CheckCircle size={16} /> Policy copy</li>
                  <li><CheckCircle size={16} /> Photo ID proof</li>
                  <li><CheckCircle size={16} /> Cancelled cheque or bank details</li>
                </ul>
              </div>

              <div className="doc-category">
                <h4>Additional Documents (if applicable)</h4>
                <ul className="checklist">
                  <li><CheckCircle size={16} /> FIR copy (for accidents)</li>
                  <li><CheckCircle size={16} /> Post-mortem report (death claims)</li>
                  <li><CheckCircle size={16} /> Employer certificate (for group insurance)</li>
                  <li><CheckCircle size={16} /> Previous medical records (pre-existing conditions)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="info-section alert-section">
            <AlertTriangle size={32} />
            <h2>Common Reasons for Claim Rejection</h2>
            <ul>
              <li><strong>Non-disclosure:</strong> Not revealing pre-existing conditions at the time of buying policy</li>
              <li><strong>Waiting Period:</strong> Filing claims during initial waiting period or for excluded conditions</li>
              <li><strong>Late Intimation:</strong> Not informing insurer within specified timeframe</li>
              <li><strong>Incomplete Documents:</strong> Missing bills, reports, or claim forms</li>
              <li><strong>Treatment Not Covered:</strong> Procedures excluded in policy (cosmetic surgery, experimental treatments)</li>
              <li><strong>Lapsed Policy:</strong> Premium not paid, policy inactive</li>
              <li><strong>Wrong Hospital:</strong> Non-network hospital for cashless claims</li>
            </ul>
          </section>

          <section className="info-section tip-section">
            <h2>Tips for Smooth Claim Settlement</h2>
            <ul>
              <li>Keep your policy active by paying premiums on time</li>
              <li>Always carry your health card when visiting hospitals</li>
              <li>Inform insurer immediately upon hospitalization</li>
              <li>Keep all original bills, receipts, and reports safely</li>
              <li>Read your policy document to know what's covered</li>
              <li>Follow up regularly if claim processing is delayed</li>
              <li>Use insurer's mobile app for easier claim tracking</li>
            </ul>
          </section>

          <section className="info-section cta-box">
            <h2>Need Help with Claims?</h2>
            <p>Our claims assistance team is here to help you navigate the process.</p>
            <div className="contact-buttons">
              <a href="tel:08048816818" className="btn btn-primary">
                <Phone size={18} />
                Call Claims Team
              </a>
              <a href="mailto:claims@insurex.in" className="btn btn-secondary">
                <Mail size={18} />
                Email Us
              </a>
            </div>
            <p className="contact-note">
              <strong>Claims Helpline:</strong> 080-48816818 | <strong>Email:</strong> claims@insurex.in
              <br />
              <small>Available 24/7 for emergency claim assistance</small>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ClaimProcessGuidePage
