import React from 'react';
import { Armchair, CheckCircle2, XCircle, Lock } from 'lucide-react';
import { Card } from '../ui';

export const SeatLegend: React.FC = () => {
  return (
    <Card className="bg-white border border-slate-200 p-4">
      <div className="flex flex-wrap items-center justify-around gap-4 text-xs font-semibold text-slate-800">
        {/* Available */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white border-2 border-slate-300 flex items-center justify-center text-slate-500 shadow-2xs">
            <Armchair className="w-4 h-4" />
          </div>
          <span>Available (○)</span>
        </div>

        {/* Selected */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-700 border-2 border-blue-900 text-amber-300 flex items-center justify-center font-bold shadow-2xs">
            <CheckCircle2 className="w-4.5 h-4.5" />
          </div>
          <span className="text-blue-900 font-bold">Selected (●)</span>
        </div>

        {/* Occupied */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200 border-2 border-slate-300 text-slate-400 flex items-center justify-center cursor-not-allowed">
            <XCircle className="w-4 h-4" />
          </div>
          <span className="text-slate-500">Occupied (■)</span>
        </div>

        {/* Reserved */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-pink-100 border-2 border-pink-300 text-pink-700 flex items-center justify-center cursor-not-allowed">
            <Lock className="w-4 h-4" />
          </div>
          <span className="text-pink-800">Reserved</span>
        </div>
      </div>
    </Card>
  );
};
