import { useState } from 'react';
import Header from '../components/Header';
import { runSimulation } from '../utils/api';
import SimulationResult from '../components/SimulationResult';

export default function Simulation() {
  const [input, setInput] = useState({
    age: '',
    income: '',
    savings: '',
    pensionRights: '',
    homeValue: '',
    mortgage: '',
    targetRetirementAge: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Du må logge inn først.');
      return;
    }

    try {
      const response = await runSimulation(
        { ...input, userId: localStorage.getItem('userId') },
        token
      );
      setResult(response.data);
    } catch (error) {
      console.error('Feil ved simulering:', error);
      alert('Feil ved simulering');
    }
  };

  return (
    <>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl mb-4">Simuler fremtidig økonomi</h1>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          {Object.keys(input).map(field => (
            <div key={field}>
              <label className="block mb-1 font-semibold">{field}</label>
              <input
                type="text"
                name={field}
                value={input[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          ))}
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Kjør simulering
          </button>
        </form>
        <SimulationResult result={result} />
      </main>
    </>
  );
}
