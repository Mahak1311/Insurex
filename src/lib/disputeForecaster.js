// AI Dispute Forecaster Engine
// Analyzes bill items and identifies disputable charges with guidance

/**
 * Analyze bill item for dispute potential
 * @param {Object} item - Bill item with coverage analysis
 * @param {Object} policyRules - Insurance policy rules
 * @returns {Object} - Dispute analysis with risk level and guidance
 */
export function analyzeDisputePotential(item, policyRules) {
  const disputes = []
  
  const {
    itemName,
    originalCost,
    coveredCost,
    status,
    explanation,
    category = 'other'
  } = item

  // Room Rent Disputes - HIGH PRIORITY
  if (category === 'room' && status === 'partially_covered') {
    const uncovered = originalCost - coveredCost
    const percentDeducted = Math.round((uncovered / originalCost) * 100)
    
    if (percentDeducted > 40) {
      disputes.push({
        riskLevel: 'high',
        reason: 'Excessive Room Rent Deduction',
        details: `${percentDeducted}% of room charges (₹${uncovered.toLocaleString()}) rejected due to cap. This may trigger proportionate deductions on other costs.`,
        disputeReason: 'Room cap enforcement often includes hidden proportionate deductions on consumables and procedures, which is not disclosed upfront.',
        actionPoints: [
          'Request itemized breakdown showing how room cap affected other charges',
          'Ask for policy clause justifying proportionate deductions',
          'Challenge if other items were reduced without clear reasoning'
        ],
        supportingDocs: ['Policy document with room rent clause', 'Hospital room allocation slip', 'Doctor\'s prescription if room upgrade was medically necessary'],
        successRate: 65
      })
    } else if (percentDeducted > 20) {
      disputes.push({
        riskLevel: 'medium',
        reason: 'Room Rent Exceeds Policy Cap',
        details: `${percentDeducted}% of room charges (₹${uncovered.toLocaleString()}) not covered. Cap may have been applied incorrectly.`,
        disputeReason: 'Room caps are often calculated incorrectly, especially for partial days or ICU/emergency situations.',
        actionPoints: [
          'Verify if room upgrade was medically necessary',
          'Check if emergency/ICU exemptions apply',
          'Confirm daily rate calculation is accurate'
        ],
        supportingDocs: ['Doctor\'s recommendation for specific room type', 'Hospital admission records', 'Room availability certificate'],
        successRate: 55
      })
    }
  }

  // Consumables and Medicines - HIGH DISPUTE RATE
  if ((category === 'consumable' || category === 'medicine') && status === 'not_covered') {
    if (originalCost > 10000) {
      disputes.push({
        riskLevel: 'high',
        reason: 'High-Value Consumables Rejected',
        details: `₹${originalCost.toLocaleString()} in consumables/medicines not covered. Many policies cover consumables but insurers often reject them.`,
        disputeReason: 'Insurers frequently reject consumables claiming they are "not medically necessary" even when they are part of standard treatment protocol.',
        actionPoints: [
          'Request doctor to certify consumables were medically necessary',
          'Check policy for consumables coverage clause',
          'Compare against IRDAI guidelines on consumable coverage'
        ],
        supportingDocs: ['Doctor\'s prescription and necessity certificate', 'Hospital protocol document', 'Policy wording on consumables'],
        successRate: 70
      })
    } else if (originalCost > 3000) {
      disputes.push({
        riskLevel: 'medium',
        reason: 'Consumables Not Covered',
        details: `₹${originalCost.toLocaleString()} in consumables rejected. Policy may cover these items.`,
        disputeReason: 'Standard consumables like gloves, syringes, and sutures are often incorrectly excluded.',
        actionPoints: [
          'Verify if consumables are listed in policy inclusions',
          'Check if items were part of surgical package',
          'Request hospital to reclassify if misclassified'
        ],
        supportingDocs: ['Itemized bill showing consumables', 'Policy inclusions list', 'Hospital treatment protocol'],
        successRate: 60
      })
    }
  }

  // Diagnostics - Partial Coverage Disputes
  if (category === 'diagnostic' && status === 'partially_covered') {
    const uncovered = originalCost - coveredCost
    if (uncovered > 5000) {
      disputes.push({
        riskLevel: 'medium',
        reason: 'Diagnostic Tests Partially Covered',
        details: `₹${uncovered.toLocaleString()} of diagnostic costs not covered. Sub-limits may be incorrectly applied.`,
        disputeReason: 'Pre-hospitalization and post-hospitalization diagnostic sub-limits are often misapplied to in-hospital tests.',
        actionPoints: [
          'Verify if tests were done during hospitalization',
          'Check if sub-limits apply to in-hospital diagnostics',
          'Confirm tests were medically necessary for treatment'
        ],
        supportingDocs: ['Doctor\'s prescription for tests', 'Test reports with dates', 'Policy sub-limit clauses'],
        successRate: 50
      })
    }
  }

  // Procedure Rejections - HIGH IMPACT
  if (category === 'procedure' && status === 'not_covered' && originalCost > 20000) {
    disputes.push({
      riskLevel: 'high',
      reason: 'Major Procedure Not Covered',
      details: `₹${originalCost.toLocaleString()} procedure rejected. This may be an error as most policies cover standard procedures.`,
      disputeReason: 'Procedures are sometimes rejected due to coding errors, waiting period misapplication, or incorrect exclusion claims.',
      actionPoints: [
        'Verify procedure code matches policy coverage list',
        'Check if waiting period has been completed',
        'Confirm procedure was not pre-existing condition related'
      ],
      supportingDocs: ['Policy procedure coverage list', 'Doctor\'s notes on medical necessity', 'Hospital discharge summary'],
      successRate: 75
    })
  }

  // Co-payment Disputes
  if (coveredCost > 0 && policyRules?.coPayPercent > 0) {
    const coPayAmount = Math.round((coveredCost * policyRules.coPayPercent) / 100)
    if (coPayAmount > 20000) {
      disputes.push({
        riskLevel: 'low',
        reason: 'High Co-Payment Amount',
        details: `₹${coPayAmount.toLocaleString()} (${policyRules.coPayPercent}%) co-payment applied. Verify if co-payment clause was disclosed.`,
        disputeReason: 'Co-payment clauses are sometimes not clearly disclosed at policy purchase or may not apply in emergency cases.',
        actionPoints: [
          'Check if co-payment was disclosed in policy schedule',
          'Verify if emergency treatment exempts co-payment',
          'Confirm age-based co-payment is correctly applied'
        ],
        supportingDocs: ['Policy schedule showing co-payment', 'Emergency admission records', 'Age proof if age-based co-pay'],
        successRate: 40
      })
    }
  }

  // Full Rejection Disputes
  if (status === 'not_covered' && originalCost > 5000 && category !== 'consumable' && category !== 'medicine') {
    disputes.push({
      riskLevel: 'medium',
      reason: 'Item Fully Rejected',
      details: `₹${originalCost.toLocaleString()} completely rejected. Reason: "${explanation}"`,
      disputeReason: 'Full rejections often happen due to miscommunication, coding errors, or overly strict interpretation of policy terms.',
      actionPoints: [
        'Request detailed reason for rejection',
        'Check if item can be reclassified under covered category',
        'Verify exclusion clause actually applies to this item'
      ],
      supportingDocs: ['Hospital bill showing item details', 'Policy exclusions list', 'Doctor\'s necessity certificate'],
      successRate: 45
    })
  }

  return disputes
}

/**
 * Generate dispute script for communication with insurer
 * @param {Object} dispute - Dispute details
 * @param {Object} itemDetails - Bill item details
 * @param {Object} patientInfo - Patient information
 * @returns {Object} - Call and email scripts
 */
export function generateDisputeScript(dispute, itemDetails, patientInfo = {}) {
  const {
    policyNumber = '[Your Policy Number]',
    claimNumber = '[Claim Number]',
    patientName = '[Patient Name]',
    hospitalName = '[Hospital Name]',
    admissionDate = '[Admission Date]',
    dischargeDate = '[Discharge Date]'
  } = patientInfo

  const { itemName, originalCost, coveredCost } = itemDetails
  const uncoveredAmount = originalCost - coveredCost

  // Email Script
  const emailScript = `Subject: Claim Dispute Request - ${dispute.reason} - Policy ${policyNumber}

Dear [Insurance Company Name] Claims Team,

I am writing to formally dispute the coverage decision on my recent health insurance claim.

CLAIM DETAILS:
Policy Number: ${policyNumber}
Claim Number: ${claimNumber}
Patient Name: ${patientName}
Hospital: ${hospitalName}
Admission Date: ${admissionDate}
Discharge Date: ${dischargeDate}

DISPUTED ITEM:
Item: ${itemName}
Billed Amount: ₹${originalCost.toLocaleString()}
Covered Amount: ₹${coveredCost.toLocaleString()}
Disputed Amount: ₹${uncoveredAmount.toLocaleString()}

DISPUTE REASON:
${dispute.disputeReason}

${dispute.details}

REQUESTED ACTION:
I respectfully request a review of this decision based on the following points:

${dispute.actionPoints.map((point, idx) => `${idx + 1}. ${point}`).join('\n')}

SUPPORTING DOCUMENTS:
I am attaching/will provide the following documents:
${dispute.supportingDocs.map((doc, idx) => `${idx + 1}. ${doc}`).join('\n')}

I request that you review this claim within 15 days as per IRDAI guidelines and provide a detailed explanation for your decision. If the claim is still denied, please provide information on the escalation process.

Thank you for your prompt attention to this matter.

Sincerely,
${patientName}
Contact: [Your Phone Number]
Email: [Your Email]

---
⚠️ DISPUTE GUIDANCE: This is a template. Success rate for this type of dispute: ${dispute.successRate}%
IRDAI Regulation: Insurers must respond to grievances within 15 days and provide clear reasons for claim rejections.`

  // Call Script
  const callScript = `📞 CALL SCRIPT FOR INSURANCE COMPANY

[When calling, have these ready: Policy number, Claim number, Bill copy, Doctor's notes]

---

OPENING:

"Hello, I'm calling regarding my health insurance claim that was recently processed. My policy number is ${policyNumber} and claim number is ${claimNumber}."

"I received the settlement and noticed that ₹${uncoveredAmount.toLocaleString()} for ${itemName} was not covered. I would like to understand the reason and discuss this decision."

---

KEY POINTS TO RAISE:

1️⃣ ${dispute.actionPoints[0]}

   SAY: "${dispute.actionPoints[0]}. Can you explain how this was calculated?"

2️⃣ ${dispute.actionPoints[1]}

   SAY: "${dispute.actionPoints[1]}. Could you point me to the specific policy clause?"

3️⃣ ${dispute.actionPoints[2]}

   SAY: "${dispute.actionPoints[2]}. I have supporting documents to prove this."

---

IF THEY SAY "POLICY DOESN'T COVER THIS":

Response: "I have reviewed my policy document and it doesn't explicitly exclude this. Can you point me to the exact clause number? I would also like to know if this can be reviewed by your senior claims team."

---

IF THEY SAY "THIS IS STANDARD PRACTICE":

Response: "I understand, but the IRDAI guidelines state that insurers must provide clear, written reasons for claim deductions. Can you email me the detailed explanation and policy reference?"

---

IMPORTANT PHRASES TO USE:

✅ "As per IRDAI regulations..."
✅ "I would like to escalate this to your grievance officer..."
✅ "Please provide this in writing..."
✅ "What is the formal dispute process?"
✅ "Can I speak to a senior claims reviewer?"

---

WHAT TO ASK FOR:

1. Detailed written explanation of rejection
2. Specific policy clause number
3. Grievance officer contact details
4. Timeline for dispute review (15 days as per IRDAI)
5. Email confirmation of conversation

---

STAY CALM & POLITE:
Remember: Claims representatives want to help. Being polite and well-informed increases your chances of success.

---
⚠️ DISPUTE GUIDANCE: Success rate for this type of dispute: ${dispute.successRate}%
Note: Keep a record of all calls (date, time, representative name, call reference number).`

  return {
    emailScript,
    callScript,
    shortSummary: `Dispute ${dispute.reason}: ₹${uncoveredAmount.toLocaleString()} | Risk: ${dispute.riskLevel.toUpperCase()} | Success Rate: ${dispute.successRate}%`
  }
}

/**
 * Get overall dispute summary for all bill items
 * @param {Array} billItems - Array of analyzed bill items
 * @param {Object} policyRules - Insurance policy rules
 * @returns {Object} - Summary of disputes
 */
export function getDisputeSummary(billItems, policyRules) {
  const allDisputes = []
  let totalDisputableAmount = 0
  let highRiskCount = 0
  let mediumRiskCount = 0
  let lowRiskCount = 0

  for (const item of billItems) {
    const disputes = analyzeDisputePotential(item, policyRules)
    
    for (const dispute of disputes) {
      const uncovered = item.originalCost - item.coveredCost
      totalDisputableAmount += uncovered
      
      if (dispute.riskLevel === 'high') highRiskCount++
      else if (dispute.riskLevel === 'medium') mediumRiskCount++
      else lowRiskCount++
      
      allDisputes.push({
        ...dispute,
        itemName: item.itemName,
        itemCost: item.originalCost,
        coveredCost: item.coveredCost,
        uncoveredAmount: uncovered,
        category: item.category
      })
    }
  }

  // Sort by risk level and amount
  allDisputes.sort((a, b) => {
    const riskOrder = { high: 0, medium: 1, low: 2 }
    if (riskOrder[a.riskLevel] !== riskOrder[b.riskLevel]) {
      return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
    }
    return b.uncoveredAmount - a.uncoveredAmount
  })

  return {
    disputes: allDisputes,
    summary: {
      totalDisputableAmount,
      highRiskCount,
      mediumRiskCount,
      lowRiskCount,
      totalDisputeCount: allDisputes.length,
      averageSuccessRate: allDisputes.length > 0 
        ? Math.round(allDisputes.reduce((sum, d) => sum + d.successRate, 0) / allDisputes.length)
        : 0
    }
  }
}
