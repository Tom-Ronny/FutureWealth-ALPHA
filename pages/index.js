import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function Home() {
  const userId = 'YOUR_USER_UUID_HERE'

  const [incomeData, setIncomeData] = useState([])
  const [savingsData, setSavingsData] = useState([])
  const [pensionsData, setPensionsData] = useState([])
  const [simulationsData, setSimulationsData] = useState([])

  const [monthlyIncome, setMonthlyIncome] = useState('')
  const [incomeStartDate, setIncomeStartDate] = useState('')
  const [incomeEndDate, setIncomeEndDate] = useState('')

  const [savingType, setSavingType] = useState('')
  const [monthlyAmount, setMonthlyAmount] = useState('')
  const [savingStartDate, setSavingStartDate] = useState('')
  const [savingEndDate, setSavingEndDate] = useState('')

  const [pensionType, setPensionType] = useState('')
  const [annualAmount, setAnnualAmount] = useState('')
  const [startAge, setStartAge] = useState('')
  const [endAge, setEndAge] = useState('')

  const [simulationRunning, setSimulationRunning] = useState(false)
  const [returnRate, setReturnRate] = useState(5)
  const [inflationRate, setInflationRate] = useState(2)

  useEffect(() => {
    async function fetchIncome() {
      let { data, error } = await supabase
        .from('income')
        .select('*')
        .eq('user_id', userId)
      if (error) console.error('Error fetching income:', error)
      else setIncomeData(data)
    }

    async function fetchSavings() {
      let { data, error } = await supabase
        .from('savings')
        .select('*')
        .eq('user_id', userId)
      if (error) console.error('Error fetching savings:', error)
      else setSavingsData(data)
    }

    async function fetchPensions() {
      let { data, error } = await supabase
        .from('pensions')
        .select('*')
        .eq('user_id', userId)
      if (error) console.error('Error fetching pensions:', error)
      else setPensionsData(data)
    }

    async function fetchSimulations() {
      let { data, error } = await supabase
        .from('simulations')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) console.error('Error fetching simulations:', error)
      else setSimulationsData(data)
    }

    fetchIncome()
    fetchSavings()
    fetchPensions()
    fetchSimulations()
  }, [])

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

  const handlePensionsSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('pensions').insert([
      {
        user_id: userId,
        pension_type: pensionType,
        annual_amount: annualAmount,
        start_age: startAge,
        end_age: endAge,
      },
    ])

    if (error) {
      console.error('Error inserting pensions:', error)
    } else {
      alert('Pension saved!')
      window.location.reload()
    }
  }

  const handleRunSimulation = async () => {
    setSimulationRunning(true)

    const userInputs = {
      userId,
      returnRate: parseFloat(returnRate),
      inflationRate: parseFloat(inflationRate),
      currentAge: 40,
      pensionAge: 67,
      endAge: 90,
    }

    const response = await fetch('/api/simulate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInputs),
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Simulation result:', data)
      alert('Simulation completed and saved!')
      window.location.reload()
    } else {
      console.error('Simulation failed')
      alert('Simulation failed')
    }

    setSimulationRunning(false)
  }

  // 🚀 RETURN kommer i DEL 2!
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hello, FutureWealth-ALPHA!</h1>

      {/* Income */}
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

      {/* Savings */}
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

      <hr />

      {/* Pensions */}
      <h2>🏦 Add Pension</h2>
      <form onSubmit={handlePensionsSubmit}>
        <input
          type="text"
          placeholder="Pension Type"
          value={pensionType}
          onChange={(e) => setPensionType(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Annual Amount"
          value={annualAmount}
          onChange={(e) => setAnnualAmount(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Start Age"
          value={startAge}
          onChange={(e) => setStartAge(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="End Age"
          value={endAge}
          onChange={(e) => setEndAge(e.target.value)}
        />
        <br />
        <button type="submit">Save Pension</button>
      </form>

      <h3>Pension Records:</h3>
      <pre>{JSON.stringify(pensionsData, null, 2)}</pre>

      <hr />

      {/* Run Simulation */}
      <h2>🚀 Run Simulation</h2>
      <label>Return Rate (%): </label>
      <input
        type="number"
        value={returnRate}
        onChange={(e) => setReturnRate(e.target.value)}
        step="0.1"
      />
      <br />
      <label>Inflation Rate (%): </label>
      <input
        type="number"
        value={inflationRate}
        onChange={(e) => setInflationRate(e.target.value)}
        step="0.1"
      />
      <br />
      <button onClick={handleRunSimulation} disabled={simulationRunning}>
        {simulationRunning ? 'Running...' : 'Run Simulation'}
      </button>

      <hr />

      <h2>📊 Simulations History</h2>

      {simulationsData.length > 0 && (
        <div>
          <h3>Capital Over Time (Last Simulation):</h3>
          <Line
            data={{
              labels: Object.keys(simulationsData[0].result_json.capitalByYear),
              datasets: [
                {
                  label: 'Capital',
                  data: Object.values(simulationsData[0].result_json.capitalByYear),
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: true,
                  tension: 0.3,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Capital Build-up Until Retirement' },
              },
            }}
          />
        </div>
      )}

      <h3>Simulations Records:</h3>
      <pre>{JSON.stringify(simulationsData, null, 2)}</pre>
    </div>
  )
}
