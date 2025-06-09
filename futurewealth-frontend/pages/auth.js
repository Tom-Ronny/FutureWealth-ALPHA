import { useState } from 'react';
import Header from '../components/Header';
import { registerUser, loginUser } from '../utils/api';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      alert('Bruker registrert! Du kan nå logge inn.');
    } catch (error) {
      console.error('Feil ved registrering:', error);
      alert('Feil ved registrering');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      const tokenReceived = response.data.token;
      setToken(tokenReceived);
      localStorage.setItem('authToken', tokenReceived);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userEmail', email);
      alert('Innlogging vellykket!');
      window.location.href = '/profile';
    } catch (error) {
      console.error('Feil ved innlogging:', error);
      alert('Feil ved innlogging');
    }
  };

  return (
    <>
      <Header />
      <main className="p-6 max-w-md mx-auto space-y-4">
        <h1 className="text-2xl mb-4">Login / Registrering</h1>

        <div>
          <label className="block mb-1 font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Passord:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="space-x-2">
          <button
            onClick={handleRegister}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Registrer
          </button>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Logg inn
          </button>
        </div>

        {token && (
          <p className="text-green-600 mt-4">
            Token lagret! Du er innlogget.
          </p>
        )}
      </main>
    </>
  );
}
