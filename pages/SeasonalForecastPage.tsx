import { ComingSoon } from '../components/ComingSoon';
import { TrendingUp } from 'lucide-react';

export function SeasonalForecastPage() {
  return (
    <ComingSoon
      title="Seasonal Forecasts"
      description="Sub-seasonal to seasonal climate predictions for long-term planning, supporting agriculture, water resource management, and disaster preparedness."
      icon={<TrendingUp className="w-12 h-12 text-white" />}
      features={[
        'Monthly and seasonal outlooks',
        'Long-range rainfall predictions',
        'Temperature anomaly forecasts',
        'Drought and flood risk assessments',
        'Agricultural season planning',
        'Water resource projections',
        'Climate pattern analysis (IOD, ENSO)',
        'Stakeholder-specific advisories'
      ]}
    />
  );
}
