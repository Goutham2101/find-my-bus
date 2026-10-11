import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Bus } from '../../types';
import { LoadingState } from '../../components/common/LoadingState';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Bus as BusIcon, Plus, Edit } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const AdminBusesPage: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form
  const [operatorName, setOperatorName] = useState('APSRTC Super Luxury');
  const [busNumber, setBusNumber] = useState('AP 39 Z 9090');
  const [busType, setBusType] = useState<any>('RTC Super Luxury');

  useEffect(() => {
    adminService.getAllBuses().then((b) => {
      setBuses(b);
      setIsLoading(false);
    });
  }, []);

  const handleAddBus = (e: React.FormEvent) => {
    e.preventDefault();
    const newB: Bus = {
      id: `bus-custom-${Date.now()}`,
      operatorName,
      operatorType: operatorName.includes('APSRTC') ? 'APSRTC' : 'Private',
      busNumber,
      busType,
      totalSeats: 36,
      layoutType: '2x2',
      amenities: ['Charging Point', 'CCTV', 'Pushback Seats'],
      rating: 4.5,
      totalReviews: 10,
      status: 'Active'
    };
    setBuses([newB, ...buses]);
    setIsAddModalOpen(false);
  };

  if (isLoading) return <LoadingState message="Loading bus fleet registry..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">Bus Fleet Management</h1>
          <p className="text-xs text-slate-500 font-medium">Manage registered APSRTC and private bus vehicles</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Bus
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {buses.map((bus) => (
            <div key={bus.id} className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center">
                  <BusIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{bus.operatorName}</h3>
                  <p className="text-xs text-slate-500">{bus.busNumber} • {bus.busType} ({bus.totalSeats} Seats)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={bus.status} size="sm" />
                <button className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Bus to Fleet">
        <form onSubmit={handleAddBus} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Operator Name</label>
            <input
              type="text"
              required
              value={operatorName}
              onChange={(e) => setOperatorName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Bus Vehicle Number</label>
            <input
              type="text"
              required
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl"
          >
            Register Bus
          </button>
        </form>
      </Modal>
    </div>
  );
};
