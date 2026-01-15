import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { NWPSystemPage } from './pages/NWPSystemPage';
import { ForecastsPage } from './pages/ForecastsPage';
import { CountyForecastPage } from './pages/CountyForecastPage';
import { DailyForecastPage } from './pages/DailyForecastPage';
import { FiveDayForecastPage } from './pages/FiveDayForecastPage';
import { SevenDayForecastPage } from './pages/SevenDayForecastPage';
import { SeasonalForecastPage } from './pages/SeasonalForecastPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* NWP System (Your existing weather interface) */}
        <Route path="/nwp-system" element={<NWPSystemPage />} />
        
        {/* Forecast Products Overview */}
        <Route path="/forecasts" element={<ForecastsPage />} />
        
        {/* Individual Forecast Pages */}
        <Route path="/counties" element={<CountyForecastPage />} />
        <Route path="/daily-forecast" element={<DailyForecastPage />} />
        <Route path="/5-day-forecast" element={<FiveDayForecastPage />} />
        <Route path="/7-day-forecast" element={<SevenDayForecastPage />} />
        <Route path="/seasonal-forecast" element={<SeasonalForecastPage />} />
      </Routes>
    </Router>
  );
}

export default App;
