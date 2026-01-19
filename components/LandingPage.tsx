import { MapPin, Calendar, Database, Satellite, Zap, CloudRain, Activity, Wind, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-2 border-slate-900 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="border-2 border-slate-900 p-2">
                <CloudRain className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h1 className="text-slate-900 text-lg font-bold">NUMERICAL WEATHER PREDICTION CENTER NAIROBI</h1>
                <p className="text-slate-700 text-xs uppercase tracking-wide">Kenya Meteorological Department</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-600 uppercase">System Status</div>
              <div className="text-sm text-slate-900 font-medium">OPERATIONAL</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="border-2 border-slate-900 p-8 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Advancing Weather Forecasting Through Science and Technology
            </h2>
            <p className="text-slate-700 mb-4 max-w-3xl">
              The Numerical Weather Prediction Center Nairobi provides accurate, timely weather forecasts 
              and climate information to support decision-making across Kenya and East Africa. 
              Our numerical weather prediction systems deliver essential meteorological data 
              for public safety, agriculture, aviation, and disaster preparedness.
            </p>
            <div className="text-sm text-slate-600">
              Latest Update: <span className="font-mono font-medium">{currentDate} 09:00 EAT</span>
            </div>
          </div>
        </section>

        {/* Forecast Products - Card Grid */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-slate-900 uppercase mb-6">Forecast Products</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weather Maps */}
            <a href="/nwp-system" className="border-2 border-slate-900 hover:bg-slate-50 transition-colors group block">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <MapPin className="w-8 h-8 text-slate-900" />
                  <span className="text-xs font-bold text-slate-900 uppercase border border-slate-900 px-2 py-1">Active</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Weather Maps</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Interactive weather maps showing temperature, precipitation, wind, and other parameters across Kenya and East Africa.
                </p>
                <div className="text-xs font-bold text-slate-900 uppercase group-hover:underline">
                  View Maps →
                </div>
              </div>
            </a>

            {/* County Forecasts */}
            <div className="border-2 border-slate-300 bg-slate-50">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Database className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase border border-slate-300 px-2 py-1">Coming Soon</span>
                </div>
                <h3 className="text-base font-bold text-slate-500 mb-2">County Forecasts</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Detailed forecasts for all 47 counties with localized weather information and advisories.
                </p>
                <div className="text-xs font-bold text-slate-400 uppercase">
                  Under Development
                </div>
              </div>
            </div>

            {/* Daily Forecast */}
            <div className="border-2 border-slate-300 bg-slate-50">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Calendar className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase border border-slate-300 px-2 py-1">Coming Soon</span>
                </div>
                <h3 className="text-base font-bold text-slate-500 mb-2">Daily Forecast</h3>
                <p className="text-sm text-slate-600 mb-3">
                  24-hour detailed forecasts with hourly breakdowns for major cities and regions.
                </p>
                <div className="text-xs font-bold text-slate-400 uppercase">
                  Under Development
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="border-2 border-slate-300 bg-slate-50">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Activity className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase border border-slate-300 px-2 py-1">Coming Soon</span>
                </div>
                <h3 className="text-base font-bold text-slate-500 mb-2">5-Day Forecast</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Medium-range forecasts with precipitation probability and temperature trends.
                </p>
                <div className="text-xs font-bold text-slate-400 uppercase">
                  Under Development
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="border-2 border-slate-300 bg-slate-50">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Wind className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase border border-slate-300 px-2 py-1">Coming Soon</span>
                </div>
                <h3 className="text-base font-bold text-slate-500 mb-2">7-Day Forecast</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Week-ahead outlook for agricultural planning and operational decision-making.
                </p>
                <div className="text-xs font-bold text-slate-400 uppercase">
                  Under Development
                </div>
              </div>
            </div>

            {/* Seasonal Outlook */}
            <div className="border-2 border-slate-300 bg-slate-50">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase border border-slate-300 px-2 py-1">Coming Soon</span>
                </div>
                <h3 className="text-base font-bold text-slate-500 mb-2">Seasonal Outlook</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Sub-seasonal to seasonal forecasts for climate-sensitive sectors and long-term planning.
                </p>
                <div className="text-xs font-bold text-slate-400 uppercase">
                  Under Development
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-slate-900 uppercase mb-6">Services & Data</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data Access */}
            <div className="border-2 border-slate-300 bg-slate-50">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Database className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase border border-slate-300 px-2 py-1">Coming Soon</span>
                </div>
                <h3 className="text-base font-bold text-slate-500 mb-2">Data Access</h3>
                <p className="text-sm text-slate-600">
                  Access historical weather data, climate records, and forecast archives for research and analysis.
                </p>
              </div>
            </div>

            {/* API Services */}
            <div className="border-2 border-slate-300 bg-slate-50">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Zap className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase border border-slate-300 px-2 py-1">Coming Soon</span>
                </div>
                <h3 className="text-base font-bold text-slate-500 mb-2">API Services</h3>
                <p className="text-sm text-slate-600">
                  Programmatic access to weather data and forecasts for developers and organizations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-900 bg-slate-50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
            <div>
              <h6 className="font-bold text-slate-900 mb-3 uppercase text-xs">About</h6>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><a href="#" className="hover:underline">Who We Are</a></li>
                <li><a href="#" className="hover:underline">What We Do</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-slate-900 mb-3 uppercase text-xs">Forecasts</h6>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><a href="/nwp-system" className="hover:underline">Weather Maps</a></li>
                <li><a href="#" className="hover:underline text-slate-500">County Forecasts</a></li>
                <li><a href="#" className="hover:underline text-slate-500">Daily Forecast</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-slate-900 mb-3 uppercase text-xs">Data & Services</h6>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><a href="#" className="hover:underline text-slate-500">Climate Data</a></li>
                <li><a href="#" className="hover:underline text-slate-500">Historical Records</a></li>
                <li><a href="#" className="hover:underline text-slate-500">API Access</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-slate-900 mb-3 uppercase text-xs">Resources</h6>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><a href="#" className="hover:underline text-slate-500">Publications</a></li>
                <li><a href="#" className="hover:underline text-slate-500">Documentation</a></li>
                <li><a href="#" className="hover:underline text-slate-500">Training</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-300">
            <p className="text-xs text-slate-600 mb-2">
              Kenya Meteorological Department, Dagoretti Corner, Ngong Road
              <br />
              P.O. Box 30259-00100, Nairobi, Kenya
            </p>
            <div className="text-xs text-slate-500 uppercase">
              © {new Date().getFullYear()} Numerical Weather Prediction Center Nairobi. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
