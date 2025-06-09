import { useState } from 'react';
import Header from '../components/Header';
import { saveUserProfile } from '../utils/api';

export default function Profile() {
  const [profile, setProfile] = useState({
    userId: localStorage.getItem('userId') || '',
    age: '',
    income: '',
    savings: '',
    pensionRights: '',
    homeValue: '',
    mortgage: ''
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Du må logge inn først.');
      return;
    }

    try {
      await saveUserProfile(profile, token);
      alert('Profil lagret!');
    } catch (error) {
      console.error('Feil ved lagring av profil:', error);
      alert('Feil ved lagring av profil');
    }
  };

  return (
    <>
      <Header />
      <main className="p-6 max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl mb-4">Brukerprofil</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(profile).map(field => (
            <div key={field}>
              <label className="block mb-1 font-semibold">{field}</label>
              <input
                type="text"
                name={field}
                value={profile[field]}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required={field !== 'userId'}
              />
            </div>
          ))}
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Lagre profil
          </button>
        </form>
      </main>
    </>
  );
}
