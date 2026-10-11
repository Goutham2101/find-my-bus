import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bus,
  MapPin,
  Calendar,
  Users,
  Ticket,
  Navigation,
  FileSpreadsheet,
  UserCheck
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Buses Fleet', path: '/admin/buses', icon: Bus },
    { label: 'Routes & Stops', path: '/admin/routes', icon: MapPin },
    { label: 'Trips Schedule', path: '/admin/trips', icon: Calendar },
    { label: 'Drivers', path: '/admin/drivers', icon: UserCheck },
    { label: 'Bookings Master', path: '/admin/bookings', icon: Ticket },
    { label: 'Passenger Users', path: '/admin/users', icon: Users },
    { label: 'Live Fleet Monitoring', path: '/admin/live-buses', icon: Navigation },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: FileSpreadsheet }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 border-r border-slate-800 hidden md:block">
      <div className="flex items-center gap-2.5 px-3 py-4 mb-6 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm">
          AP
        </div>
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight">Admin Fleet Control</h2>
          <span className="text-[10px] text-emerald-400 uppercase font-semibold">APSRTC Master System</span>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
