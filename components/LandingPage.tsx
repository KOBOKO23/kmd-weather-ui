import { Link } from 'react-router-dom';
import { Droplets, Wind, Thermometer, MapPin, Calendar, Database, Satellite, Zap, CloudRain, Activity } from 'lucide-react';

export function LandingPage() {
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
                <h1 className="text-slate-900 text-lg font-bold">KENYA METEOROLOGICAL DEPARTMENT</h1>
                <p className="text-slate-700 text-xs uppercase tracking-wide">Numerical Weather Prediction & Data Assimilation Section</p>
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
        {/* Model Run Info */}
        <section className="mb-8">
          <table className="w-full border-2 border-slate-900">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-900">
                <th className="px-4 py-2 text-left text-xs font-bold text-slate-900 uppercase border-r border-slate-900">Latest Model Run</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-slate-900 uppercase border-r border-slate-900">Model Version</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-slate-900 uppercase border-r border-slate-900">Forecast Lead Time</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-slate-900 uppercase">Temporal Resolution</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-900">
                <td className="px-4 py-3 text-sm font-mono border-r border-slate-900">{currentDate} 09:00 EAT</td>
                <td className="px-4 py-3 text-sm border-r border-slate-900">WRF-ARW v4.5.1</td>
                <td className="px-4 py-3 text-sm border-r border-slate-900">72 hours</td>
                <td className="px-4 py-3 text-sm">3-hourly</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Domain Configuration & Parameters */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Domain Configuration */}
            <div className="border-2 border-slate-900">
              <div className="bg-slate-100 border-b-2 border-slate-900 px-4 py-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase">Domain Configuration</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">Kenya Domain</td>
                    <td className="px-4 py-2 font-mono">4.5 km</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">East Africa Domain</td>
                    <td className="px-4 py-2 font-mono">12 km</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">Grid Points (Kenya)</td>
                    <td className="px-4 py-2 font-mono">450 × 520</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-r border-slate-900">Vertical Levels</td>
                    <td className="px-4 py-2 font-mono">38 levels</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Available Parameters */}
            <div className="border-2 border-slate-900">
              <div className="bg-slate-100 border-b-2 border-slate-900 px-4 py-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase">Available Parameters</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2">Accumulated Precipitation (mm)</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2">Temperature Min/Max (°C)</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2">Relative Humidity (%)</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2">CAPE (J/kg)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Wind Speed & Direction</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Forecast Products Navigation */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-slate-900 uppercase mb-4 pb-2 border-b-2 border-slate-900">Forecast Products & Services</h2>
          
          <table className="w-full border-2 border-slate-900 text-sm">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-900">
                <th className="px-4 py-2 text-left text-xs font-bold uppercase border-r border-slate-900 w-1/4">Product</th>
                <th className="px-4 py-2 text-left text-xs font-bold uppercase border-r border-slate-900">Description</th>
                <th className="px-4 py-2 text-left text-xs font-bold uppercase border-r border-slate-900 w-24">Status</th>
                <th className="px-4 py-2 text-left text-xs font-bold uppercase w-32">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-900">
                <td className="px-4 py-3 font-medium border-r border-slate-900">WRF Model Viewer</td>
                <td className="px-4 py-3 border-r border-slate-900">Real-time visualization of WRF model output for Kenya and East Africa domains</td>
                <td className="px-4 py-3 border-r border-slate-900 font-medium">ACTIVE</td>
                <td className="px-4 py-3">
                  <Link 
                    to="/nwp-system"
                    className="border-2 border-slate-900 px-3 py-1 text-xs font-bold uppercase hover:bg-slate-900 hover:text-white transition-colors inline-block"
                  >
                    ACCESS
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-slate-900">
                <td className="px-4 py-3 font-medium border-r border-slate-900">County Forecasts</td>
                <td className="px-4 py-3 border-r border-slate-900">Localized forecasts for all 47 counties with detailed meteorological parameters</td>
                <td className="px-4 py-3 border-r border-slate-900 text-slate-500">PLANNED</td>
                <td className="px-4 py-3 text-slate-500 text-xs">Under Development</td>
              </tr>
              <tr className="border-b border-slate-900">
                <td className="px-4 py-3 font-medium border-r border-slate-900">Daily Forecast</td>
                <td className="px-4 py-3 border-r border-slate-900">24-hour detailed forecasts with hourly breakdowns for major cities</td>
                <td className="px-4 py-3 border-r border-slate-900 text-slate-500">PLANNED</td>
                <td className="px-4 py-3 text-slate-500 text-xs">Under Development</td>
              </tr>
              <tr className="border-b border-slate-900">
                <td className="px-4 py-3 font-medium border-r border-slate-900">5-Day Forecast</td>
                <td className="px-4 py-3 border-r border-slate-900">Medium-range forecasts with precipitation probability and temperature trends</td>
                <td className="px-4 py-3 border-r border-slate-900 text-slate-500">PLANNED</td>
                <td className="px-4 py-3 text-slate-500 text-xs">Under Development</td>
              </tr>
              <tr className="border-b border-slate-900">
                <td className="px-4 py-3 font-medium border-r border-slate-900">7-Day Forecast</td>
                <td className="px-4 py-3 border-r border-slate-900">Week-ahead outlook for agricultural planning and operational decision-making</td>
                <td className="px-4 py-3 border-r border-slate-900 text-slate-500">PLANNED</td>
                <td className="px-4 py-3 text-slate-500 text-xs">Under Development</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium border-r border-slate-900">Seasonal Forecast</td>
                <td className="px-4 py-3 border-r border-slate-900">Sub-seasonal to seasonal outlooks for climate-sensitive sectors</td>
                <td className="px-4 py-3 border-r border-slate-900 text-slate-500">PLANNED</td>
                <td className="px-4 py-3 text-slate-500 text-xs">Under Development</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* System Configuration */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-slate-900 uppercase mb-4 pb-2 border-b-2 border-slate-900">System Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Model Configuration */}
            <div className="border-2 border-slate-900">
              <div className="bg-slate-100 border-b-2 border-slate-900 px-4 py-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase">Model Physics</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">Model Core</td>
                    <td className="px-4 py-2">ARW Dynamics</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">Microphysics</td>
                    <td className="px-4 py-2">Thompson Scheme</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">Radiation</td>
                    <td className="px-4 py-2">RRTMG</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">PBL Scheme</td>
                    <td className="px-4 py-2">YSU</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-r border-slate-900">Cumulus</td>
                    <td className="px-4 py-2">Kain-Fritsch</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Data Sources */}
            <div className="border-2 border-slate-900">
              <div className="bg-slate-100 border-b-2 border-slate-900 px-4 py-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase">Data Sources</h3>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">Initial Conditions</td>
                    <td className="px-4 py-2">GFS 0.25°</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">Boundary Data</td>
                    <td className="px-4 py-2">GFS 6-hourly</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">SST</td>
                    <td className="px-4 py-2">NOAA RTG</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="px-4 py-2 border-r border-slate-900">Topography</td>
                    <td className="px-4 py-2">USGS GMTED2010</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-r border-slate-900">Land Use</td>
                    <td className="px-4 py-2">MODIS 20-category</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-900 bg-slate-50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm mb-6">
            <div>
              <h6 className="font-bold text-slate-900 mb-2 uppercase text-xs">About NWP Section</h6>
              <p className="text-slate-700 text-xs leading-relaxed">
                The Numerical Weather Prediction & Data Assimilation Section operates 
                Kenya's operational weather forecasting models providing critical 
                meteorological information for the nation and region.
              </p>
            </div>
            <div>
              <h6 className="font-bold text-slate-900 mb-2 uppercase text-xs">Quick Links</h6>
              <ul className="space-y-1 text-xs">
                <li><Link to="/nwp-system" className="text-slate-700 hover:underline">WRF Model Viewer</Link></li>
                <li><Link to="/counties" className="text-slate-700 hover:underline">County Forecasts</Link></li>
                <li><Link to="/forecasts" className="text-slate-700 hover:underline">Forecast Products</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-slate-900 mb-2 uppercase text-xs">Contact Information</h6>
              <p className="text-slate-700 text-xs leading-relaxed">
                Kenya Meteorological Department<br />
                Dagoretti Corner, Ngong Road<br />
                P.O. Box 30259-00100<br />
                Nairobi, Kenya
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-900 text-center text-slate-600 text-xs uppercase">
            Kenya Meteorological Department - Numerical Weather Prediction Section
          </div>
        </div>
      </footer>
    </div>
  );
}
