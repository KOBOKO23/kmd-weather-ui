import { ComingSoon } from '../components/ComingSoon';
import { BarChart3 } from 'lucide-react';

export function SevenDayForecastPage() {
  return (
    <ComingSoon
      title="7-Day Forecasts"
      description="Week-ahead weather outlook for planning agriculture, events, and operations with comprehensive temperature and rainfall trend analysis."
      icon={<BarChart3 className="w-12 h-12 text-white" />}
      features={[
        'Full week temperature trends',
        'Rainfall accumulation forecasts',
        'Weekly weather pattern analysis',
        'Agricultural planning insights',
        'Event planning recommendations',
        'Historical comparison charts',
        'Ensemble model integration',
        'Automated alert notifications'
      ]}
    />
  );
}
