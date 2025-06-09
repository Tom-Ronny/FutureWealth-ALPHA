import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function Home() {
  // For visning av income og savings
  const [incomeData, setIncomeData] = useState([])
  const [savingsData, setSavingsData] = useState([])

  // For forms (income)
  const [monthlyIncome, setMonthlyIncome] = useState('')
  const [incomeStartDate, setIncomeStartDate] = useState('')
  const [incomeEndDate, setIncomeEndDate] = useState('')

  // For forms (savings)
  const [savingType, setSavingType] = useState('')
  const [monthlyAmount, setMonthlyAmount] = useState('')
  const [savingStartDate, setSavingStartDate] = useState('')
  const [savingEndDate, setSavingEndDate] = useState('')

  // Bruker-id (BYTT UT med din user UUID fra users-tabellen)
  const userId = 'c1b397fd-009e-4e68-92bc-30b42c0849d4'

  // Fetch income
  useEffect(() => {
    async function fetchIncome() {
      let { data, error } = await supabase
        .from('income')
        .select('*')
        .eq('user_id', userId)

      if (error) console.error('Error fetching income:', error)
      else setIncomeData(data)
    }

    fetchIncome()
  }, [])

  // Fetch savings
  useEffect(() => {
    async function fetchSavings() {
      let { data, error } = await supabase
        .from('savings')
        .select('*')
        .eq('user_id', userId)

      if (error) console.error('Error fetching savings:', error)
      else setSavingsData(data)
    }

    fetchSavings()
  }, [])

  // Submit income
  const handleIncomeSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('income').insert([
      {
        user_id: userId,
        monthly_income: monthlyIncome,
        start_date: incomeStartDate,
        end_date: incomeEndDate,
      },
    ])

    if (error) {
      console.error('Error inserting income:', error)
    } else {
      alert('Income saved!')
      window.location.reload()
    }
  }

  // Submit savings
  const handleSavingsSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('savings').insert([
      {
        user_id: userId,
        saving_type: savingType,
        monthly_amount: monthlyAmount,
        start_date: savingStartDate,
        end_date: savingEndDate,
      },
    ])

    if (error) {
      console.error('Error inserting savings:', error)
    } else {
      alert('Savings saved!')
      window.location.reload()
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hello, FutureWealth-ALPHA!</h1>

      <h2>💰 Add Income</h2>
      <form onSubmit={handleIncomeSubmit}>
        <input
          type="number"
          placeholder="Monthly Income"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          required
        />
        <br />
        <input
          type="date"
          value={incomeStartDate}
          onChange={(e) => setIncomeStartDate(e.target.value)}
          required
        />
        <br />
        <input
          type="date"
          value={incomeEndDate}
          onChange={(e) => setIncomeEndDate(e.target.value)}
        />
        <br />
        <button type="submit">Save Income</button>
      </form>

      <h3>Income Records:</h3>
      <pre>{JSON.stringify(incomeData, null, 2)}</pre>

      <hr />

      <h2>💸 Add Savings</h2>
      <form onSubmit={handleSavingsSubmit}>
        <input
          type="text"
          placeholder="Saving Type"
          value={savingType}
          onChange={(e) => setSavingType(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Monthly Amount"
          value={monthlyAmount}
          onChange={(e) => setMonthlyAmount(e.target.value)}
          required
        />
        <br />
        <input
          type="date"
          value={savingStartDate}
          onChange={(e) => setSavingStartDate(e.target.value)}
          required
        />
        <br />
        <input
          type="date"
          value={savingEndDate}
          onChange={(e) => setSavingEndDate(e.target.value)}
        />
        <br />
        <button type="submit">Save Savings</button>
      </form>

      <h3>Savings Records:</h3>
      <pre>{JSON.stringify(savingsData, null, 2)}</pre>
    </div>
  )
}


