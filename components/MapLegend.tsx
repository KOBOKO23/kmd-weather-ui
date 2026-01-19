import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import type { Parameter } from '../types/nwp';

interface MapLegendProps {
  parameter: Parameter;
  isOpen: boolean;
  onToggle: () => void;
}

interface LegendConfig {
  title: string;
  unit: string;
  ranges: string[];
  colors: string[];
}

/**
 * OFFICIAL KMD COLOR STANDARD
 * Based on operational contours table from KMD documentation
 * 
 * Key principles:
 * - Rainfall: 0mm = WHITE (no rain visible on map)
 * - Temperatures: All areas colored (no zeros in Kenya)
 * - Exact RGB values from official standard
 */
const legendConfigs: Record<Parameter, LegendConfig> = {
  rainfall: {
    title: 'Accumulated Rainfall',
    unit: 'mm',
    ranges: ['< 1', '2-10', '11-20', '21-50', '51-70', '71-100', '101-120', '>121'],
    colors: [
      'rgb(255, 255, 255)', // < 1mm - WHITE
      'rgb(211, 255, 190)',  // 2-10mm - Light green
      'rgb(85, 255, 0)',     // 11-20mm - Green
      'rgb(115, 223, 255)',  // 21-50mm - Light blue
      'rgb(0, 170, 223)',    // 51-70mm - Blue
      'rgb(255, 170, 0)',    // 71-100mm - Orange
      'rgb(255, 0, 0)',      // 101-120mm - Red
      'rgb(255, 0, 230)',    // >121mm - Magenta
    ],
  },

  'temp-max': {
    title: 'Maximum Temperature',
    unit: '°C',
    ranges: ['0-15', '16-20', '21-25', '26-30', '31-35', '>36'],
    colors: [
      'rgb(0, 230, 0)',      // 0-15°C - Green
      'rgb(152, 230, 0)',    // 16-20°C - Light green
      'rgb(230, 230, 0)',    // 21-25°C - Yellow
      'rgb(255, 170, 0)',    // 26-30°C - Orange
      'rgb(255, 90, 0)',     // 31-35°C - Dark orange
      'rgb(192, 0, 0)',      // >36°C - Red
    ],
  },

  'temp-min': {
    title: 'Minimum Temperature',
    unit: '°C',
    ranges: ['<5', '6-10', '11-15', '16-20', '21-25', '>26'],
    colors: [
      'rgb(0, 0, 107)',      // <5°C - Dark blue
      'rgb(0, 48, 255)',     // 6-10°C - Blue
      'rgb(0, 168, 168)',    // 11-15°C - Cyan
      'rgb(112, 168, 0)',    // 16-20°C - Green
      'rgb(152, 230, 0)',    // 21-25°C - Light green
      'rgb(230, 230, 0)',    // >26°C - Yellow
    ],
  },

  rh: {
    title: 'Relative Humidity',
    unit: '%',
    ranges: ['0-20', '21-40', '41-60', '61-80', '81-100'],
    colors: [
      '#8B4513', // 0-20% - Brown (dry)
      '#D2691E', // 21-40% - Light brown
      '#F0E68C', // 41-60% - Tan
      '#90EE90', // 61-80% - Light green
      '#00CED1', // 81-100% - Cyan (wet)
    ],
  },

  cape: {
    title: 'CAPE',
    unit: 'J/kg',
    ranges: ['0-500', '501-1000', '1001-2000', '2001-3000', '3001-5000', '>5000'],
    colors: [
      '#f0f0f0', // 0-500 - Light gray (stable)
      '#ffff99', // 501-1000 - Light yellow
      '#ffcc66', // 1001-2000 - Yellow-orange
      '#ff9933', // 2001-3000 - Orange
      '#ff3333', // 3001-5000 - Red
      '#cc0000', // >5000 - Dark red (very unstable)
    ],
  },
};

export function MapLegend({ parameter, isOpen, onToggle }: MapLegendProps) {
  const config = legendConfigs[parameter];
  if (!config) return null;

  return (
    // CHANGE: Positioned at bottom-3 right-3 for tighter spacing
    <div className="absolute bottom-3 right-3 z-30">
      {/* CHANGE: Reduced button padding to px-2.5 py-1, smaller font and icons */}
      <button
        onClick={onToggle}
        className="w-full bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-md text-white px-2.5 py-1 rounded-t-md border border-slate-700/50 hover:from-slate-700/95 hover:to-slate-800/95 transition-all shadow-lg flex items-center justify-between gap-1.5"
        aria-label={isOpen ? 'Hide legend' : 'Show legend'}
      >
        <div className="flex items-center gap-1">
          <Info className="w-2.5 h-2.5 text-blue-400" />
          <span className="text-[10px] font-medium">{config.title}</span>
          <span className="text-[9px] text-slate-400">({config.unit})</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
        ) : (
          <ChevronUp className="w-2.5 h-2.5 text-slate-400" />
        )}
      </button>

      {/* Legend Content */}
      {isOpen && (
        // CHANGE: Reduced padding from p-3 to p-2
        <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md border border-slate-700/50 border-t-0 rounded-b-md shadow-xl p-2 animate-slideUp">
          {/* Special Note for Rainfall */}
          {parameter === 'rainfall' && (
            // CHANGE: Reduced margins and padding
            <div className="mb-1.5 pb-1.5 border-b border-slate-700/50">
              <div className="flex items-center gap-1 text-[9px] text-slate-400">
                <Info className="w-2 h-2" />
                <span>White areas = No rain (0 mm)</span>
              </div>
            </div>
          )}

          {/* CHANGE: Reduced gap from gap-1.5 to gap-1, made color boxes smaller */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {config.colors.map((color, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[36px] flex-shrink-0"
              >
                {/* CHANGE: Reduced color box from w-11 h-12 to w-9 h-10 */}
                <div
                  className="w-9 h-10 border-2 border-slate-700 shadow-md rounded"
                  style={{ 
                    backgroundColor: color,
                    // Add subtle border for white rainfall box
                    ...(color === 'rgb(255, 255, 255)' && { borderColor: '#cbd5e1' })
                  }}
                />

                {/* CHANGE: Reduced font size and margin */}
                <div className="text-[9px] text-slate-300 mt-0.5 whitespace-nowrap text-center font-medium">
                  {config.ranges[index]}
                </div>
              </div>
            ))}
          </div>

          {/* CHANGE: Reduced margins and font sizes for model info */}
          <div className="mt-1.5 pt-1.5 border-t border-slate-700/50">
            <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[9px]">
              <div className="flex gap-0.5">
                <span className="text-slate-400">Model:</span>
                <span className="text-white font-medium">WRF-ARW v4.5</span>
              </div>
              <div className="flex gap-0.5">
                <span className="text-slate-400">Microphysics:</span>
                <span className="text-white font-medium">Thompson</span>
              </div>
              <div className="flex gap-0.5">
                <span className="text-slate-400">Radiation:</span>
                <span className="text-white font-medium">RRTMG</span>
              </div>
            </div>
          </div>

          {/* CHANGE: Reduced margins for standard reference */}
          <div className="mt-1 pt-1 border-t border-slate-700/30">
            <div className="text-[8px] text-slate-500 text-center">
              Official KMD Operational Color Standard
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
