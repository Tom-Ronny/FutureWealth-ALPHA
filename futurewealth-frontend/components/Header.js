import { useEffect, useState } from 'react';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    setLoggedIn(!!token);
    if (email) setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    setLoggedIn(false);
    setUserEmail('');
    alert('Du er nå logget ut.');
    window.location.href = '/auth';
  };

  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-2xl font-bold">FutureWealth</div>

      {loggedIn ? (
        <div className="flex items-center space-x-4">
          <span>Innlogget som: <strong>{userEmail}</strong></span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logg ut
          </button>
        </div>
      ) : (
        <a href="/auth" className="bg-green-500 px-3 py-1 rounded">
          Logg inn
        </a>
      )}
    </header>
  );
};

export default Header;
