import React, { useEffect, useState } from 'react';

const Profil: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInEmail');
    const storedToken = localStorage.getItem('token');
    setEmail(storedEmail);
    setToken(storedToken);
  }, []);

  return (
    <div className="p-6 bg-black text-white">
      <h2 className="text-3xl font-semibold mb-6">Profil ma’lumotlari</h2>

      {email ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
          <p className="mb-4 text-lg">
            <strong>Email:</strong> {email}
          </p>
        </div>
      ) : (
        <p className="text-gray-400 text-lg">Profil ma’lumotlari topilmadi.</p>
      )}
    </div>
  );
};

export default Profil;
