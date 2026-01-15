import { useState } from 'react';
import { WeatherMap } from '../components/WeatherMap';
import { Sidebar } from '../components/Sidebar';
import { TimeControl } from '../components/TimeControl';
import { Header } from '../components/Header';
import { MapLegend } from '../components/MapLegend';

export type Domain = 'kenya' | 'east-africa';
export type Parameter = 'rainfall' | 'temp-max' | 'temp-min' | 'rh' | 'cape';

export interface ForecastState {
  domain: Domain;
  parameter: Parameter;
  timeStep: number;
  baseTime: Date;
}

export function NWPSystemPage() {
  const [forecastState, setForecastState] = useState<ForecastState>({
    domain: 'east-africa',
    parameter: 'rainfall',
    timeStep: 0,
    baseTime: new Date(),
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const handleDomainChange = (domain: Domain) => {
    setForecastState(prev => ({ ...prev, domain }));
  };

  const handleParameterChange = (parameter: Parameter) => {
    setForecastState(prev => ({ ...prev, parameter }));
  };

  const handleTimeStepChange = (direction: 'next' | 'previous') => {
    setForecastState(prev => {
      if (direction === 'next') {
        const newTimeStep = prev.timeStep === 24 ? 0 : prev.timeStep + 1;
        return { ...prev, timeStep: newTimeStep };
      } else {
        const newTimeStep = Math.max(prev.timeStep - 1, 0);
        return { ...prev, timeStep: newTimeStep };
      }
    });
  };

  // Always allow navigation (NEXT will loop at the end)
  const canGoNext = true;
  const canGoPrevious = forecastState.timeStep > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <Header />
      
      <main className="fixed inset-0 top-16 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          domain={forecastState.domain}
          parameter={forecastState.parameter}
          onDomainChange={handleDomainChange}
          onParameterChange={handleParameterChange}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Visualization Area */}
        <div 
          className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out"
          style={{ 
            marginLeft: isSidebarOpen ? '320px' : '64px'
          }}
        >
          {/* Map Display */}
          <div className="flex-1 p-4 pb-2 overflow-hidden">
            <div className="h-full bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700/20 relative">
              <WeatherMap 
                domain={forecastState.domain}
                parameter={forecastState.parameter}
                timeStep={forecastState.timeStep}
              />
              
              {/* Legend positioned inside map */}
              <MapLegend
                parameter={forecastState.parameter}
                isOpen={isLegendOpen}
                onToggle={() => setIsLegendOpen(!isLegendOpen)}
              />
            </div>
          </div>

          {/* Time Controls */}
          <div className="p-4 pt-2 flex-shrink-0">
            <TimeControl
              timeStep={forecastState.timeStep}
              baseTime={forecastState.baseTime}
              onNext={() => handleTimeStepChange('next')}
              onPrevious={() => handleTimeStepChange('previous')}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
            />
          </div>
        </div>
      </main>
    </div>
  );
}