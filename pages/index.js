import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase
        .from('users')  // <-- BYTT UT MED DIN TABELL!
        .select('*')

      if (error) {
        console.error('Error fetching data:', error)
      } else {
        setData(data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Hello, FutureWealth-ALPHA!</h1>
      <h2>Supabase Data:</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}
