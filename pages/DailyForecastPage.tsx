import { ComingSoon } from '../components/ComingSoon';
import { Sun } from 'lucide-react';

export function DailyForecastPage() {
  return (
    <ComingSoon
      title="Daily Forecasts"
      description="Comprehensive 24-hour weather forecasts with hourly breakdowns for major cities and regions across Kenya and East Africa."
      icon={<Sun className="w-12 h-12 text-white" />}
      features={[
        'Hourly temperature forecasts',
        'Precipitation probability by hour',
        'Wind speed and direction tracking',
        'UV index and sunrise/sunset times',
        'Detailed weather conditions',
        'Major cities coverage (Nairobi, Mombasa, Kisumu, Eldoret)',
        'Real-time weather updates',
        'Export to calendar apps'
      ]}
    />
  );
}
