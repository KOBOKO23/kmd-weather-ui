import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, X, Maximize2 } from 'lucide-react';

interface TimeControlProps {
  timeStep: number;
  baseTime: Date;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function TimeControl({ 
  timeStep, 
  baseTime, 
  onNext, 
  onPrevious, 
  canGoNext, 
  canGoPrevious 
}: TimeControlProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate forecast valid time (baseTime + timeStep * 3 hours)
  const forecastHours = timeStep * 3;
  const validTime = new Date(baseTime);
  validTime.setHours(validTime.getHours() + forecastHours);

  // Format time as HH:MM UTC
  const formatTime = (date: Date) => {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Format date as DD MMM YYYY
  const formatDate = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  // Compact bar version
  if (!isExpanded) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 gap-4">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className={`p-1.5 rounded transition-colors ${
                canGoPrevious
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
              title="Previous timestep"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              disabled={!canGoNext}
              className={`p-1.5 rounded transition-colors ${
                canGoNext
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
              title="Next timestep"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Time display */}
          <div className="flex-1 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-white font-mono text-sm">
                {formatDate(validTime)} {formatTime(validTime)} UTC
              </span>
            </div>
            <div className="text-slate-400 text-sm">
              T+{forecastHours}h
            </div>
          </div>

          {/* Expand button */}
          <button
            onClick={() => setIsExpanded(true)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
            title="Expand timeline"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Expanded popup version
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setIsExpanded(false)}
      ></div>

      {/* Popup */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
            <h3 className="text-white text-sm font-medium">Forecast Timeline</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                canGoPrevious
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider">Previous</span>
            </button>

            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Valid Time (UTC)</div>
              <div className="text-white font-mono">{formatDate(validTime)}</div>
              <div className="text-white font-mono text-lg">{formatTime(validTime)}</div>
            </div>

            <button
              onClick={onNext}
              disabled={!canGoNext}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                canGoNext
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span className="text-xs uppercase tracking-wider">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Hour markers */}
            <div className="relative h-16 mb-2">
              {[0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72].map((hour) => {
                const position = (hour / 72) * 100;
                const isActive = hour === forecastHours;
                const isMajor = hour % 24 === 0;
                
                return (
                  <div
                    key={hour}
                    className="absolute"
                    style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                  >
                    {isActive ? (
                      <div className="flex flex-col items-center">
                        <div className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-mono mb-1">
                          {hour}h
                        </div>
                        <div className="w-0.5 h-4 bg-blue-600"></div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className={`text-xs mb-1 ${isMajor ? 'text-slate-300 font-medium' : 'text-slate-500'}`}>
                          {hour}
                        </div>
                        <div className={`rounded-full ${isMajor ? 'w-1.5 h-1.5 bg-slate-400' : 'w-1 h-1 bg-slate-600'}`}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-blue-600 transition-all duration-300"
                style={{ width: `${(timeStep / 24) * 100}%` }}
              ></div>
              
              {/* Current position indicator */}
              <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                style={{ left: `${(timeStep / 24) * 100}%` }}
              >
                <div className="relative -translate-x-1/2">
                  <div className="w-4 h-4 bg-white border-2 border-blue-600 rounded-full"></div>
                </div>
              </div>

              {/* Day separators */}
              {[24, 48].map((hour) => (
                <div
                  key={hour}
                  className="absolute top-0 bottom-0 w-px bg-slate-600"
                  style={{ left: `${(hour / 72) * 100}%` }}
                ></div>
              ))}
            </div>

            {/* Day labels */}
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <div>T+0 (Analysis)</div>
              <div>T+24h (Day 1)</div>
              <div>T+48h (Day 2)</div>
              <div>T+72h (Day 3)</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
