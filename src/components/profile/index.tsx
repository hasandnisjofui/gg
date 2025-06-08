import { User } from 'lucide-react';
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
    <div className="p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8">Profil ma’lumotlari</h2>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md flex items-center gap-4">
        <div className="bg-gray-700 p-4 rounded-full">
          <User size={40} className="text-white" />
        </div>
        
        {email ? (
          <div>
            <p className="text-lg text-gray-300">
              <span className="font-semibold text-white">Email:</span> {email}
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-lg">Profil ma’lumotlari topilmadi.</p>
        )}
      </div>
    </div>
  );
}


export default Profil;
