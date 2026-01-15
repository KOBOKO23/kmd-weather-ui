import { useEffect } from "react";
import { fetchDomains } from "../api/testApi";
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Sun, BarChart3, TrendingUp, Cloud } from 'lucide-react';

export function ForecastsPage() {

  // ✅ PUT IT HERE — INSIDE the function, BEFORE return
  useEffect(() => {
    fetchDomains()
      .then(data => {
        console.log("✅ DOMAINS API OK:", data);
      })
      .catch(error => {
        console.error("❌ DOMAINS API FAILED:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-white text-xl">Forecast Products</h1>
              <p className="text-blue-300 text-sm">All available forecasting services</p>
            </div>
          </div>
        </div>
      </header>


      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl text-white mb-4">Weather Forecast Services</h2>
          <p className="text-slate-400 text-lg max-w-3xl">
            Explore our comprehensive suite of weather forecasting products, from short-range to seasonal predictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* WRF Model */}
          <Link 
            to="/nwp-system"
            className="group bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-8 border border-blue-500/30 hover:border-blue-400/50 transition-all hover:-translate-y-1"
          >
            <Cloud className="w-12 h-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl text-white mb-3">WRF Model System</h3>
            <p className="text-slate-300 mb-4">
              72-hour high-resolution numerical weather predictions for Kenya and East Africa.
            </p>
            <div className="text-blue-400 group-hover:text-blue-300">
              Launch System →
            </div>
            <div className="mt-4 inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
              Active
            </div>
          </Link>

          {/* County Forecasts */}
          <Link 
            to="/counties"
            className="group bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all hover:-translate-y-1"
          >
            <MapPin className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl text-white mb-3">County Forecasts</h3>
            <p className="text-slate-300 mb-4">
              Localized forecasts for all 47 counties with regional advisories.
            </p>
            <div className="text-purple-400 group-hover:text-purple-300">
              View Counties →
            </div>
            <div className="mt-4 inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              Coming Soon
            </div>
          </Link>

          {/* Daily Forecasts */}
          <Link 
            to="/daily-forecast"
            className="group bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-2xl p-8 border border-orange-500/20 hover:border-orange-400/40 transition-all hover:-translate-y-1"
          >
            <Sun className="w-12 h-12 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl text-white mb-3">Daily Forecasts</h3>
            <p className="text-slate-300 mb-4">
              24-hour detailed forecasts with hourly breakdowns for major cities.
            </p>
            <div className="text-orange-400 group-hover:text-orange-300">
              View Daily →
            </div>
            <div className="mt-4 inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              Coming Soon
            </div>
          </Link>

          {/* 5-Day Forecasts */}
          <Link 
            to="/5-day-forecast"
            className="group bg-gradient-to-br from-teal-900/30 to-teal-800/20 rounded-2xl p-8 border border-teal-500/20 hover:border-teal-400/40 transition-all hover:-translate-y-1"
          >
            <Calendar className="w-12 h-12 text-teal-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl text-white mb-3">5-Day Forecasts</h3>
            <p className="text-slate-300 mb-4">
              Extended forecasts with day/night conditions and precipitation.
            </p>
            <div className="text-teal-400 group-hover:text-teal-300">
              View 5-Day →
            </div>
            <div className="mt-4 inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              Coming Soon
            </div>
          </Link>

          {/* 7-Day Forecasts */}
          <Link 
            to="/7-day-forecast"
            className="group bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all hover:-translate-y-1"
          >
            <BarChart3 className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl text-white mb-3">7-Day Forecasts</h3>
            <p className="text-slate-300 mb-4">
              Week-ahead outlook for agriculture and event planning.
            </p>
            <div className="text-cyan-400 group-hover:text-cyan-300">
              View 7-Day →
            </div>
            <div className="mt-4 inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              Coming Soon
            </div>
          </Link>

          {/* Seasonal Forecasts */}
          <Link 
            to="/seasonal-forecast"
            className="group bg-gradient-to-br from-indigo-900/30 to-indigo-800/20 rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-400/40 transition-all hover:-translate-y-1"
          >
            <TrendingUp className="w-12 h-12 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl text-white mb-3">Seasonal Forecasts</h3>
            <p className="text-slate-300 mb-4">
              Long-range climate predictions for strategic planning.
            </p>
            <div className="text-indigo-400 group-hover:text-indigo-300">
              View Seasonal →
            </div>
            <div className="mt-4 inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
              Coming Soon
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
