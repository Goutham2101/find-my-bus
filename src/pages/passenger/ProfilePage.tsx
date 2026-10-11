import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, Mail, Shield, Bell, Lock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, updateUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || 'Barat Ankam');
  const [email, setEmail] = useState(user?.email || 'barat@example.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [emergency, setEmergency] = useState(user?.emergencyContact || '+91 91234 56789');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ name, email, phone, emergencyContact: emergency });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Profile Settings</h1>
          <p className="text-xs text-slate-500 font-medium">Manage personal info, emergency contacts & notification preferences</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 flex items-center gap-1.5 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {isSaved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-4 rounded-xl">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" /> Personal & Emergency Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              value={emergency}
              onChange={(e) => setEmergency(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};
