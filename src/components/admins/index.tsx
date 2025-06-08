import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Search, X } from "lucide-react";

interface AdminInter {
  id: number;
  name: string;
  surname: string;
  email: string;
  efficiency: string;
}

const Adminlar: React.FC = () => {
  const [admins, setAdmins] = useState<AdminInter[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<AdminInter[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    parol: "",
    efficiency: "faol",
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  const getAdmins = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7070/api/staff/edited-admin"
      );
      console.log("Adminlar:", res.data);
      setAdmins(res.data);
      setFilteredAdmins(res.data);
    } catch (error) {
      console.error("cannot get admins");
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  useEffect(() => {
    const filtered = admins.filter((admin) => {
      const fullName = (admin.name + " " + admin.surname).toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter ? admin.efficiency === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredAdmins(filtered);
  }, [searchTerm, statusFilter, admins]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:7070/api/staff/create-admin",
        formData
      );
      setFormData({
        name: "",
        surname: "",
        email: "",
        parol: "",
        efficiency: "faol",
      });
      setShowModal(false);
      getAdmins();
    } catch (error) {
      console.error("there is a mistake while adding admin");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  return (
    <div className="text-white relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">
         ADMIN
        </h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              className="pl-8 pr-4 py-2 rounded bg-neutral-800 text-white w-24"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-black px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            <span className="text-xl">+</span> <span>+ admin</span>
          </button>

          <select
            className="px-3 py-2 rounded bg-neutral-800 text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="faol">acttive</option>
            <option value="nofaol">not active</option>
          </select>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-[1111]">
          <div
            ref={modalRef}
            className="bg-neutral-900 p-6 rounded-lg shadow-xl w-full max-w-lg relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-white">
              add new admin pls
            </h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="name"
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none"
                />
                <input
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  placeholder="surname"
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none"
                />
                <input
                  name="parol"
                  value={formData.parol}
                  onChange={handleInputChange}
                  placeholder="Parol"
                  type="password"
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none"
                />
                <select
                  name="efficiency"
                  value={formData.efficiency}
                  onChange={handleInputChange}
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none col-span-2"
                >
                  <option value="faol">Faol</option>
                  <option value="nofaol">Nofaol</option>
                </select>
              </div>

              <button
                type="submit"
                className="
    w-full 
    bg-blue-600 
    hover:bg-blue-700 
    active:scale-95 
    active:bg-blue-800 
    transition 
    duration-150 
    ease-in-out
    px-4 py-2 
    rounded 
    text-white
    focus:outline-none
    focus:ring-2 
    focus:ring-blue-400
    focus:ring-opacity-50
  "
              >
                Qo‘shish
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="w-full bg-neutral-900 rounded overflow-hidden">
        <thead>
          <tr className="bg-neutral-800 text-left">
            <th className="p-3">#</th>
            <th className="p-3">name</th>
            <th className="p-3">surname</th>
            <th className="p-3">Email</th>
            <th className="p-3">Holat</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map((admin, index) => (
            <tr
              key={admin.id}
              className="border-t border-neutral-700 hover:bg-neutral-800 transition"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{admin.name}</td>
              <td className="p-3">{admin.surname}</td>
              <td className="p-3">{admin.email}</td>
              <td className="p-3 capitalize">{admin.efficiency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminlar;
