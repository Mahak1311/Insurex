import { Shield, Lock } from 'lucide-react'
import './InfoPage.css'

function PrivacyPolicyPage() {
  return (
    <div className="info-page">
      <div className="container">
        <div className="info-hero">
          <Lock size={48} className="info-icon" />
          <h1>Privacy Policy</h1>
          <p className="info-subtitle">Last updated: January 11, 2026</p>
        </div>

        <div className="info-content legal-content">
          <section className="info-section">
            <h2>1. Introduction</h2>
            <p>
              At Insurex Healthcare Solutions Private Limited ("Insurex", "we", "our", "us"), we take your 
              privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our Service.
            </p>
            <p>
              This policy complies with the Digital Personal Data Protection Act, 2023 and other applicable 
              Indian data protection laws.
            </p>
          </section>

          <section className="info-section">
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>When you register and use Insurex, we collect:</p>
            <ul>
              <li>Name, email address, phone number</li>
              <li>Date of birth, gender</li>
              <li>Location (city, state)</li>
              <li>Login credentials</li>
            </ul>

            <h3>2.2 Health and Insurance Information</h3>
            <ul>
              <li>Insurance policy details (policy number, coverage amount, insurer name)</li>
              <li>Hospital bills and medical expenses</li>
              <li>Medical procedures and diagnoses (from uploaded documents)</li>
              <li>Family member information (for family policies)</li>
            </ul>

            <h3>2.3 Technical Information</h3>
            <ul>
              <li>IP address, browser type, device information</li>
              <li>Usage data (pages visited, time spent, features used)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li><strong>Provide Our Service:</strong> Analyze coverage, process documents, generate estimates</li>
              <li><strong>Account Management:</strong> Create and maintain your account</li>
              <li><strong>Communication:</strong> Send updates, notifications, and support responses</li>
              <li><strong>Improve Service:</strong> Analyze usage patterns and enhance features</li>
              <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents</li>
              <li><strong>Compliance:</strong> Meet legal and regulatory requirements</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>4. Data Security</h2>
            <p>We implement robust security measures to protect your data:</p>
            <ul>
              <li><strong>Encryption:</strong> All data transmitted is encrypted using SSL/TLS</li>
              <li><strong>Storage Security:</strong> Data at rest is encrypted using AES-256</li>
              <li><strong>Access Controls:</strong> Strict role-based access to sensitive data</li>
              <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
              <li><strong>Secure Infrastructure:</strong> Hosted on secure cloud platforms with certifications</li>
            </ul>
            <p>
              However, no system is 100% secure. We cannot guarantee absolute security but continuously 
              work to improve our protections.
            </p>
          </section>

          <section className="info-section">
            <h2>5. Data Sharing and Disclosure</h2>
            <p>We <strong>DO NOT sell</strong> your personal or health information to third parties.</p>
            
            <p>We may share your information only in these limited circumstances:</p>
            <ul>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share data</li>
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate (cloud hosting, analytics) 
                  under strict confidentiality agreements</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              <li><strong>Protection:</strong> To protect rights, property, or safety of Insurex, users, or the public</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>6. Your Rights and Choices</h2>
            <p>Under Indian data protection laws, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your data (right to be forgotten)</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Withdraw Consent:</strong> Opt-out of data processing where consent was given</li>
              <li><strong>Restriction:</strong> Limit how we process your data</li>
            </ul>
            <p>
              To exercise these rights, contact us at privacy@insurex.in or call 080-45680003.
            </p>
          </section>

          <section className="info-section">
            <h2>7. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active or as needed to provide services. 
              After account deletion, we may retain certain data for:
            </p>
            <ul>
              <li>Legal compliance (tax records, audit trails)</li>
              <li>Dispute resolution</li>
              <li>Fraud prevention</li>
              <li>Enforcing agreements</li>
            </ul>
            <p>
              Typically, personal data is deleted within 30 days of account closure, except where longer 
              retention is required by law.
            </p>
          </section>

          <section className="info-section">
            <h2>8. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences and login status</li>
              <li>Analyze site traffic and usage patterns</li>
              <li>Provide personalized content</li>
            </ul>
            <p>
              You can control cookies through your browser settings. Note that disabling cookies may limit 
              functionality of our Service.
            </p>
          </section>

          <section className="info-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Insurex is not intended for users under 18 years of age. We do not knowingly collect personal 
              information from children. If you believe we have collected data from a child, please contact 
              us immediately.
            </p>
          </section>

          <section className="info-section">
            <h2>10. International Data Transfers</h2>
            <p>
              Your data is primarily stored and processed in India. If we transfer data internationally, 
              we ensure adequate safeguards are in place in accordance with applicable laws.
            </p>
          </section>

          <section className="info-section">
            <h2>11. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes 
              via email or through prominent notice on our Service. Continued use after changes indicates 
              acceptance of the updated policy.
            </p>
          </section>

          <section className="info-section">
            <h2>12. Contact Us</h2>
            <p>
              For questions, concerns, or requests regarding this Privacy Policy or your data:
            </p>
            <div className="contact-info">
              <p><strong>Data Protection Officer</strong></p>
              <p><strong>Insurex Healthcare Solutions Private Limited</strong></p>
              <p>Email: privacy@insurex.in</p>
              <p>Phone: 080-45680003</p>
              <p>Address: Bangalore, Karnataka, India</p>
            </div>
          </section>

          <section className="info-section tip-section">
            <Shield size={32} />
            <h2>Our Commitment to You</h2>
            <p>
              At Insurex, protecting your sensitive health and insurance information is our top priority. 
              We are committed to transparency, security, and giving you control over your data. If you 
              have any concerns, please don't hesitate to reach out to us.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
