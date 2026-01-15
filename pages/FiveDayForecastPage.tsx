import { ComingSoon } from '../components/ComingSoon';
import { Calendar } from 'lucide-react';

export function FiveDayForecastPage() {
  return (
    <ComingSoon
      title="5-Day Forecasts"
      description="Extended medium-range forecasts with day and night conditions, precipitation probability, and atmospheric patterns for the week ahead."
      icon={<Calendar className="w-12 h-12 text-white" />}
      features={[
        'Day and night temperature ranges',
        'Daily rainfall probability and amounts',
        'Weather condition summaries',
        'Wind patterns and cloud cover',
        'Confidence levels for each day',
        'Graphical trend visualization',
        'Regional variations',
        'PDF export for reports'
      ]}
    />
  );
}
