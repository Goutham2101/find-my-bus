import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { LoadingState } from '../../components/common/LoadingState';
import { Bus, Calendar, Ticket, Users, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [revenueChart, setRevenueChart] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([adminService.getDashboardStats(), adminService.getRevenueChartData()]).then(
      ([s, r]) => {
        setStats(s);
        setRevenueChart(r as any[]);
        setIsLoading(false);
      }
    );
  }, []);

  if (isLoading || !stats) {
    return <LoadingState message="Loading APSRTC Admin Command Dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Top Welcome Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Fleet Operations Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">Real-time overview across Andhra Pradesh bus networks</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/live-buses"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Live Fleet Monitor Map
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Buses</span>
            <Bus className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{stats.activeBusesCount}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">100% Verified Fleet</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Today's Trips</span>
            <Calendar className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{stats.todayTripsCount}</p>
          <span className="text-[10px] text-blue-600 font-semibold">Scheduled Across AP</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Today's Bookings</span>
            <Ticket className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{stats.todayBookingsCount}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+18% vs Yesterday</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Today's Revenue</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">₹{stats.totalRevenueToday.toLocaleString()}</p>
          <span className="text-[10px] text-slate-400 font-medium">Verified Payment Receipts</span>
        </div>
      </div>

      {/* Weekly Revenue & Bookings Bar Chart */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Weekly Bookings & Revenue Breakdown</h3>
        <div className="grid grid-cols-7 gap-2 pt-6 items-end h-48 border-b border-slate-100 pb-2">
          {revenueChart.map((d, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                ₹{(d.revenue / 1000).toFixed(0)}k
              </span>
              <div
                className="w-full bg-blue-600 rounded-t-lg transition-all group-hover:bg-blue-700"
                style={{ height: `${(d.revenue / 1300000) * 140}px` }}
              ></div>
              <span className="text-xs font-bold text-slate-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
