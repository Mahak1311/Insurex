import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'
import './InfoPage.css'

function ContactUsPage() {
  return (
    <div className="info-page">
      <div className="container">
        <div className="info-hero">
          <Phone size={48} className="info-icon" />
          <h1>Contact Us</h1>
          <p className="info-subtitle">We're here to help. Reach out anytime!</p>
        </div>

        <div className="info-content">
          <section className="info-section">
            <h2>Get in Touch</h2>
            <p>
              Have questions about your insurance coverage? Need help using Insurex? Our team is ready to 
              assist you. Choose the contact method that works best for you.
            </p>
          </section>

          <section className="info-section">
            <div className="contact-methods-grid">
              <div className="contact-method-card">
                <div className="method-icon">
                  <Phone size={32} />
                </div>
                <h3>Phone Support</h3>
                <p className="method-label">General Inquiries</p>
                <a href="tel:08045680003" className="contact-link">080-45680003</a>
                <p className="method-hours">Mon-Sat: 9 AM - 7 PM IST</p>
                <a href="tel:08045680003" className="btn btn-primary">
                  Call Now
                </a>
              </div>

              <div className="contact-method-card emergency">
                <div className="method-icon">
                  <Phone size={32} />
                </div>
                <h3>Claims Assistance</h3>
                <p className="method-label">Emergency Support Only</p>
                <a href="tel:08048816818" className="contact-link">080-48816818</a>
                <p className="method-hours">Available 24/7</p>
                <p className="method-note">
                  <strong>Note:</strong> This line is strictly for claim-related emergencies. 
                  For general queries, please use our main number.
                </p>
              </div>

              <div className="contact-method-card">
                <div className="method-icon">
                  <Mail size={32} />
                </div>
                <h3>Email Us</h3>
                <p className="method-label">General Support</p>
                <a href="mailto:help@insurex.in" className="contact-link">help@insurex.in</a>
                <p className="method-hours">Response within 24 hours</p>
                <a href="mailto:help@insurex.in" className="btn btn-secondary">
                  Send Email
                </a>
              </div>

              <div className="contact-method-card">
                <div className="method-icon">
                  <MessageCircle size={32} />
                </div>
                <h3>WhatsApp</h3>
                <p className="method-label">Quick Questions</p>
                <a href="https://wa.me/918045680003" className="contact-link">+91 80456 80003</a>
                <p className="method-hours">Mon-Sat: 9 AM - 7 PM IST</p>
                <a href="https://wa.me/918045680003" target="_blank" rel="noopener noreferrer" className="btn btn-success">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Specific Inquiries</h2>
            <div className="inquiry-types">
              <div className="inquiry-item">
                <h3>📋 Claims Support</h3>
                <p>Email: <a href="mailto:claims@insurex.in">claims@insurex.in</a></p>
                <p>Phone: 080-48816818 (24/7)</p>
              </div>

              <div className="inquiry-item">
                <h3>💼 Business & Partnerships</h3>
                <p>Email: <a href="mailto:business@insurex.in">business@insurex.in</a></p>
                <p>For corporate inquiries and collaboration opportunities</p>
              </div>

              <div className="inquiry-item">
                <h3>🎯 Careers</h3>
                <p>Email: <a href="mailto:careers@insurex.in">careers@insurex.in</a></p>
                <p>Join our mission to make insurance transparent</p>
              </div>

              <div className="inquiry-item">
                <h3>⚖️ Legal & Compliance</h3>
                <p>Email: <a href="mailto:legal@insurex.in">legal@insurex.in</a></p>
                <p>For legal matters, data requests, and compliance</p>
              </div>

              <div className="inquiry-item">
                <h3>🔒 Privacy Concerns</h3>
                <p>Email: <a href="mailto:privacy@insurex.in">privacy@insurex.in</a></p>
                <p>Data protection officer for privacy-related queries</p>
              </div>

              <div className="inquiry-item">
                <h3>📰 Media & Press</h3>
                <p>Email: <a href="mailto:press@insurex.in">press@insurex.in</a></p>
                <p>For media inquiries and press releases</p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Office Location</h2>
            <div className="office-info">
              <div className="office-details">
                <div className="office-item">
                  <MapPin size={24} />
                  <div>
                    <h3>Head Office</h3>
                    <p>Insurex Healthcare Solutions Private Limited</p>
                    <p>Bangalore, Karnataka 560001</p>
                    <p>India</p>
                  </div>
                </div>

                <div className="office-item">
                  <Clock size={24} />
                  <div>
                    <h3>Business Hours</h3>
                    <p><strong>Monday - Saturday:</strong> 9:00 AM - 7:00 PM IST</p>
                    <p><strong>Sunday:</strong> Closed</p>
                    <p><strong>Claims Emergency:</strong> 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Frequently Asked Questions</h2>
            <p>
              Before reaching out, you might find answers to common questions in our guides:
            </p>
            <div className="faq-links">
              <a href="/health-insurance-101" className="faq-link-card">
                <h4>📚 Health Insurance 101</h4>
                <p>Learn the basics of health insurance</p>
              </a>
              <a href="/claim-process-guide" className="faq-link-card">
                <h4>📝 Claim Process Guide</h4>
                <p>Step-by-step claim filing instructions</p>
              </a>
            </div>
          </section>

          <section className="info-section tip-section">
            <h2>💡 Tips for Faster Support</h2>
            <ul>
              <li>Have your policy number ready when calling</li>
              <li>For email inquiries, include relevant documents or screenshots</li>
              <li>Check your spam folder for our email responses</li>
              <li>Use WhatsApp for quick, non-urgent questions</li>
              <li>For claims emergencies, call our 24/7 hotline directly</li>
            </ul>
          </section>

          <section className="info-section cta-box">
            <h2>We're Here to Help</h2>
            <p>
              No question is too small. Whether you're confused about a policy term, need help uploading 
              a document, or facing a claim issue—we're here for you.
            </p>
            <div className="cta-buttons">
              <a href="tel:08045680003" className="btn btn-primary">
                <Phone size={18} />
                Call Us Now
              </a>
              <a href="mailto:help@insurex.in" className="btn btn-secondary">
                <Mail size={18} />
                Email Support
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
