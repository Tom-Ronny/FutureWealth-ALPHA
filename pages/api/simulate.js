import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' })
  }

  const { userId, returnRate, inflationRate, currentAge, pensionAge, endAge } = req.body

  if (!userId) {
    return res.status(400).json({ message: 'Missing userId' })
  }

  // Hent data fra Supabase
  const { data: incomeData } = await supabase
    .from('income')
    .select('*')
    .eq('user_id', userId)

  const { data: savingsData } = await supabase
    .from('savings')
    .select('*')
    .eq('user_id', userId)

  const { data: pensionsData } = await supabase
    .from('pensions')
    .select('*')
    .eq('user_id', userId)

  // Initiell kapital og oppsett
  let totalSavings = 0
  const years = []
  let capitalByYear = {}
  let year = new Date().getFullYear()

  const nYears = pensionAge - currentAge
  const nPensionYears = endAge - pensionAge

  // Simuler oppbygging av kapital
  for (let i = 0; i < nYears; i++) {
    // Summer innskudd fra savings
    let annualSaving = 0
    savingsData.forEach((saving) => {
      const start = new Date(saving.start_date).getFullYear()
      const end = saving.end_date ? new Date(saving.end_date).getFullYear() : 2100
      if (year >= start && year <= end) {
        annualSaving += parseFloat(saving.monthly_amount) * 12
      }
    })

    // Påfør rente
    totalSavings = (totalSavings + annualSaving) * (1 + returnRate / 100)

    // Lagre kapital per år
    capitalByYear[year] = totalSavings.toFixed(2)
    years.push(year)
    year++
  }

  // Simuler pensjonsutbetalinger
  let annualPensionIncome = 0
  pensionsData.forEach((pension) => {
    if (pension.start_age <= pensionAge) {
      annualPensionIncome += parseFloat(pension.annual_amount)
    }
  })

  // Årlig pensjon fra egen sparing
  const annualSavingsPayout = totalSavings / nPensionYears

  // Kalkuler månedlig total pensjon
  const totalMonthlyPension = (annualSavingsPayout + annualPensionIncome) / 12

  // Juster for inflasjon over tid (valgfritt for videreutvikling)

  const result = {
    timestamp: new Date().toISOString(),
    capitalByYear,
    monthlyPensionFromSavings: (annualSavingsPayout / 12).toFixed(2),
    pensionFromOtherSources: (annualPensionIncome / 12).toFixed(2),
    totalMonthlyPension: totalMonthlyPension.toFixed(2),
    parameters: {
      returnRate,
      inflationRate,
      currentAge,
      pensionAge,
      endAge,
    },
  }

  // Lagre i Supabase
  const { error } = await supabase.from('simulations').insert([
    {
      user_id: userId,
      result_json: result,
    },
  ])

  if (error) {
    return res.status(500).json({ message: 'Error saving simulation', error })
  }

  return res.status(200).json({ message: 'Simulation successful', result })
}
