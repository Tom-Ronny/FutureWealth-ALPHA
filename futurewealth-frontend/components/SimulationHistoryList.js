import { downloadSimulationReport } from '../utils/api';

export default function SimulationHistoryList({ history }) {
  const token = localStorage.getItem('authToken');

  const handleDownload = (simulationId) => {
    downloadSimulationReport(simulationId, token);
  };

  if (!history || history.length === 0) {
    return <p>Ingen simuleringer funnet.</p>;
  }

  return (
    <div className="space-y-4">
      {history.map(simulation => (
        <div key={simulation.id} className="p-4 border rounded bg-gray-50">
          <p><strong>Dato:</strong> {new Date(simulation.createdAt).toLocaleString()}</p>
          <p>Alder: {simulation.age}</p>
          <p>Forventet sparing: {simulation.estimatedSavingsAtRetirement.toLocaleString()} kr</p>
          <p>Suksess-sjanse: {(simulation.successProbability * 100).toFixed(1)}%</p>
          <div className="mt-2">
            <button
              onClick={() => handleDownload(simulation.id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Last ned rapport (PDF)
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
