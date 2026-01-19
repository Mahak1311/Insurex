import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, Image, Camera, Shield, CheckCircle, Loader } from 'lucide-react'
import { analyzeCoverage } from '../lib/coverageEngine'
import './UploadPage.css'

function UploadPage() {
  const navigate = useNavigate()
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState({
    bill: null,
    policy: null
  })
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)
  const cameraInputBillRef = useRef(null)
  const galleryInputBillRef = useRef(null)
  const cameraInputPolicyRef = useRef(null)
  const galleryInputPolicyRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFiles({ ...uploadedFiles, [type]: e.dataTransfer.files[0] })
    }
  }

  const handleFileSelect = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles({ ...uploadedFiles, [type]: e.target.files[0] })
    }
  }

  const handleAnalyze = async () => {
    setProcessing(true)
    setError(null)
    
    try {
      // Simulate OCR/text extraction from uploaded files
      // In a real app, you'd send files to a backend OCR service
      
      // Mock policy rules
      const policyRules = {
        roomRentCapPerDay: 5000,
        coveredProcedures: ['Appendectomy', 'Cataract Surgery', 'Knee Replacement'],
        excludedItems: ['Cosmetic Surgery'],
        diagnosticCoveragePercent: 100,
        coPayPercent: 10
      }

      // Mock bill items
      const billItems = [
        { name: 'Room Charges', category: 'room', cost: 50000, days: 5 },
        { name: 'Surgery - Appendectomy', category: 'procedure', cost: 70000, days: 1 },
        { name: 'Medicine', category: 'medicine', cost: 20000, days: 1 },
        { name: 'X-Ray', category: 'diagnostic', cost: 5000, days: 1 },
        { name: 'Blood Test', category: 'diagnostic', cost: 5000, days: 1 }
      ]

      // Use the coverage engine to analyze
      const analysis = analyzeCoverage(policyRules, billItems)
      
      // Store the analysis result in localStorage so dashboard can access it
      localStorage.setItem('latestAnalysis', JSON.stringify({
        ...analysis,
        policyRules,
        billItems,
        uploadDate: new Date().toISOString()
      }))

      // Wait a bit to show processing animation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Navigate to dashboard with the results
      navigate('/dashboard', { state: { analysisComplete: true } })
    } catch (err) {
      console.error('Analysis error:', err)
      setError('Failed to analyze documents. Please try again.')
      setProcessing(false)
    }
  }

  return (
    <div className="upload-page">
      <div className="container">
        <div className="upload-header">
          <h1 className="page-title">Upload Your Documents</h1>
          <p className="page-subtitle">
            Upload your hospital bill and insurance policy to get instant coverage analysis
          </p>
        </div>

        <div className="upload-grid">
          {/* Hospital Bill Upload */}
          <div className="upload-section">
            <h2 className="upload-section-title">
              <FileText size={24} />
              Hospital Bill
            </h2>
            
            <div
              className={`upload-zone ${dragActive ? 'drag-active' : ''} ${uploadedFiles.bill ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => handleDrop(e, 'bill')}
            >
              {uploadedFiles.bill ? (
                <div className="upload-success">
                  <CheckCircle size={48} className="success-icon" />
                  <p className="file-name">{uploadedFiles.bill.name}</p>
                  <button 
                    className="btn-text"
                    onClick={() => setUploadedFiles({ ...uploadedFiles, bill: null })}
                  >
                    Remove & Upload New
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={48} className="upload-icon" />
                  <p className="upload-text">
                    Drag & drop your hospital bill here
                  </p>
                  <p className="upload-hint">or</p>
                  <label className="btn btn-secondary">
                    Browse Files
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileSelect(e, 'bill')}
                    />
                  </label>
                  <p className="upload-formats">
                    Supports: PDF, JPG, PNG
                  </p>
                </>
              )}
            </div>

            <div className="quick-actions">
              <button 
                className="quick-action-btn"
                onClick={() => cameraInputBillRef.current?.click()}
                type="button"
              >
                <Camera size={20} />
                Scan with Camera
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => galleryInputBillRef.current?.click()}
                type="button"
              >
                <Image size={20} />
                From Gallery
              </button>
              <input
                ref={cameraInputBillRef}
                type="file"
                hidden
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileSelect(e, 'bill')}
              />
              <input
                ref={galleryInputBillRef}
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileSelect(e, 'bill')}
              />
            </div>
          </div>

          {/* Insurance Policy Upload */}
          <div className="upload-section">
            <h2 className="upload-section-title">
              <Shield size={24} />
              Insurance Policy
            </h2>
            
            <div
              className={`upload-zone ${dragActive ? 'drag-active' : ''} ${uploadedFiles.policy ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => handleDrop(e, 'policy')}
            >
              {uploadedFiles.policy ? (
                <div className="upload-success">
                  <CheckCircle size={48} className="success-icon" />
                  <p className="file-name">{uploadedFiles.policy.name}</p>
                  <button 
                    className="btn-text"
                    onClick={() => setUploadedFiles({ ...uploadedFiles, policy: null })}
                  >
                    Remove & Upload New
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={48} className="upload-icon" />
                  <p className="upload-text">
                    Drag & drop your insurance policy here
                  </p>
                  <p className="upload-hint">or</p>
                  <label className="btn btn-secondary">
                    Browse Files
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileSelect(e, 'policy')}
                    />
                  </label>
                  <p className="upload-formats">
                    Supports: PDF, JPG, PNG
                  </p>
                </>
              )}
            </div>

            <div className="quick-actions">
              <button 
                className="quick-action-btn"
                onClick={() => cameraInputPolicyRef.current?.click()}
                type="button"
              >
                <Camera size={20} />
                Scan with Camera
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => galleryInputPolicyRef.current?.click()}
                type="button"
              >
                <Image size={20} />
                From Gallery
              </button>
              <input
                ref={cameraInputPolicyRef}
                type="file"
                hidden
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileSelect(e, 'policy')}
              />
              <input
                ref={galleryInputPolicyRef}
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileSelect(e, 'policy')}
              />
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="security-note card">
          <Shield size={24} className="security-icon" />
          <div>
            <h3>Your Data is Secure</h3>
            <p>
              All documents are encrypted end-to-end. We never share your personal information 
              with third parties. Documents are automatically deleted after 30 days.
            </p>
          </div>
        </div>

        {/* Analyze Button */}
        <div className="upload-actions">
          {error && (
            <div className="error-message" style={{ marginBottom: '1rem', padding: '1rem', background: '#fee', borderRadius: '8px', color: '#c33' }}>
              {error}
            </div>
          )}
          <button
            className="btn btn-primary btn-large"
            disabled={!uploadedFiles.bill || !uploadedFiles.policy || processing}
            onClick={handleAnalyze}
          >
            {processing ? (
              <>
                <Loader size={20} className="spinner" />
                Analyzing Documents...
              </>
            ) : (
              <>
                Analyze Coverage
                <CheckCircle size={20} />
              </>
            )}
          </button>
        </div>

        {processing && (
          <div className="processing-status card">
            <div className="processing-steps">
              <div className="processing-step active">
                <div className="step-icon">✓</div>
                <span>Documents uploaded</span>
              </div>
              <div className="processing-step active">
                <Loader className="step-loader" size={16} />
                <span>Extracting text with OCR</span>
              </div>
              <div className="processing-step">
                <div className="step-icon">⏳</div>
                <span>Analyzing coverage terms</span>
              </div>
              <div className="processing-step">
                <div className="step-icon">⏳</div>
                <span>Generating breakdown</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UploadPage
