import React from 'react';

export const AdminUsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-black text-slate-900">Registered Passenger Users</h1>
        <p className="text-xs text-slate-500 font-medium">Manage user profiles and roles</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="divide-y divide-slate-100">
          {[
            { name: 'Barat Ankam', email: 'barat@example.com', phone: '+91 98765 43210', role: 'passenger' },
            { name: 'Sita Ankam', email: 'sita@example.com', phone: '+91 91234 56789', role: 'passenger' },
            { name: 'R. Koteswara Rao', email: 'kotesh.driver@findmybus.in', phone: '+91 98480 12345', role: 'driver' }
          ].map((u, idx) => (
            <div key={idx} className="py-3 flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-slate-900">{u.name}</p>
                <p className="text-slate-500">{u.email} • {u.phone}</p>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 font-semibold text-slate-700 rounded-lg capitalize">
                {u.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
