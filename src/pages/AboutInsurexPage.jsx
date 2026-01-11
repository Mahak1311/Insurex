import { Shield, Target, Users, Heart, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import './InfoPage.css'

function AboutInsurexPage() {
  return (
    <div className="info-page">
      <div className="container">
        <div className="info-hero">
          <Shield size={48} className="info-icon" />
          <h1>About Insurex</h1>
          <p className="info-subtitle">Making healthcare insurance transparent for every Indian family</p>
        </div>

        <div className="info-content">
          <section className="info-section">
            <h2>Our Vision</h2>
            <p>
              Insurex is built with a simple mission: to help Indians understand their health insurance 
              coverage before it's too late. We've all heard stories of families facing unexpected bills 
              after hospitalization, discovering too late that certain procedures weren't covered, or 
              struggling to navigate complex policy documents written in confusing legal language.
            </p>
            <p>
              We created Insurex to change that. Using AI and machine learning, we translate complex insurance 
              policies into clear, actionable insights. Our platform helps you understand exactly what's 
              covered, estimate costs before treatment, and avoid billing surprises.
            </p>
          </section>

          <section className="info-section">
            <h2>Our Mission</h2>
            <div className="mission-card">
              <Target size={40} />
              <h3>Transparency First</h3>
              <p>
                We believe every Indian deserves to understand their insurance coverage without needing a 
                law degree. We're committed to making insurance accessible, understandable, and useful for 
                everyone—from urban professionals to rural families.
              </p>
            </div>
          </section>

          <section className="info-section">
            <h2>What We Do</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon-large">
                  <Sparkles size={32} />
                </div>
                <h3>AI-Powered Analysis</h3>
                <p>
                  Upload your policy document or hospital bill, and our AI instantly analyzes coverage, 
                  identifies gaps, and highlights potential issues.
                </p>
              </div>

              <div className="feature-item">
                <div className="feature-icon-large">
                  <Shield size={32} />
                </div>
                <h3>Pre-Hospitalization Guidance</h3>
                <p>
                  Planning a surgery? Know your out-of-pocket costs before admission. Our tool estimates 
                  coverage based on procedure, location, and your specific policy.
                </p>
              </div>

              <div className="feature-item">
                <div className="feature-icon-large">
                  <Users size={32} />
                </div>
                <h3>Family Policy Management</h3>
                <p>
                  Track coverage for your entire family, identify who's covered for what, and spot potential 
                  gaps before they become problems.
                </p>
              </div>

              <div className="feature-item">
                <div className="feature-icon-large">
                  <Heart size={32} />
                </div>
                <h3>Dispute Assistance</h3>
                <p>
                  If your claim is rejected or partially paid, our AI generates customized scripts to help 
                  you dispute charges with your insurer—professionally and effectively.
                </p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Our Impact Goals</h2>
            <div className="stats-showcase">
              <div className="stat-box">
                <div className="stat-number">∞</div>
                <div className="stat-label">Families We Want to Help</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">₹0</div>
                <div className="stat-label">Billing Surprises (Our Goal)</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">100%</div>
                <div className="stat-label">Transparency Target</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support Available</div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Our Values</h2>
            <div className="values-list">
              <div className="value-item">
                <h3>🔒 Privacy & Security</h3>
                <p>
                  Your health data is deeply personal. We use bank-level encryption and never sell your 
                  information to third parties.
                </p>
              </div>
              <div className="value-item">
                <h3>🎯 Accuracy</h3>
                <p>
                  Our AI models are trained on thousands of real insurance policies and continuously updated 
                  to reflect the latest IRDAI regulations.
                </p>
              </div>
              <div className="value-item">
                <h3>🤝 Patient-First</h3>
                <p>
                  We're on your side, not the insurance company's. Our goal is to help you get every rupee 
                  you're entitled to under your policy.
                </p>
              </div>
              <div className="value-item">
                <h3>🌏 Accessibility</h3>
                <p>
                  Healthcare shouldn't be complicated. We're building tools that work in multiple Indian 
                  languages and don't require technical expertise.
                </p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Why We're Different</h2>
            <p>
              Unlike traditional insurance brokers or comparison websites, we don't sell policies. We don't 
              earn commissions from insurers. Our only focus is helping you understand and maximize the 
              coverage you already have.
            </p>
            <p>
              We're building a platform that combines cutting-edge AI technology with deep insurance expertise 
              to solve a real problem faced by millions of Indians—understanding what their insurance actually 
              covers when they need it most.
            </p>
          </section>

          <section className="info-section cta-box">
            <h2>Join Us on This Journey</h2>
            <p>
              Start understanding your insurance coverage today. No hidden fees, no commissions, just clear 
              answers to your questions. Be among the early users helping us build the future of insurance 
              transparency in India.
            </p>
            <Link to="/signup" className="btn btn-primary">
              Get Started Free
            </Link>
          </section>

          <section className="info-section">
            <h2>Get in Touch</h2>
            <div className="contact-info">
              <p><strong>Insurex Healthcare Platform</strong></p>
              <p>Bangalore, Karnataka, India</p>
              <p>Email: help@insurex.in</p>
              <p>Phone: 080-45680003</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default AboutInsurexPage
