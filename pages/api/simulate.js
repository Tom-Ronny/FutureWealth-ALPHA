import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId, returnRate, inflationRate, currentAge, pensionAge, endAge } = req.body

    const capitalByYear = {}
    let capital = 1500000 // initial dummy capital
    for (let year = 2025; year <= 2051; year++) {
      capital = capital * (1 + returnRate / 100) / (1 + inflationRate / 100)
      capitalByYear[year] = capital.toFixed(2)
    }

    const resultJson = {
      parameters: {
        endAge,
        currentAge,
        pensionAge,
        returnRate,
        inflationRate,
      },
      capitalByYear,
      totalMonthlyPension: '19895.57',
      pensionFromOtherSources: '416.67',
      monthlyPensionFromSavings: '19478.90',
    }

    const { error } = await supabase.from('simulations').insert([
      {
        user_id: userId,
        result_json: resultJson,
      },
    ])

    if (error) {
      console.error('Error inserting simulation:', error)
      return res.status(500).json({ error: 'Error inserting simulation' })
    }

    res.status(200).json({ message: 'Simulation saved', result: resultJson })
  } catch (err) {
    console.error('Simulation error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
