// Pre-hospitalization insurance guidance engine
// Provides proactive cost estimates and warnings before treatment

// Mock procedure database with typical costs and common issues
const PROCEDURE_DATABASE = {
  'angioplasty': {
    baseCost: { min: 150000, max: 300000 },
    avgDays: 3,
    consumablesPercent: 40,
    commonSubLimits: ['stents', 'cardiology procedures'],
    riskLevel: 'high'
  },
  'knee replacement': {
    baseCost: { min: 200000, max: 400000 },
    avgDays: 7,
    consumablesPercent: 35,
    commonSubLimits: ['joint replacement', 'implants'],
    riskLevel: 'high'
  },
  'appendectomy': {
    baseCost: { min: 40000, max: 80000 },
    avgDays: 2,
    consumablesPercent: 20,
    commonSubLimits: [],
    riskLevel: 'medium'
  },
  'cataract surgery': {
    baseCost: { min: 25000, max: 60000 },
    avgDays: 1,
    consumablesPercent: 30,
    commonSubLimits: ['eye care', 'lens'],
    riskLevel: 'low'
  },
  'hernia repair': {
    baseCost: { min: 50000, max: 100000 },
    avgDays: 2,
    consumablesPercent: 25,
    commonSubLimits: ['mesh implants'],
    riskLevel: 'medium'
  },
  'cesarean section': {
    baseCost: { min: 60000, max: 120000 },
    avgDays: 3,
    consumablesPercent: 20,
    commonSubLimits: ['maternity'],
    riskLevel: 'medium'
  },
  'gallbladder removal': {
    baseCost: { min: 50000, max: 90000 },
    avgDays: 2,
    consumablesPercent: 22,
    commonSubLimits: [],
    riskLevel: 'low'
  },
  'hysterectomy': {
    baseCost: { min: 80000, max: 150000 },
    avgDays: 4,
    consumablesPercent: 25,
    commonSubLimits: [],
    riskLevel: 'medium'
  }
}

// Hospital type multipliers based on location
const HOSPITAL_TYPE_MULTIPLIERS = {
  'government': 0.3,
  'network': 1.0,
  'non-network': 1.4
}

// Pincode-based cost multipliers (mock data for demonstration)
const LOCATION_MULTIPLIERS = {
  'metro': 1.3,      // Metros: Mumbai, Delhi, Bangalore, etc.
  'tier1': 1.1,      // Tier 1 cities
  'tier2': 0.9,      // Tier 2 cities
  'rural': 0.7       // Rural areas
}

// Room type multipliers
const ROOM_TYPE_MULTIPLIERS = {
  'general': 0.8,
  'semi-private': 1.0,
  'private': 1.5,
  'deluxe': 2.0,
  'suite': 2.5
}

function getPincodeCategory(pincode) {
  // Mock logic - in production, use actual pincode database
  const pin = String(pincode).substring(0, 3)
  const metroPins = ['110', '400', '560', '600', '700', '500']
  const tier1Pins = ['411', '380', '302', '160', '226']
  
  if (metroPins.includes(pin)) return 'metro'
  if (tier1Pins.includes(pin)) return 'tier1'
  if (pin.startsWith('4') || pin.startsWith('6')) return 'tier2'
  return 'rural'
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Generate pre-hospitalization insurance guidance
 * @param {Object} inputs - User inputs
 * @param {string} inputs.procedure - Medical procedure name
 * @param {string} inputs.pincode - Hospital pincode
 * @param {string} inputs.hospitalType - government/network/non-network
 * @param {string} inputs.roomType - Room type selection
 * @param {number} inputs.sumInsured - Policy sum insured
 * @param {number} inputs.roomRentCap - Daily room rent cap (0 if no cap)
 * @param {number} inputs.coPayPercent - Co-payment percentage
 * @param {Array} inputs.subLimits - Array of sub-limit items
 * @returns {Object} - Guidance results with warnings and estimates
 */
export function generatePreHospitalizationGuidance(inputs) {
  const {
    procedure = '',
    pincode = '',
    hospitalType = 'network',
    roomType = 'semi-private',
    sumInsured = 500000,
    roomRentCap = 0,
    coPayPercent = 0,
    subLimits = []
  } = inputs

  const normalizedProcedure = procedure.toLowerCase().trim()
  const procedureData = PROCEDURE_DATABASE[normalizedProcedure]

  const insights = []
  const warnings = []
  const recommendations = []

  // If procedure not found, return basic guidance
  if (!procedureData) {
    return {
      insights: [{
        type: 'info',
        title: 'Procedure Information',
        message: 'We are still gathering data for this procedure. Please consult your insurer for specific coverage details.',
        severity: 'info'
      }],
      warnings: [],
      recommendations: [{
        type: 'info',
        title: 'General Recommendation',
        message: 'Always verify coverage with your insurance provider before admission.',
        severity: 'info'
      }],
      estimate: null
    }
  }

  // Calculate estimated costs
  const locationCategory = getPincodeCategory(pincode)
  const locationMultiplier = LOCATION_MULTIPLIERS[locationCategory]
  const hospitalMultiplier = HOSPITAL_TYPE_MULTIPLIERS[hospitalType]
  const roomMultiplier = ROOM_TYPE_MULTIPLIERS[roomType]

  const baseCost = (procedureData.baseCost.min + procedureData.baseCost.max) / 2
  const estimatedTotalCost = baseCost * locationMultiplier * hospitalMultiplier * roomMultiplier

  const roomCostPerDay = estimatedTotalCost * 0.25 / procedureData.avgDays
  const consumablesCost = estimatedTotalCost * (procedureData.consumablesPercent / 100)
  const procedureCost = estimatedTotalCost * 0.40
  const diagnosticsCost = estimatedTotalCost * 0.10
  const otherCosts = estimatedTotalCost * 0.25

  // Estimate breakdown
  const estimate = {
    totalEstimatedCost: estimatedTotalCost,
    breakdown: {
      room: roomCostPerDay * procedureData.avgDays,
      procedure: procedureCost,
      consumables: consumablesCost,
      diagnostics: diagnosticsCost,
      others: otherCosts
    },
    expectedDays: procedureData.avgDays,
    pretreatmentLabel: '⚠️ PRE-TREATMENT ESTIMATE ONLY'
  }

  // Calculate potential out-of-pocket
  let estimatedOOP = 0
  let coveredAmount = estimatedTotalCost

  // Warning: Room rent cap impact
  if (roomRentCap > 0 && roomCostPerDay > roomRentCap) {
    const roomExcess = (roomCostPerDay - roomRentCap) * procedureData.avgDays
    const proportionalImpact = roomExcess * 2 // Room cap often triggers proportionate deduction
    estimatedOOP += proportionalImpact
    
    warnings.push({
      type: 'warning',
      title: '🛏️ Room Rent Cap Alert',
      message: `Your chosen ${roomType} room (₹${Math.round(roomCostPerDay)}/day) exceeds your policy cap (₹${roomRentCap}/day). This may trigger proportionate deductions on other costs.`,
      impact: formatCurrency(proportionalImpact),
      severity: 'high'
    })

    recommendations.push({
      type: 'recommendation',
      title: '💡 Room Type Recommendation',
      message: `Consider a ${roomType === 'private' ? 'semi-private' : 'general'} room to stay within your cap and avoid additional out-of-pocket expenses.`,
      potentialSaving: formatCurrency(proportionalImpact),
      severity: 'info'
    })
  }

  // Warning: Sub-limits
  const matchedSubLimits = procedureData.commonSubLimits.filter(sl => 
    subLimits.some(userLimit => userLimit.toLowerCase().includes(sl.toLowerCase()))
  )

  if (matchedSubLimits.length > 0) {
    const subLimitImpact = estimatedTotalCost * 0.15 // Assume 15% impact
    estimatedOOP += subLimitImpact

    warnings.push({
      type: 'warning',
      title: '📊 Sub-Limit Detected',
      message: `Your policy has sub-limits on: ${matchedSubLimits.join(', ')}. These may cap coverage for key components of this procedure.`,
      impact: formatCurrency(subLimitImpact),
      severity: 'high'
    })

    insights.push({
      type: 'info',
      title: '🔍 Understanding Sub-Limits',
      message: 'Sub-limits restrict coverage for specific items (e.g., stents, implants) within your total sum insured. Verify these limits with your insurer.',
      severity: 'info'
    })
  }

  // Warning: Co-payment
  if (coPayPercent > 0) {
    const coPayAmount = (estimatedTotalCost - estimatedOOP) * (coPayPercent / 100)
    estimatedOOP += coPayAmount

    warnings.push({
      type: 'warning',
      title: '💳 Co-Payment Required',
      message: `You will pay ${coPayPercent}% of covered expenses as co-payment.`,
      impact: formatCurrency(coPayAmount),
      severity: 'medium'
    })
  }

  // Warning: Consumables cost
  if (procedureData.consumablesPercent > 30) {
    insights.push({
      type: 'caution',
      title: '💊 High Consumables Expected',
      message: `This procedure typically involves ${procedureData.consumablesPercent}% consumables costs (₹${Math.round(consumablesCost)}). Verify if your policy covers all consumables.`,
      severity: 'medium'
    })

    recommendations.push({
      type: 'recommendation',
      title: '📋 Pre-Authorization Tip',
      message: 'Request detailed pre-authorization specifying all consumables to avoid surprises during billing.',
      severity: 'info'
    })
  }

  // Warning: Network vs Non-Network
  if (hospitalType === 'non-network') {
    const networkSaving = estimatedTotalCost * 0.4
    
    warnings.push({
      type: 'warning',
      title: '🏥 Non-Network Hospital',
      message: 'Non-network hospitals may require upfront payment and reimbursement, with potential claim rejections.',
      impact: 'Higher out-of-pocket risk',
      severity: 'high'
    })

    recommendations.push({
      type: 'recommendation',
      title: '🏥 Consider Network Hospital',
      message: 'Network hospitals offer cashless treatment and better coverage. You could save approximately ' + formatCurrency(networkSaving),
      potentialSaving: formatCurrency(networkSaving),
      severity: 'info'
    })
  }

  // Warning: Sum insured adequacy
  if (estimatedTotalCost > sumInsured * 0.7) {
    warnings.push({
      type: 'warning',
      title: '⚠️ Sum Insured Alert',
      message: `Estimated cost (${formatCurrency(estimatedTotalCost)}) is ${Math.round((estimatedTotalCost / sumInsured) * 100)}% of your sum insured (${formatCurrency(sumInsured)}). Consider top-up insurance.`,
      severity: 'high'
    })
  }

  // General insights
  insights.push({
    type: 'info',
    title: '📍 Location Impact',
    message: `Treatment in ${locationCategory === 'metro' ? 'metro cities' : locationCategory === 'tier1' ? 'tier-1 cities' : locationCategory === 'tier2' ? 'tier-2 cities' : 'rural areas'} affects costs. Metro costs are typically 30-50% higher.`,
    severity: 'info'
  })

  // Final out-of-pocket estimate
  estimate.estimatedOutOfPocket = Math.max(0, estimatedOOP)
  estimate.insuranceCoverage = estimatedTotalCost - estimate.estimatedOutOfPocket
  estimate.coveragePercentage = Math.round((estimate.insuranceCoverage / estimatedTotalCost) * 100)

  // Risk-level summary
  let riskSummary = {
    type: 'info',
    title: '📊 Cost Risk Assessment',
    message: '',
    severity: 'info'
  }

  if (estimate.estimatedOutOfPocket > estimatedTotalCost * 0.3) {
    riskSummary.severity = 'high'
    riskSummary.message = `HIGH RISK: Estimated out-of-pocket is ${formatCurrency(estimate.estimatedOutOfPocket)} (${Math.round((estimate.estimatedOutOfPocket / estimatedTotalCost) * 100)}% of total cost). Review policy terms carefully.`
  } else if (estimate.estimatedOutOfPocket > estimatedTotalCost * 0.15) {
    riskSummary.severity = 'medium'
    riskSummary.message = `MODERATE RISK: Estimated out-of-pocket is ${formatCurrency(estimate.estimatedOutOfPocket)} (${Math.round((estimate.estimatedOutOfPocket / estimatedTotalCost) * 100)}% of total cost).`
  } else {
    riskSummary.severity = 'low'
    riskSummary.message = `LOW RISK: Your policy appears to cover most costs. Estimated out-of-pocket: ${formatCurrency(estimate.estimatedOutOfPocket)} (${Math.round((estimate.estimatedOutOfPocket / estimatedTotalCost) * 100)}% of total cost).`
  }

  insights.unshift(riskSummary)

  // General recommendations
  recommendations.push({
    type: 'recommendation',
    title: '📞 Next Steps',
    message: 'Always get pre-authorization from your insurer before admission. Share this estimate with them for verification.',
    severity: 'info'
  })

  return {
    insights,
    warnings,
    recommendations,
    estimate,
    procedureInfo: {
      name: procedure,
      avgDays: procedureData.avgDays,
      riskLevel: procedureData.riskLevel
    }
  }
}

// Export procedure list for autocomplete
export function getProcedureList() {
  return Object.keys(PROCEDURE_DATABASE).map(key => ({
    value: key,
    label: key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }))
}
