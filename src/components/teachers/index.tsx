import React, { useState, useEffect, useRef } from 'react';

interface Teacher {
  id: number;
  name: string;
  surname: string;
  email: string;
  fan?: string;
  holat: string;
}

const OqituvchilarPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:7070/api/staff/edited-teacher');
        if (!response.ok) throw new Error(`HTTP xatosi! Status: ${response.status}`);
        const data = await response.json();
        setTeachers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    if (openMenuId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-6">Oqituvchilar royxati</h2>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-300 uppercase text-sm">
              <th className="py-3 px-6 text-left">Ism</th>
              <th className="py-3 px-6 text-left">Familiya</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Fan</th>
              <th className="py-3 px-6 text-left">Holat</th>
              <th className="py-3 px-6 text-center">Amallar</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-3 px-6">{teacher.name}</td>
                <td className="py-3 px-6">{teacher.surname}</td>
                <td className="py-3 px-6">{teacher.email}</td>
                <td className="py-3 px-6">{teacher.fan || '-'}</td>
                <td className="py-3 px-6">
                  <span
                    className={`py-1 px-3 rounded-full text-xs font-semibold ${
                      teacher.holat === 'faol' ? 'text-green-100' : 'text-red-100'
                    }`}
                  >
                    {teacher.holat}
                  </span>
                </td>
                <td className="py-3 px-6 text-center relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === teacher.id ? null : teacher.id)
                    }
                    className="hover:underline"
                  >
                    ...
                  </button>
                  {openMenuId === teacher.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-2 w-32 bg-gray-800 rounded shadow-lg z-30"
                    >
                      <button
                        onClick={() => console.log('Tahrirlash:', teacher)}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() =>
                          setTeachers((prev) => prev.filter((t) => t.id !== teacher.id))
                        }
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-700"
                      >
                        Ochirish
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OqituvchilarPage;
