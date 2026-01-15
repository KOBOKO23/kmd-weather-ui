# Kenya Meteorological Department - Numerical Weather Prediction System

A professional web interface for visualizing WRF (Weather Research and Forecasting) model products for Kenya and East Africa domains.

![KMD NWP System](https://img.shields.io/badge/Version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-blue)

## 🌍 Overview

This application provides an international-standard interface for visualizing numerical weather prediction data from the WRF-ARW v4.5 model. It supports multiple meteorological parameters across two domain configurations:

- **Kenya Domain**: ~4.5 km resolution (450 × 520 grid points)
- **East Africa Domain**: ~12 km resolution (380 × 440 grid points)

## ✨ Features

### 🎯 Core Functionality
- **Dual Domain Support**: Switch between Kenya and East Africa coverage
- **Multiple Parameters**: 
  - Rainfall Distribution (mm)
  - Maximum Temperature (°C)
  - Minimum Temperature (°C)
  - Relative Humidity (%)
  - Convective Available Potential Energy - CAPE (J/kg)
- **72-Hour Forecast**: 3-hour time steps from 09:00 EAT base time
- **Interactive Timeline**: Advanced progress bar with time markers
- **Collapsible Sidebar**: Space-efficient parameter selection
- **On-Demand Legend**: Click-to-toggle horizontal legend overlay

### 🎨 Design Features
- **Dark Professional Theme**: Modern gradient backgrounds
- **Smooth Animations**: Sidebar transitions, timeline animations
- **Glassmorphism**: Backdrop blur effects on overlays
- **Responsive Layout**: Adapts to different screen sizes
- **International Standards**: UI design competing with ECMWF/NCEP
- **Interactive Maps**: Real OpenStreetMap integration with Leaflet
- **Georeferenced Overlays**: WRF data overlaid on actual map tiles

### 🔬 Model Specifications
- **Model**: WRF-ARW v4.5
- **Dynamics**: Non-hydrostatic
- **Microphysics**: Thompson scheme
- **Radiation**: RRTMG
- **PBL Scheme**: YSU

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### Installation

1. **Clone or download this repository**

```bash
git clone <repository-url>
cd kmd-nwp-system
```

2. **Install dependencies**

```bash
npm install
```

or if you prefer yarn:

```bash
yarn install
```

3. **Start the development server**

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

4. **Open your browser**

The application will automatically open at `http://localhost:3000`

If it doesn't open automatically, navigate to that URL manually.

## 📁 Project Structure

```
kmd-nwp-system/
├── components/              # React components
│   ├── Header.tsx          # Top navigation bar
│   ├── Sidebar.tsx         # Left parameter selection panel
│   ├── MapLegend.tsx       # Bottom-right legend overlay
│   ├── TimeControl.tsx     # Timeline navigation controls
│   ├── WeatherMap.tsx      # Main map visualization canvas
│   └── figma/              # Utility components
│       └── ImageWithFallback.tsx
├── styles/                  # Stylesheets
│   └── globals.css         # Global styles and Tailwind config
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── README.md               # This file
```

## 🎮 Usage Guide

### Navigation

#### Sidebar Controls (Left)
1. **Toggle Sidebar**: Click the circular button to expand/collapse
2. **Select Domain**: Choose between Kenya or East Africa
3. **Select Parameter**: Click on any weather parameter card
4. **View Info**: Domain and forecast information displayed at bottom

#### Map Area (Center)
- Main visualization canvas displays the selected weather parameter
- Legend button appears at bottom-right corner
- Click legend button to expand/collapse color scale information

#### Timeline (Bottom)
1. **Navigation Buttons**: Use PREVIOUS/NEXT to move through time steps
2. **Time Markers**: Visual indicators every 6 hours
3. **Active Hour**: Highlighted with pulsing gradient card
4. **Progress Bar**: Shows current position in 72-hour forecast
5. **Day Labels**: Analysis, Day 1, Day 2, Day 3 markers

### Parameter Descriptions

| Parameter | Description | Unit | Color Scale |
|-----------|-------------|------|-------------|
| **Rainfall** | 3-hour accumulated precipitation | mm | White → Green → Blue → Orange → Red |
| **Temp Max** | Maximum 2-meter temperature | °C | Green → Yellow → Orange → Red |
| **Temp Min** | Minimum 2-meter temperature | °C | Dark Blue → Blue → Green → Yellow |
| **Relative Humidity** | 2-meter relative humidity | % | Brown → Tan → Cyan → Teal |
| **CAPE** | Convective Available Potential Energy | J/kg | Light Blue → Dark Blue |

### Forecast Information

- **Base Time**: 09:00 EAT (06:00 UTC)
- **Time Steps**: Every 3 hours
- **Forecast Range**: +72 hours (3 days)
- **Total Steps**: 25 time points (0h to 72h)

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run TypeScript linter
npm run lint
```

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploying

The `dist/` folder can be deployed to any static hosting service:
- **Netlify**: Drag and drop the dist folder
- **Vercel**: Connect your git repository
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload to S3 bucket with static hosting enabled

## 🎨 Customization

### Color Scales

Color scales are defined in `/components/MapLegend.tsx` and `/components/WeatherMap.tsx`. Each parameter has specific RGB values matching WRF output requirements:

```typescript
const legendConfigs: Record<Parameter, LegendConfig> = {
  'rainfall': {
    values: [0, 1, 2, 11, 21, 51, 71, 101],
    colors: ['#ffffff', '#d3ffbe', '#55ff00', '#73dfff', '#00a9e6', '#ffaa00', '#ff5a00'],
  },
  // ... other parameters
};
```

### Domain Configuration

Edit domain information in `/components/Sidebar.tsx`:

```typescript
// Kenya Domain
Coverage: Kenya
Resolution: ~4.5 km
Grid Points: 450 × 520

// East Africa Domain
Coverage: East Africa
Resolution: ~12 km
Grid Points: 380 × 440
```

### Model Information

Update model specifications in `/components/MapLegend.tsx`:

```typescript
Model: WRF-ARW v4.5
Microphysics: Thompson
Radiation: RRTMG
PBL Scheme: YSU
```

## 🔧 Integrating Real Data

Currently, the application displays a placeholder visualization. To integrate real WRF model data:

### Option 1: REST API Integration

```typescript
// In WeatherMap.tsx
const fetchModelData = async (domain, parameter, timeStep) => {
  const response = await fetch(`/api/wrf-data?domain=${domain}&param=${parameter}&time=${timeStep}`);
  const data = await response.json();
  return data;
};
```

### Option 2: Direct File Loading

```typescript
// Load NetCDF or GeoTIFF files
import * as geotiff from 'geotiff';

const loadWRFData = async (filePath) => {
  const tiff = await geotiff.fromUrl(filePath);
  const image = await tiff.getImage();
  const data = await image.readRasters();
  return data;
};
```

### Option 3: WebSocket Stream

```typescript
// Real-time data streaming
const ws = new WebSocket('ws://your-server/wrf-stream');
ws.onmessage = (event) => {
  const modelData = JSON.parse(event.data);
  updateVisualization(modelData);
};
```

## 📊 Data Format

Expected data format for visualization:

```json
{
  "domain": "kenya",
  "parameter": "rainfall",
  "timestamp": "2024-12-15T06:00:00Z",
  "forecastHour": 12,
  "grid": {
    "nx": 450,
    "ny": 520,
    "data": [[...], [...], ...]
  },
  "metadata": {
    "units": "mm",
    "min": 0,
    "max": 150
  }
}
```

## 🌐 Browser Support

- Chrome/Edge (recommended): v90+
- Firefox: v88+
- Safari: v14+
- Opera: v76+

## 📝 Technical Stack

- **Framework**: React 18.3 with TypeScript
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Build Tool**: Vite 6.0
- **Mapping**: Leaflet 1.9.4
- **Map Tiles**: OpenStreetMap
- **Canvas**: HTML5 Canvas API for weather data rendering

## 🤝 Contributing

This is a specialized application for the Kenya Meteorological Department. For modifications or enhancements:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit for review

## 📄 License

Copyright © 2024 Kenya Meteorological Department. All rights reserved.

## 👥 Credits

Developed for the Kenya Meteorological Department's Numerical Weather Prediction Section.

## 🆘 Support

For technical support or questions:
- Email: support@meteo.go.ke
- Website: https://meteo.go.ke

## 🔄 Version History

### Version 1.0.0 (Current)
- Initial release
- Dual domain support (Kenya & East Africa)
- 5 meteorological parameters
- 72-hour forecast visualization
- Interactive timeline with 3-hour steps
- Collapsible sidebar and legend
- Professional dark theme UI

## 🚧 Future Enhancements

Planned features for future releases:
- [ ] Real WRF model data integration
- [ ] Animation playback of forecast sequence
- [ ] Export functionality (PNG, GIF, Video)
- [ ] Multiple model comparison view
- [ ] Historical forecast archive
- [ ] Mobile-optimized interface
- [ ] PDF report generation
- [ ] User preference saving
- [ ] Ensemble forecast visualization
- [ ] Verification metrics display

## ⚠️ Important Notes

1. **Data Disclaimer**: This is a visualization interface. Model output is for reference. Consult official forecasts for operational decisions.

2. **Performance**: For optimal performance, use a modern browser with hardware acceleration enabled.

3. **Data Security**: This application is designed for internal use. Ensure proper authentication and authorization when deploying to production.

4. **Model Updates**: Update model version information when upgrading WRF or changing configuration.

---

**Built with ❤️ for the Kenya Meteorological Department**