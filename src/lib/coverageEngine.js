// AI-first deterministic coverage analysis engine
// Pure functions. No UI imports.

function normalize(str) {
  return String(str || '').trim().toLowerCase()
}

function nameInList(name, list = []) {
  const n = normalize(name)
  return list.some(item => normalize(item) === n)
}

export function analyzeCoverage(policyRules, billItems) {
  const rules = {
    roomRentCapPerDay: Number(policyRules?.roomRentCapPerDay || 0),
    coveredProcedures: Array.isArray(policyRules?.coveredProcedures) ? policyRules.coveredProcedures : [],
    excludedItems: Array.isArray(policyRules?.excludedItems) ? policyRules.excludedItems : [],
    diagnosticCoveragePercent: Number(policyRules?.diagnosticCoveragePercent ?? 0),
    coPayPercent: Number(policyRules?.coPayPercent ?? 0)
  }

  const breakdown = []
  let totalBill = 0
  let coveredAmount = 0
  let partiallyCoveredAmount = 0
  let notCoveredAmount = 0
  let outOfPocket = 0

  for (const item of billItems || []) {
    const name = item?.name || item?.item || 'Unknown Item'
    const category = item?.category
    const cost = Number(item?.cost || 0)
    const days = Number(item?.days || 1)

    totalBill += cost

    // Default values
    let status = 'not_covered'
    let coveredBeforeCopay = 0
    let uncovered = cost
    let explanation = 'No matching rule found; marked not covered.'

    // Exclusion check first
    if (nameInList(name, rules.excludedItems)) {
      status = 'not_covered'
      coveredBeforeCopay = 0
      uncovered = cost
      explanation = 'Excluded by policy: ' + name
    } else if (category === 'room') {
      const cap = rules.roomRentCapPerDay * days
      if (cap > 0) {
        if (cost <= cap) {
          status = 'covered'
          coveredBeforeCopay = cost
          uncovered = 0
          explanation = `Room rent within policy cap of ₹${rules.roomRentCapPerDay}/day for ${days} day(s)`
        } else {
          status = 'partially_covered'
          coveredBeforeCopay = cap
          uncovered = cost - cap
          explanation = `Room rent exceeds policy cap of ₹${rules.roomRentCapPerDay}/day; ₹${uncovered} over cap`
        }
      } else {
        status = 'not_covered'
        coveredBeforeCopay = 0
        uncovered = cost
        explanation = 'No room rent cap provided; marking not covered'
      }
    } else if (category === 'diagnostic') {
      const pct = Math.max(0, Math.min(100, rules.diagnosticCoveragePercent))
      if (pct === 0) {
        status = 'not_covered'
        coveredBeforeCopay = 0
        uncovered = cost
        explanation = 'Diagnostics not covered per policy'
      } else if (pct === 100) {
        status = 'covered'
        coveredBeforeCopay = cost
        uncovered = 0
        explanation = 'Diagnostics covered at 100% per policy'
      } else {
        status = 'partially_covered'
        coveredBeforeCopay = Math.round(cost * pct) / 100
        uncovered = cost - coveredBeforeCopay
        explanation = `Diagnostics covered at ${pct}% per policy`
      }
    } else if (category === 'procedure') {
      if (nameInList(name, rules.coveredProcedures)) {
        status = 'covered'
        coveredBeforeCopay = cost
        uncovered = 0
        explanation = 'Procedure covered under policy'
      } else {
        status = 'not_covered'
        coveredBeforeCopay = 0
        uncovered = cost
        explanation = 'Procedure not in covered list'
      }
    } else if (category === 'medicine' || category === 'consumable') {
      // No explicit rule provided – mark not covered deterministically
      status = 'not_covered'
      coveredBeforeCopay = 0
      uncovered = cost
      explanation = `No coverage rule for ${category}; marked not covered`
    } else {
      // Unknown category
      status = 'not_covered'
      coveredBeforeCopay = 0
      uncovered = cost
      explanation = 'Unknown category; marked not covered'
    }

    const copayPct = Math.max(0, Math.min(100, rules.coPayPercent))
    const copayAmount = Math.round((coveredBeforeCopay * copayPct) / 100)
    const insurerPays = coveredBeforeCopay - copayAmount

    // Aggregate totals
    if (status === 'covered') {
      coveredAmount += insurerPays
    } else if (status === 'partially_covered') {
      partiallyCoveredAmount += insurerPays
    }
    notCoveredAmount += uncovered
    outOfPocket += uncovered + copayAmount

    breakdown.push({
      itemName: name,
      category,
      originalCost: cost,
      coveredCost: insurerPays,
      uncoveredCost: uncovered,
      status,
      explanation,
      copayAmount
    })
  }

  return {
    summary: {
      totalBill: totalBill,
      coveredAmount: coveredAmount,
      partiallyCoveredAmount: partiallyCoveredAmount,
      notCoveredAmount: notCoveredAmount,
      outOfPocket: outOfPocket
    },
    breakdown,
    metadata: { isAIEstimated: true }
  }
}

export function overrideItem(analysis, itemIndex, override) {
  if (!analysis || !Array.isArray(analysis.breakdown)) return analysis
  const breakdown = analysis.breakdown.map((b, idx) => {
    if (idx !== itemIndex) return b
    return {
      ...b,
      ...override,
      explanation: (override?.explanation || b.explanation) + ' (manually overridden)'
    }
  })

  // Recompute summary from breakdown (copay is already included per item)
  let totalBill = 0
  let coveredAmount = 0
  let partiallyCoveredAmount = 0
  let notCoveredAmount = 0
  let outOfPocket = 0

  for (const b of breakdown) {
    totalBill += Number(b.originalCost || 0)
    if (b.status === 'covered') coveredAmount += Number(b.coveredCost || 0)
    else if (b.status === 'partially_covered') partiallyCoveredAmount += Number(b.coveredCost || 0)
    notCoveredAmount += Number(b.uncoveredCost || 0)
    outOfPocket += Number(b.uncoveredCost || 0) + Number(b.copayAmount || 0)
  }

  return {
    summary: { totalBill, coveredAmount, partiallyCoveredAmount, notCoveredAmount, outOfPocket },
    breakdown,
    metadata: { ...analysis.metadata, isAIEstimated: false }
  }
}
