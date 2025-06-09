import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getSimulationHistory } from '../utils/api';
import SimulationHistoryList from '../components/SimulationHistoryList';

export default function History() {
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [history, setHistory] = useState([]);

  const handleLoadHistory = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Du må logge inn først.');
      return;
    }

    try {
      const response = await getSimulationHistory(userId, token);
      setHistory(response.data);
    } catch (error) {
      console.error('Feil ved henting av historikk:', error);
      alert('Feil ved henting av historikk');
    }
  };

  useEffect(() => {
    if (userId) {
      handleLoadHistory();
    }
  }, []);

  return (
    <>
      <Header />
      <main className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl mb-4">Mine simuleringer</h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Bruker-ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleLoadHistory}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Last inn historikk
          </button>
        </div>

        <SimulationHistoryList history={history} />
      </main>
    </>
  );
}
