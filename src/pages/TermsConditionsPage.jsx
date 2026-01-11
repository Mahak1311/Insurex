import { FileText } from 'lucide-react'
import './InfoPage.css'

function TermsConditionsPage() {
  return (
    <div className="info-page">
      <div className="container">
        <div className="info-hero">
          <FileText size={48} className="info-icon" />
          <h1>Terms & Conditions</h1>
          <p className="info-subtitle">Last updated: January 11, 2026</p>
        </div>

        <div className="info-content legal-content">
          <section className="info-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Insurex ("the Service"), you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these Terms & Conditions, please do not 
              use our Service.
            </p>
          </section>

          <section className="info-section">
            <h2>2. Description of Service</h2>
            <p>
              Insurex provides an online platform that helps users understand their health insurance coverage 
              by analyzing policy documents and hospital bills. Our services include:
            </p>
            <ul>
              <li>Bill upload and coverage analysis</li>
              <li>Policy document analysis</li>
              <li>Pre-hospitalization cost estimation</li>
              <li>Coverage simulation tools</li>
              <li>Network hospital search</li>
              <li>AI-powered dispute forecasting</li>
            </ul>
            <p>
              <strong>Important:</strong> Insurex is an informational tool only. We do not sell insurance 
              policies, process claims, or make coverage decisions. All insurance-related decisions are made 
              by your insurance provider.
            </p>
          </section>

          <section className="info-section">
            <h2>3. User Responsibilities</h2>
            <p>As a user of Insurex, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Keep your account credentials confidential</li>
              <li>Not share your account with others</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to breach or circumvent security measures</li>
              <li>Not upload malicious files or content</li>
              <li>Verify all information with your insurance provider before making decisions</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>4. Data and Privacy</h2>
            <p>
              Your use of Insurex is also governed by our Privacy Policy. We collect, store, and process 
              your personal and medical information in accordance with applicable data protection laws 
              including the Digital Personal Data Protection Act, 2023.
            </p>
            <p>Key points:</p>
            <ul>
              <li>We encrypt all sensitive data during transmission and storage</li>
              <li>Medical and policy information is confidential</li>
              <li>We do not sell your data to third parties</li>
              <li>You can request data deletion at any time</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>Specifically, we do not warrant that:</p>
            <ul>
              <li>The Service will be uninterrupted or error-free</li>
              <li>Analysis results will be 100% accurate</li>
              <li>Any information provided will result in successful insurance claims</li>
              <li>Estimates will match actual hospitalization costs</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>6. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, INSUREX SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
              WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER 
              INTANGIBLE LOSSES.
            </p>
            <p>
              In particular, we are not liable for:
            </p>
            <ul>
              <li>Insurance claim rejections</li>
              <li>Medical treatment decisions based on our analysis</li>
              <li>Financial losses from acting on our estimates</li>
              <li>Disputes with insurance providers</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>7. User-Generated Content</h2>
            <p>
              By uploading documents to Insurex, you grant us a non-exclusive license to process, analyze, 
              and store this content for the purpose of providing our Service. You retain all ownership 
              rights to your content.
            </p>
            <p>You represent and warrant that:</p>
            <ul>
              <li>You have the right to upload the content</li>
              <li>The content does not violate any third-party rights</li>
              <li>The content is accurate and not misleading</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>8. Intellectual Property</h2>
            <p>
              All content on Insurex, including text, graphics, logos, software, and analysis algorithms, 
              is the property of Insurex Healthcare Solutions Private Limited and is protected by Indian 
              and international copyright laws.
            </p>
          </section>

          <section className="info-section">
            <h2>9. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at any time, without notice, for 
              conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
            <p>
              You may terminate your account at any time by contacting us at help@insurex.in.
            </p>
          </section>

          <section className="info-section">
            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. 
              Any disputes arising from these Terms or the Service shall be subject to the exclusive 
              jurisdiction of the courts in Bangalore, Karnataka.
            </p>
          </section>

          <section className="info-section">
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of significant 
              changes via email or through the Service. Continued use of Insurex after changes constitutes 
              acceptance of the modified Terms.
            </p>
          </section>

          <section className="info-section">
            <h2>12. Contact Information</h2>
            <p>
              If you have questions about these Terms & Conditions, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Insurex Healthcare Solutions Private Limited</strong></p>
              <p>Email: legal@insurex.in</p>
              <p>Phone: 080-45680003</p>
              <p>Address: Bangalore, Karnataka, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsConditionsPage
