import React from 'react';
import { LiveLocationData } from '../../types';
import { Bus, MapPin, Navigation, Compass, Layers } from 'lucide-react';

interface MapContainerProps {
  locationData: LiveLocationData;
  sourceCity?: string;
  destinationCity?: string;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  locationData,
  sourceCity = 'Narasaraopeta',
  destinationCity = 'Hyderabad'
}) => {
  return (
    <div className="relative w-full h-96 sm:h-[450px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Visual Map Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px), radial-gradient(#10b981 1px, #0f172a 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}
      ></div>

      {/* Map Header Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-xs text-white">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Live GPS Feed
          </span>
          <span className="text-slate-400">• {locationData.busNumber}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <span>Speed: <strong className="text-white">{locationData.speedKmH} km/h</strong></span>
          <span>•</span>
          <span>Signal: <strong className="text-emerald-400">{locationData.gpsSignal}</strong></span>
        </div>
      </div>

      {/* Simulated Route Canvas / SVG */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <svg className="w-full h-full max-w-2xl max-h-80" viewBox="0 0 600 300">
          {/* Curved Highway Route Path */}
          <path
            d="M 60 220 Q 200 80, 320 180 T 540 80"
            fill="none"
            stroke="#334155"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Active Route Glow */}
          <path
            d="M 60 220 Q 200 80, 320 180 T 540 80"
            fill="none"
            stroke="#2563eb"
            strokeWidth="4"
            strokeDasharray="8 6"
            strokeLinecap="round"
            className="animate-pulse"
          />

          {/* Boarding Point Marker (Source) */}
          <g transform="translate(60, 220)">
            <circle r="16" fill="#1e40af" opacity="0.3" />
            <circle r="10" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
            <text x="0" y="32" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
              {sourceCity} (Start)
            </text>
          </g>

          {/* Intermediate Stop Marker (Guntur) */}
          <g transform="translate(200, 120)">
            <circle r="7" fill="#64748b" stroke="#ffffff" strokeWidth="2" />
            <text x="0" y="-14" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
              Guntur Stop
            </text>
          </g>

          {/* Live Bus Marker (Animated Position) */}
          <g transform="translate(320, 180)" className="cursor-pointer">
            {/* Pulsing ring around live bus */}
            <circle r="26" fill="#3b82f6" opacity="0.2" className="animate-ping" />
            <circle r="18" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
            {/* Bus Icon */}
            <foreignObject x="-10" y="-10" width="20" height="20">
              <div className="w-full h-full text-white flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
            </foreignObject>
            {/* Label Tooltip */}
            <foreignObject x="-60" y="-45" width="120" height="30">
              <div className="bg-slate-900 text-emerald-400 font-bold text-[10px] py-1 px-2 rounded-lg border border-emerald-500 shadow-md text-center truncate">
                🚌 {locationData.speedKmH} km/h • On Route
              </div>
            </foreignObject>
          </g>

          {/* Destination Marker */}
          <g transform="translate(540, 80)">
            <circle r="16" fill="#065f46" opacity="0.3" />
            <circle r="10" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
            <text x="0" y="32" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
              {destinationCity} (Dest)
            </text>
          </g>
        </svg>
      </div>

      {/* Map Control Buttons Bottom Right */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => alert('Map zoomed in. Google Maps SDK will be integrated in backend phase.')}
          className="w-9 h-9 rounded-xl bg-slate-900/90 text-white border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => alert('Map centered on live bus position.')}
          className="w-9 h-9 rounded-xl bg-slate-900/90 text-emerald-400 border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg"
          title="Recenter Map"
        >
          <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
        </button>
      </div>

      {/* Bottom Status Ribbon */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
        <Navigation className="w-4 h-4 text-blue-400" />
        <span>Next Stop: <strong className="text-white">{locationData.nextStopName}</strong></span>
      </div>
    </div>
  );
};
