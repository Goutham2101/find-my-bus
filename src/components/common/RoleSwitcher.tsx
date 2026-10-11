import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, Bus, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcher: React.FC = () => {
  const { role, switchUserRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: 'passenger' | 'driver' | 'admin') => {
    switchUserRole(newRole);
    if (newRole === 'driver') {
      navigate('/driver');
    } else if (newRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-slate-900/95 text-white shadow-2xl rounded-full px-4 py-2 flex items-center gap-3 border border-slate-700 backdrop-blur-md">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 hidden sm:inline">
        Persona Demo Mode:
      </span>
      <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-full border border-slate-700">
        <button
          onClick={() => handleRoleChange('passenger')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all ${
            role === 'passenger' ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'text-slate-300 hover:text-white'
          }`}
          title="Passenger View"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Passenger</span>
        </button>
        <button
          onClick={() => handleRoleChange('driver')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all ${
            role === 'driver' ? 'bg-amber-600 text-white font-semibold shadow-sm' : 'text-slate-300 hover:text-white'
          }`}
          title="Driver / Conductor Interface"
        >
          <Bus className="w-3.5 h-3.5" />
          <span>Driver</span>
        </button>
        <button
          onClick={() => handleRoleChange('admin')}
          className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all ${
            role === 'admin' ? 'bg-emerald-600 text-white font-semibold shadow-sm' : 'text-slate-300 hover:text-white'
          }`}
          title="Admin Control Dashboard"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>
      </div>
    </div>
  );
};
