import { ChevronLeft, ChevronRight, Droplets, Thermometer, Wind, Zap, Globe, MapPin } from 'lucide-react';
import type { Domain, Parameter } from '../types/nwp';

interface SidebarProps {
  domain: Domain;
  parameter: Parameter;
  onDomainChange: (domain: Domain) => void;
  onParameterChange: (parameter: Parameter) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const parameters = [
  { 
    id: 'rainfall' as Parameter, 
    label: 'Precipitation', 
    fullName: 'Accumulated Rainfall',
    icon: Droplets, 
    unit: 'mm',
    color: '#3b82f6'
  },
  { 
    id: 'temp-max' as Parameter, 
    label: 'Temp (Max)', 
    fullName: 'Maximum Temperature',
    icon: Thermometer, 
    unit: '°C',
    color: '#ef4444'
  },
  { 
    id: 'temp-min' as Parameter, 
    label: 'Temp (Min)', 
    fullName: 'Minimum Temperature',
    icon: Thermometer, 
    unit: '°C',
    color: '#06b6d4'
  },
  { 
    id: 'rh' as Parameter, 
    label: 'Rel. Humidity', 
    fullName: 'Relative Humidity',
    icon: Wind, 
    unit: '%',
    color: '#10b981'
  },
  { 
    id: 'cape' as Parameter, 
    label: 'CAPE', 
    fullName: 'Conv. Available Potential Energy',
    icon: Zap, 
    unit: 'J/kg',
    color: '#8b5cf6'
  },
];

export function Sidebar({ domain, parameter, onDomainChange, onParameterChange, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-slate-800 border-r border-slate-700 shadow-lg transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'w-72' : 'w-16'
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-4 bg-slate-700 text-slate-200 rounded-full p-1.5 border border-slate-600 hover:bg-slate-600 transition-colors z-50"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {/* Collapsed State - Icons Only */}
        {!isOpen && (
          <div className="flex flex-col items-center py-6 space-y-3">
            <div className="w-10 h-px bg-slate-700"></div>
            
            {/* Domain indicator */}
            <div className="flex flex-col items-center gap-2 py-2">
              <Globe className="w-5 h-5 text-slate-400" />
              <div className="text-xs text-slate-500 font-mono">
                {domain === 'kenya' ? '4.5km' : '25km'}
              </div>
            </div>

            <div className="w-10 h-px bg-slate-700"></div>

            {/* Parameter icons */}
            {parameters.map((param) => {
              const Icon = param.icon;
              const isActive = param.id === parameter;
              return (
                <button
                  key={param.id}
                  onClick={() => onParameterChange(param.id)}
                  className={`p-2.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-slate-700 text-white ring-1 ring-slate-600'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-750'
                  }`}
                  title={param.fullName}
                  style={isActive ? { color: param.color } : {}}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        )}

        {/* Expanded State - Full Content */}
        {isOpen && (
          <div className="h-full overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-slate-700">
              <h2 className="text-xs uppercase tracking-wider text-slate-500 mb-1">WRF Model</h2>
              <p className="text-sm text-slate-300">Configuration</p>
            </div>

            <div className="p-4 space-y-6">
              {/* Domain Selection */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3">Domain</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => onDomainChange('kenya')}
                    className={`w-full px-3 py-2.5 rounded-lg border transition-colors text-left ${
                      domain === 'kenya'
                        ? 'border-blue-600 bg-blue-600/10 text-white'
                        : 'border-slate-700 bg-slate-750 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4" style={{ color: domain === 'kenya' ? '#3b82f6' : undefined }} />
                        <div>
                          <div className="text-sm">Kenya</div>
                          <div className="text-xs text-slate-500 font-mono">High Resolution</div>
                        </div>
                      </div>
                      <div className="text-xs font-mono text-blue-400">4.5km</div>
                    </div>
                  </button>

                  <button
                    onClick={() => onDomainChange('east-africa')}
                    className={`w-full px-3 py-2.5 rounded-lg border transition-colors text-left ${
                      domain === 'east-africa'
                        ? 'border-blue-600 bg-blue-600/10 text-white'
                        : 'border-slate-700 bg-slate-750 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Globe className="w-4 h-4" style={{ color: domain === 'east-africa' ? '#3b82f6' : undefined }} />
                        <div>
                          <div className="text-sm">East Africa</div>
                          <div className="text-xs text-slate-500 font-mono">Regional</div>
                        </div>
                      </div>
                      <div className="text-xs font-mono text-blue-400">25km</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Parameter Selection */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                  Variables
                </h3>
                <div className="space-y-1.5">
                  {parameters.map((param) => {
                    const Icon = param.icon;
                    const isActive = param.id === parameter;
                    return (
                      <button
                        key={param.id}
                        onClick={() => onParameterChange(param.id)}
                        className={`w-full px-3 py-2 rounded-lg border transition-all text-left ${
                          isActive
                            ? 'border-slate-600 bg-slate-700 text-white'
                            : 'border-transparent bg-slate-750 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: isActive ? param.color : undefined }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm truncate">{param.label}</div>
                            <div className="text-xs text-slate-500 font-mono">{param.unit}</div>
                          </div>
                          {isActive && (
                            <div 
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                              style={{ backgroundColor: param.color }}
                            ></div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Model Specifications */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                  Specifications
                </h3>
                <div className="bg-slate-750 border border-slate-700 rounded-lg p-3 space-y-2">
                  {domain === 'kenya' ? (
                    <>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Grid Resolution</span>
                        <span className="text-slate-300 font-mono">4.5 km</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Grid Dimensions</span>
                        <span className="text-slate-300 font-mono">450 × 520</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Vertical Levels</span>
                        <span className="text-slate-300 font-mono">38</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Grid Resolution</span>
                        <span className="text-slate-300 font-mono">25 km</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Grid Dimensions</span>
                        <span className="text-slate-300 font-mono">380 × 440</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Vertical Levels</span>
                        <span className="text-slate-300 font-mono">38</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Forecast Configuration */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
                  Forecast Setup
                </h3>
                <div className="bg-slate-750 border border-slate-700 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Time Step</span>
                    <span className="text-slate-300 font-mono">3 hours</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Forecast Range</span>
                    <span className="text-slate-300 font-mono">0-72 hours</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Initialization</span>
                    <span className="text-slate-300 font-mono">06:00 UTC</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Output Freq.</span>
                    <span className="text-slate-300 font-mono">3-hourly</span>
                  </div>
                </div>
              </div>

              {/* Model Info */}
              <div className="pt-2 border-t border-slate-700">
                <div className="text-xs text-slate-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Model</span>
                    <span className="text-slate-400 font-mono">WRF v4.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Physics</span>
                    <span className="text-slate-400">Thompson MP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Boundary</span>
                    <span className="text-slate-400">GFS 0.25°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
