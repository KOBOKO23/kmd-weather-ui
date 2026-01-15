import { CloudRain, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const isNWPSystem = location.pathname === '/nwp-system';
  
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl border-b border-slate-700/50 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back to Home button - only show in NWP System */}
            {isNWPSystem && (
              <Link 
                to="/"
                className="bg-slate-800/50 hover:bg-slate-700/50 p-2 rounded-lg transition-all border border-slate-600/30 hover:border-blue-500/50 group"
                title="Back to Home"
              >
                <Home className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </Link>
            )}
            
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg">
              <CloudRain className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl tracking-wide">Kenya Meteorological Department</h1>
              <p className="text-blue-300 text-xs">Numerical Weather Prediction System</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-slate-400">Model Run Time</div>
              <div className="font-mono text-sm text-blue-300">{new Date().toISOString().split('T')[0]} 09:00 EAT</div>
            </div>
            <div className="w-px h-10 bg-slate-700"></div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Domain Coverage</div>
              <div className="text-sm">Kenya & East Africa</div>
            </div>
            <div className="w-px h-10 bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"></div>
              <span className="text-xs text-green-400">Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}