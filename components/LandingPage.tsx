import { Link } from 'react-router-dom';
import { Droplets, Wind, Thermometer, MapPin, Calendar, Database, Satellite, Zap, CloudRain, Activity } from 'lucide-react';

export function LandingPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-2.5 rounded-lg">
                <CloudRain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-white text-xl">Kenya Meteorological Department</h1>
                <p className="text-slate-400 text-sm">Numerical Weather Prediction & Data Assimilation Section</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">System Status</div>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Operational
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl text-white mb-3">Operational Weather Prediction System</h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
              The KMD NWP Section operates a high-resolution Weather Research and Forecasting (WRF) model 
              providing deterministic forecasts for Kenya and the East Africa region. The system runs 
              operationally on a daily cycle with data assimilation capabilities.
            </p>
          </div>

          {/* Model Run Info */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Latest Model Run</div>
                <div className="text-white text-lg font-mono">{currentDate} 09:00 EAT</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Model Version</div>
                <div className="text-white text-lg">WRF v4.5.1</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Forecast Lead Time</div>
                <div className="text-white text-lg">72 hours</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Temporal Resolution</div>
                <div className="text-white text-lg">3-hourly</div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                Domain Configuration
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Kenya Domain</span>
                  <span className="text-white font-mono">4.5 km</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">East Africa Domain</span>
                  <span className="text-white font-mono">12 km</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Grid Points (Kenya)</span>
                  <span className="text-white font-mono">450 × 520</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vertical Levels</span>
                  <span className="text-white font-mono">38 levels</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" />
                Available Parameters
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300">Accumulated Precipitation (mm)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Thermometer className="w-4 h-4 text-red-400" />
                  <span className="text-slate-300">Temperature Min/Max (°C)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="w-4 h-4 text-teal-400" />
                  <span className="text-slate-300">Relative Humidity (%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-300">CAPE (J/kg)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-slate-300">Wind Speed & Direction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white text-lg mb-1">WRF Model Visualization System</h3>
                <p className="text-slate-400">Interactive viewer for model output products</p>
              </div>
              <Link 
                to="/nwp-system"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Satellite className="w-5 h-5" />
                Access System
              </Link>
            </div>
          </div>
        </section>

        {/* Forecast Products */}
        <section className="mb-16">
          <h2 className="text-2xl text-white mb-6 border-b border-slate-700 pb-3">Forecast Products & Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* WRF Model Viewer */}
            <Link 
              to="/nwp-system"
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-600 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <Satellite className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded border border-green-600/30">
                  ACTIVE
                </span>
              </div>
              <h3 className="text-white text-lg mb-2">WRF Model Viewer</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                Real-time visualization of WRF model output for Kenya and East Africa domains. 
                View rainfall, temperature, humidity, and CAPE forecasts.
              </p>
              <div className="text-blue-400 text-sm group-hover:text-blue-300 flex items-center gap-1">
                Launch System
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* County Forecasts */}
            <Link 
              to="/counties"
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-purple-600/20 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xs px-2 py-1 bg-slate-700 text-slate-400 rounded border border-slate-600">
                  PLANNED
                </span>
              </div>
              <h3 className="text-white text-lg mb-2">County Forecasts</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                Localized forecasts for all 47 counties with detailed meteorological parameters 
                and advisory information.
              </p>
              <div className="text-slate-500 text-sm">
                Under Development
              </div>
            </Link>

            {/* Daily Forecast */}
            <Link 
              to="/daily-forecast"
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-orange-600/20 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-400" />
                </div>
                <span className="text-xs px-2 py-1 bg-slate-700 text-slate-400 rounded border border-slate-600">
                  PLANNED
                </span>
              </div>
              <h3 className="text-white text-lg mb-2">Daily Forecast</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                24-hour detailed forecasts with hourly breakdowns for major cities and regions.
              </p>
              <div className="text-slate-500 text-sm">
                Under Development
              </div>
            </Link>

            {/* 5-Day Forecast */}
            <Link 
              to="/5-day-forecast"
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-teal-600/20 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-teal-400" />
                </div>
                <span className="text-xs px-2 py-1 bg-slate-700 text-slate-400 rounded border border-slate-600">
                  PLANNED
                </span>
              </div>
              <h3 className="text-white text-lg mb-2">5-Day Forecast</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                Medium-range forecasts with precipitation probability and temperature trends.
              </p>
              <div className="text-slate-500 text-sm">
                Under Development
              </div>
            </Link>

            {/* 7-Day Forecast */}
            <Link 
              to="/7-day-forecast"
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-cyan-600/20 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-xs px-2 py-1 bg-slate-700 text-slate-400 rounded border border-slate-600">
                  PLANNED
                </span>
              </div>
              <h3 className="text-white text-lg mb-2">7-Day Forecast</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                Week-ahead outlook for agricultural planning and operational decision-making.
              </p>
              <div className="text-slate-500 text-sm">
                Under Development
              </div>
            </Link>

            {/* Seasonal Forecast */}
            <Link 
              to="/seasonal-forecast"
              className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-indigo-600/20 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-xs px-2 py-1 bg-slate-700 text-slate-400 rounded border border-slate-600">
                  PLANNED
                </span>
              </div>
              <h3 className="text-white text-lg mb-2">Seasonal Forecast</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                Sub-seasonal to seasonal outlooks for climate-sensitive sectors and planning.
              </p>
              <div className="text-slate-500 text-sm">
                Under Development
              </div>
            </Link>
          </div>
        </section>

        {/* System Information */}
        <section className="mb-16">
          <h2 className="text-2xl text-white mb-6 border-b border-slate-700 pb-3">System Information</h2>
          
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white mb-4">Model Configuration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">Model Core:</span>
                    <span className="text-slate-300">ARW Dynamics</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">Microphysics:</span>
                    <span className="text-slate-300">Thompson Scheme</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">Radiation:</span>
                    <span className="text-slate-300">RRTMG</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">PBL Scheme:</span>
                    <span className="text-slate-300">YSU</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">Cumulus:</span>
                    <span className="text-slate-300">Kain-Fritsch</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white mb-4">Data Sources</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">Initial Conditions:</span>
                    <span className="text-slate-300">GFS 0.25°</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">Boundary Data:</span>
                    <span className="text-slate-300">GFS 6-hourly</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">SST:</span>
                    <span className="text-slate-300">NOAA RTG</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">Topography:</span>
                    <span className="text-slate-300">USGS GMTED2010</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-32">Land Use:</span>
                    <span className="text-slate-300">MODIS 20-category</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h6 className="text-white mb-3">About NWP Section</h6>
              <p className="text-slate-400 leading-relaxed">
                The Numerical Weather Prediction & Data Assimilation Section operates 
                Kenya's operational weather forecasting models providing critical 
                meteorological information for the nation and region.
              </p>
            </div>
            <div>
              <h6 className="text-white mb-3">Navigation</h6>
              <ul className="space-y-2">
                <li><Link to="/nwp-system" className="text-slate-400 hover:text-blue-400 transition-colors">WRF Model Viewer</Link></li>
                <li><Link to="/counties" className="text-slate-400 hover:text-slate-300 transition-colors">County Forecasts</Link></li>
                <li><Link to="/forecasts" className="text-slate-400 hover:text-slate-300 transition-colors">Forecast Products</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white mb-3">Contact Information</h6>
              <p className="text-slate-400 leading-relaxed">
                Kenya Meteorological Department<br />
                Dagoretti Corner, Ngong Road<br />
                P.O. Box 30259-00100<br />
                Nairobi, Kenya
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-700 text-center text-slate-500 text-sm">
            Kenya Meteorological Department - Numerical Weather Prediction Section
          </div>
        </div>
      </footer>
    </div>
  );
}
