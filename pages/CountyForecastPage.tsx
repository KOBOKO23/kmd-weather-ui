import { ComingSoon } from '../components/ComingSoon';
import { MapPin } from 'lucide-react';

export function CountyForecastPage() {
  return (
    <ComingSoon
      title="County Forecasts"
      description="Localized weather forecasts for all 47 counties in Kenya with detailed parameters, advisories, and warnings tailored to each region."
      icon={<MapPin className="w-12 h-12 text-white" />}
      features={[
        'Interactive county selection map',
        'Detailed 7-day forecasts for each county',
        'Temperature, rainfall, and wind predictions',
        'Agricultural advisories',
        'Flood and drought risk assessments',
        'Mobile-optimized county views',
        'Historical data comparison',
        'Downloadable forecast bulletins'
      ]}
    />
  );
}
