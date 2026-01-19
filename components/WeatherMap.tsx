import { useEffect, useRef, useState } from 'react';
import { fetchGRIBData } from '../api/testApi';

interface WeatherMapProps {
  domain?: 'kenya' | 'east-africa';
  parameter: 'rainfall' | 'temp-max' | 'temp-min' | 'rh' | 'cape';
  timeStep: number;
}

interface WRFDataPoint {
  lat: number;
  lon: number;
  value: number;
  color?: string;
}

export function WeatherMap({
  domain = 'kenya',
  parameter,
  timeStep
}: WeatherMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadStatus, setLoadStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [wrfData, setWrfData] = useState<WRFDataPoint[]>([]);
  const [dataCache, setDataCache] = useState<Map<string, WRFDataPoint[]>>(new Map());
  const [isLoadingData, setIsLoadingData] = useState(false);

  async function safeFetchJSON(url: string) {
    try {
      console.log('Fetching:', url);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      console.log('Successfully fetched:', url);
      return data;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('Failed to fetch:', url, errMsg);
      setError(`Failed to load ${url}: ${errMsg}`);
      return null;
    }
  }

  // Fetch WRF data from backend with caching and batch prefetching
  useEffect(() => {
    async function fetchWRFData() {
      const cacheKey = `${domain}-${parameter}-${timeStep}`;
      
      // Check cache first
      if (dataCache.has(cacheKey)) {
        console.log('✓ Using cached data for', cacheKey);
        setWrfData(dataCache.get(cacheKey)!);
        return;
      }

      try {
        setIsLoadingData(true);
        setLoadStatus('Fetching WRF data...');
        setError(''); // Clear previous errors
        
        // Use the production-ready API with timeout
        const data = await fetchGRIBData(domain || 'kenya', parameter, timeStep);
        
        console.log('✓ WRF data received:', data.metadata?.total_points || data.points?.length, 'points');
        
        if (data.points && Array.isArray(data.points)) {
          setWrfData(data.points);
          
          // Cache the data
          setDataCache(prev => {
            const newCache = new Map(prev);
            newCache.set(cacheKey, data.points);
            // Limit cache size to prevent memory issues
            if (newCache.size > 50) {
              const firstKey = newCache.keys().next().value;
              newCache.delete(firstKey);
            }
            return newCache;
          });
          
          // Batch prefetch next 3 timesteps (non-blocking)
          setTimeout(() => batchPrefetch(), 100);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        console.error('✗ Error fetching WRF data:', err);
        const errorMsg = err instanceof Error ? err.message : String(err);
        setError(errorMsg);
        setWrfData([]);
        
        // Show helpful error message
        if (errorMsg.includes('timeout')) {
          setError('Request timed out. Server may be processing data. Please try again.');
        } else if (errorMsg.includes('404')) {
          setError('Data not available for this timestep. Try a different time or check if data has been fetched.');
        } else if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError')) {
          setError('Cannot connect to server. Please check your internet connection.');
        }
      } finally {
        setIsLoadingData(false);
      }
    }

    async function batchPrefetch() {
      const prefetchSteps = [1, 2, 3]
        .map(offset => timeStep + offset)
        .filter(step => step <= 24); // Max 72 hours / 3 = 24 steps
      
      for (const step of prefetchSteps) {
        const nextCacheKey = `${domain}-${parameter}-${step}`;
        if (dataCache.has(nextCacheKey)) continue;
        
        try {
          const data = await fetchGRIBData(domain || 'kenya', parameter, step);
          
          if (data.points && Array.isArray(data.points)) {
            setDataCache(prev => {
              const newCache = new Map(prev);
              newCache.set(nextCacheKey, data.points);
              // Limit cache size
              if (newCache.size > 50) {
                const firstKey = newCache.keys().next().value;
                newCache.delete(firstKey);
              }
              return newCache;
            });
            console.log('✓ Prefetched timestep', step);
          }
        } catch (err) {
          console.log('✗ Prefetch failed for timestep', step);
          break; // Stop prefetching if one fails
        }
      }
    }

    fetchWRFData();
  }, [domain, parameter, timeStep, dataCache]);

  useEffect(() => {
    let isCancelled = false;
    setError('');
    setLoadStatus('Loading map...');

    async function draw() {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) {
        setLoadStatus('Canvas not ready');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setLoadStatus('Could not get canvas context');
        return;
      }

      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        setLoadStatus('Container has no size');
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#e8f4f8';
      ctx.fillRect(0, 0, rect.width, rect.height);

      console.log('Drawing domain:', domain);

      // Initialize bounds
      let bounds =
        domain === 'kenya'
          ? { minLon: 33.0, maxLon: 44.0, minLat: -5.2, maxLat: 5.5 }
          : { minLon: Infinity, maxLon: -Infinity, minLat: Infinity, maxLat: -Infinity };

      // Function to convert lon/lat to canvas coordinates
      let lonToX = (lon: number) =>
        ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * rect.width;
      let latToY = (lat: number) =>
        ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * rect.height;

      if (domain === 'kenya') {
        setLoadStatus('Loading Kenya map...');

        const ocean = await safeFetchJSON('/geo/kenya/kenya_ocean.geojson');
        if (ocean && !isCancelled) {
          drawGeoJSON(ctx, ocean, lonToX, latToY, { fill: '#cfe9f6', stroke: '#0ea5e9', width: 1 });
        }

        const lakes = await safeFetchJSON('/geo/kenya/kenya_lakes.geojson');
        if (lakes && !isCancelled) {
          drawGeoJSON(ctx, lakes, lonToX, latToY, { fill: '#bae6fd', stroke: '#0ea5e9', width: 0.5 });
        }

        const counties = await safeFetchJSON('/geo/kenya/kenya_counties.geojson');
        if (counties && !isCancelled) {
          drawGeoJSON(ctx, counties, lonToX, latToY, { stroke: '#64748b', width: 1 });
        }

        const boundary = await safeFetchJSON('/geo/kenya/kenya_boundary.geojson');
        
        // Draw WRF data with clipping to Kenya boundary
        if (wrfData.length > 0 && !isCancelled && boundary) {
          ctx.save();
          createClippingPath(ctx, boundary, lonToX, latToY);
          ctx.clip();
          drawWRFData(ctx, wrfData, lonToX, latToY, parameter);
          ctx.restore();
        }
        
        // Draw boundary on top
        if (boundary && !isCancelled) {
          drawGeoJSON(ctx, boundary, lonToX, latToY, { stroke: '#020617', width: 2.5 });
        }

        drawCoordinateLabels(ctx, rect.width, rect.height, bounds, lonToX, latToY);
        setLoadStatus('Kenya map loaded');
        return;
      }

      // East Africa
      if (domain === 'east-africa') {
        setLoadStatus('Loading East Africa countries...');
        
        const countriesList = [
          'gadm36_TZA_0',
          'gadm36_UGA_0',
          'gadm36_RWA_0',
          'gadm36_BDI_0',
          'gadm36_SOM_0',
          'gadm36_ETH_0',
          'gadm36_SSD_0',
        ];

        const allGeo: any[] = [];
        let successCount = 0;

        // Load Kenya boundary
        const kenyaBoundary = await safeFetchJSON('/geo/kenya/kenya_boundary.geojson');
        if (kenyaBoundary && !isCancelled) {
          console.log('Kenya boundary loaded for East Africa view');
          allGeo.push({ data: kenyaBoundary, type: 'country' });
          successCount++;
        }

        // Fetch all other countries
        for (const country of countriesList) {
          if (isCancelled) break;
          
          setLoadStatus(`Loading ${country}... (${successCount}/${countriesList.length + 1})`);
          const geo = await safeFetchJSON(`/geo/east_africa/${country}.geojson`);
          
          if (geo && !isCancelled) {
            successCount++;
            allGeo.push({ data: geo, type: 'country' });

            // Compute bounds from geometries
            const items = geo.features || (geo.geometries ? geo.geometries.map((g: any) => ({ geometry: g })) : []);
            items.forEach((f: any) => {
              const g = f.geometry || f;
              if (!g) return;

              const processRing = (ring: any[]) => {
                if (!Array.isArray(ring)) return;
                ring.forEach((coord: any) => {
                  if (!Array.isArray(coord) || coord.length < 2) return;
                  const lon = Number(coord[0]);
                  const lat = Number(coord[1]);
                  if (isFinite(lon) && isFinite(lat)) {
                    if (!isFinite(bounds.minLon) || lon < bounds.minLon) bounds.minLon = lon;
                    if (!isFinite(bounds.maxLon) || lon > bounds.maxLon) bounds.maxLon = lon;
                    if (!isFinite(bounds.minLat) || lat < bounds.minLat) bounds.minLat = lat;
                    if (!isFinite(bounds.maxLat) || lat > bounds.maxLat) bounds.maxLat = lat;
                  }
                });
              };

              if (g.type === 'Polygon' && Array.isArray(g.coordinates)) {
                g.coordinates.forEach(processRing);
              } else if (g.type === 'MultiPolygon' && Array.isArray(g.coordinates)) {
                g.coordinates.forEach((p: any) => {
                  if (Array.isArray(p)) p.forEach(processRing);
                });
              }
            });
          }
        }

        if (allGeo.length === 0) {
          setError('No countries loaded successfully. Check file paths and console for details.');
          setLoadStatus('Failed to load any countries');
          return;
        }

        // Check if bounds are valid
        if (!isFinite(bounds.minLon) || !isFinite(bounds.maxLon) || 
            !isFinite(bounds.minLat) || !isFinite(bounds.maxLat)) {
          setError(`Failed to compute valid bounds: ${JSON.stringify(bounds)}`);
          setLoadStatus('Invalid bounds');
          return;
        }

        // Add padding to bounds (5% on each side)
        const lonRange = bounds.maxLon - bounds.minLon;
        const latRange = bounds.maxLat - bounds.minLat;
        bounds.minLon -= lonRange * 0.05;
        bounds.maxLon += lonRange * 0.05;
        bounds.minLat -= latRange * 0.05;
        bounds.maxLat += latRange * 0.05;

        setLoadStatus(`Loaded ${successCount}/${countriesList.length + 1} countries. Drawing...`);

        // Redefine coordinate converters with final bounds
        lonToX = (lon: number) =>
          ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * rect.width;
        latToY = (lat: number) =>
          ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * rect.height;

        // Clear and redraw with proper bounds
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = '#e8f4f8';
        ctx.fillRect(0, 0, rect.width, rect.height);

        // Draw all countries
        allGeo.filter(item => item.type === 'country').forEach((item) => {
          drawGeoJSON(ctx, item.data, lonToX, latToY, { 
            stroke: '#020617', 
            width: 1.5, 
            fill: '#e8f4f8' 
          });
        });

        // Draw WRF data with clipping
        if (wrfData.length > 0 && !isCancelled) {
          ctx.save();
          allGeo.filter(item => item.type === 'country').forEach((item) => {
            createClippingPath(ctx, item.data, lonToX, latToY);
          });
          ctx.clip();
          drawWRFData(ctx, wrfData, lonToX, latToY, parameter);
          ctx.restore();
          
          // Redraw borders on top
          allGeo.filter(item => item.type === 'country').forEach((item) => {
            drawGeoJSON(ctx, item.data, lonToX, latToY, { 
              stroke: '#020617', 
              width: 1.5
            });
          });
        }

        drawCoordinateLabels(ctx, rect.width, rect.height, bounds, lonToX, latToY);
        setLoadStatus(`East Africa map loaded (${successCount} countries)`);
      }
    }

    draw();

    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(draw, 100) as unknown as number;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      isCancelled = true;
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [domain, parameter, timeStep, wrfData]);

  return (
    // CHANGE: Improved aspect ratio - better vertical space for both domains
    <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      {/* CHANGE: Both domains now taller with better proportions */}
      <div 
        ref={containerRef} 
        className={`relative mx-auto rounded-xl overflow-hidden shadow-2xl border border-slate-200 ${
          domain === 'kenya' 
            ? 'max-w-3xl h-[650px]'  // Taller for Kenya's vertical orientation
            : 'max-w-4xl h-[620px]'  // Slightly taller and narrower for East Africa (cautious adjustment)
        }`}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* CHANGE: Reduced padding and font sizes for all overlays */}
        {/* Domain Label */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md z-[1000]">
          <div className="text-[9px] text-slate-500">Domain</div>
          <div className="text-[11px] font-medium">{domain === 'kenya' ? 'Kenya (3km)' : 'East Africa (9km)'}</div>
        </div>
        
        {/* Parameter Label */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md text-[9px] text-slate-600 z-[1000]">
          <div className="font-medium">WRF Model Forecast</div>
          <div className="text-slate-500">{getParameterLabel(parameter)}</div>
        </div>

        {/* Status/Error Display */}
        {(loadStatus || error) && (
          <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md z-[1000] max-w-md">
            {error && (
              <div className="text-[9px] text-red-600 mb-0.5 font-medium">⚠️ {error}</div>
            )}
            {loadStatus && !error && (
              <div className="text-[9px] text-slate-600">{loadStatus}</div>
            )}
          </div>
        )}
        
        {/* Loading Indicator */}
        {isLoadingData && (
          <div className="absolute top-14 right-2 bg-blue-600/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-md z-[1000]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-[9px] text-white font-medium">Loading data...</span>
            </div>
          </div>
        )}
        
        {/* No Data Warning */}
        {!isLoadingData && wrfData.length === 0 && !error && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-50 border border-yellow-200 px-4 py-2.5 rounded-md shadow-md z-[1000]">
            <div className="text-xs text-yellow-800 font-medium mb-0.5">No forecast data available</div>
            <div className="text-[10px] text-yellow-600">
              Data may not have been fetched yet for this timestep.
            </div>
          </div>
        )}
      </div>

      {/* CHANGE: Info cards match map width for each domain */}
      <div className={`mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 ${
        domain === 'kenya' ? 'max-w-3xl' : 'max-w-4xl'
      }`}>
        {/* Model Info Card */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Model Details</h3>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Version:</span>
              <span className="font-medium text-slate-700">WRF-ARW v4.5</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Resolution:</span>
              <span className="font-medium text-slate-700">{domain === 'kenya' ? '3km' : '9km'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Physics:</span>
              <span className="font-medium text-slate-700">Thompson</span>
            </div>
          </div>
        </div>

        {/* Timestep Info Card */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Forecast Time</h3>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Timestep:</span>
              <span className="font-medium text-slate-700">{timeStep} / 24</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Hours ahead:</span>
              <span className="font-medium text-slate-700">{timeStep * 3}h</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Interval:</span>
              <span className="font-medium text-slate-700">3-hourly</span>
            </div>
          </div>
        </div>

        {/* Data Info Card */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Data Status</h3>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Points loaded:</span>
              <span className="font-medium text-slate-700">{wrfData.length.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Cache size:</span>
              <span className="font-medium text-slate-700">{dataCache.size} timesteps</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Status:</span>
              <span className={`font-medium ${isLoadingData ? 'text-blue-600' : wrfData.length > 0 ? 'text-green-600' : 'text-slate-700'}`}>
                {isLoadingData ? 'Loading...' : wrfData.length > 0 ? 'Ready' : 'No data'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Seamless weather data rendering
function drawWRFData(
  ctx: CanvasRenderingContext2D,
  data: WRFDataPoint[],
  lonToX: (lon: number) => number,
  latToY: (lat: number) => number,
  parameter: string
) {
  if (data.length === 0) return;

  console.log('Drawing weather data:', data.length, 'points');

  const values = data.map(d => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  console.log(`Value range: ${minVal.toFixed(2)} to ${maxVal.toFixed(2)}`);

  // Convert to screen coordinates
  const screenPoints = data.map(point => ({
    x: lonToX(point.lon),
    y: latToY(point.lat),
    value: point.value,
    color: point.color || getDataColor((point.value - minVal) / (maxVal - minVal), parameter)
  }));

  // Create off-screen canvas for layering
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = ctx.canvas.width;
  tempCanvas.height = ctx.canvas.height;
  const tempCtx = tempCanvas.getContext('2d', { alpha: true });
  if (!tempCtx) return;

  tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
  tempCtx.globalCompositeOperation = 'screen';

  // Draw radial gradients
  const radius = 70;
  
  screenPoints.forEach(point => {
    const gradient = tempCtx.createRadialGradient(
      point.x, point.y, 0,
      point.x, point.y, radius
    );
    
    const rgb = hexToRgb(point.color);
    if (!rgb) return;
    
    gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
    gradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`);
    gradient.addColorStop(0.6, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
    gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
    
    tempCtx.fillStyle = gradient;
    tempCtx.fillRect(point.x - radius, point.y - radius, radius * 2, radius * 2);
  });

  tempCtx.globalCompositeOperation = 'source-over';

  // Multi-stage blur
  const blurCanvas = document.createElement('canvas');
  blurCanvas.width = tempCanvas.width;
  blurCanvas.height = tempCanvas.height;
  const blurCtx = blurCanvas.getContext('2d');
  
  if (blurCtx) {
    blurCtx.filter = 'blur(15px)';
    blurCtx.drawImage(tempCanvas, 0, 0);
    blurCtx.filter = 'blur(10px)';
    blurCtx.drawImage(blurCanvas, 0, 0);
    blurCtx.filter = 'blur(5px)';
    blurCtx.drawImage(blurCanvas, 0, 0);
  }

  // Draw to main canvas
  ctx.globalAlpha = 0.85;
  ctx.drawImage(blurCanvas, 0, 0);
  ctx.globalAlpha = 1;

  console.log(`Drew seamless gradient with ${data.length} points`);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getDataColor(normalized: number, parameter: string): string {
  // KMD Official Color Standard - exact RGB values from documentation
  if (parameter === 'rainfall') {
    // Rainfall color ranges based on KMD standard
    if (normalized < 0.125) return 'rgb(255, 255, 255)';      // < 1mm - WHITE
    if (normalized < 0.25) return 'rgb(211, 255, 190)';       // 2-10mm
    if (normalized < 0.375) return 'rgb(85, 255, 0)';         // 11-20mm
    if (normalized < 0.5) return 'rgb(115, 223, 255)';        // 21-50mm
    if (normalized < 0.625) return 'rgb(0, 170, 223)';        // 51-70mm
    if (normalized < 0.75) return 'rgb(255, 170, 0)';         // 71-100mm
    if (normalized < 0.875) return 'rgb(255, 0, 0)';          // 101-120mm
    return 'rgb(255, 0, 230)';                                 // >121mm - Magenta
  } else if (parameter === 'temp-max') {
    // Max temperature based on KMD standard
    if (normalized < 0.167) return 'rgb(0, 230, 0)';          // 0-15°C
    if (normalized < 0.333) return 'rgb(152, 230, 0)';        // 16-20°C
    if (normalized < 0.5) return 'rgb(230, 230, 0)';          // 21-25°C
    if (normalized < 0.667) return 'rgb(255, 170, 0)';        // 26-30°C
    if (normalized < 0.833) return 'rgb(255, 90, 0)';         // 31-35°C
    return 'rgb(192, 0, 0)';                                   // >36°C
  } else if (parameter === 'temp-min') {
    // Min temperature based on KMD standard
    if (normalized < 0.167) return 'rgb(0, 0, 107)';          // <5°C
    if (normalized < 0.333) return 'rgb(0, 48, 255)';         // 6-10°C
    if (normalized < 0.5) return 'rgb(0, 168, 168)';          // 11-15°C
    if (normalized < 0.667) return 'rgb(112, 168, 0)';        // 16-20°C
    if (normalized < 0.833) return 'rgb(152, 230, 0)';        // 21-25°C
    return 'rgb(230, 230, 0)';                                 // >26°C
  } else if (parameter === 'rh') {
    // Relative humidity gradient
    if (normalized < 0.2) return 'rgb(139, 69, 19)';          // 0-20%
    if (normalized < 0.4) return 'rgb(210, 105, 30)';         // 21-40%
    if (normalized < 0.6) return 'rgb(240, 230, 140)';        // 41-60%
    if (normalized < 0.8) return 'rgb(144, 238, 144)';        // 61-80%
    return 'rgb(0, 206, 209)';                                 // 81-100%
  } else {
    // CAPE or other parameters
    const r = Math.floor(128 + normalized * 127);
    const g = Math.floor(0 + normalized * 100);
    const b = Math.floor(128 - normalized * 128);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

function createClippingPath(
  ctx: CanvasRenderingContext2D,
  geojson: any,
  lonToX: (lon: number) => number,
  latToY: (lat: number) => number
) {
  const items = geojson?.features || 
                (geojson?.geometries ? geojson.geometries.map((g: any) => ({ geometry: g })) : []);
  
  if (!items || items.length === 0) return;

  items.forEach((f: any) => {
    const g = f.geometry || f;
    if (!g) return;

    const drawRing = (ring: number[][]) => {
      if (!ring || ring.length === 0) return;
      
      ctx.beginPath();
      ring.forEach(([lon, lat], i) => {
        const x = lonToX(lon);
        const y = latToY(lat);
        if (isFinite(x) && isFinite(y)) {
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
    };

    if (g.type === 'Polygon') {
      g.coordinates.forEach((ring: number[][]) => drawRing(ring));
    } else if (g.type === 'MultiPolygon') {
      g.coordinates.forEach((polygon: number[][][]) => {
        polygon.forEach((ring: number[][]) => drawRing(ring));
      });
    }
  });
}

function drawGeoJSON(
  ctx: CanvasRenderingContext2D,
  geojson: any,
  lonToX: (lon: number) => number,
  latToY: (lat: number) => number,
  style: { stroke?: string; fill?: string; width?: number }
) {
  const items = geojson?.features || 
                (geojson?.geometries ? geojson.geometries.map((g: any) => ({ geometry: g })) : []);
  
  if (!items || items.length === 0) return;

  ctx.strokeStyle = style.stroke ?? '#1e293b';
  ctx.lineWidth = style.width ?? 1;
  if (style.fill) ctx.fillStyle = style.fill;

  items.forEach((f: any) => {
    const g = f.geometry || f;
    if (!g) return;

    const drawRing = (ring: number[][]) => {
      if (!ring || ring.length === 0) return;
      
      ctx.beginPath();
      let validPoints = 0;
      
      ring.forEach(([lon, lat], i) => {
        const x = lonToX(lon);
        const y = latToY(lat);
        
        if (isFinite(x) && isFinite(y)) {
          validPoints++;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      });
      
      if (validPoints > 0) {
        ctx.closePath();
        if (style.fill) ctx.fill();
        ctx.stroke();
      }
    };

    if (g.type === 'Polygon') {
      g.coordinates.forEach((ring: number[][]) => drawRing(ring));
    } else if (g.type === 'MultiPolygon') {
      g.coordinates.forEach((polygon: number[][][]) => {
        polygon.forEach((ring: number[][]) => drawRing(ring));
      });
    }
  });
}

// CHANGE: Reduced coordinate label font size from 9px to 8px
function drawCoordinateLabels(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bounds: any,
  lonToX: (lon: number) => number,
  latToY: (lat: number) => number
) {
  ctx.fillStyle = '#475569';
  ctx.font = '8px system-ui';

  for (let lon = Math.ceil(bounds.minLon); lon <= bounds.maxLon; lon += 4) {
    const x = lonToX(lon);
    ctx.textAlign = 'center';
    ctx.fillText(`${lon}°E`, x, height - 4);
  }

  for (let lat = Math.ceil(bounds.minLat); lat <= bounds.maxLat; lat += 4) {
    const y = latToY(lat);
    ctx.textAlign = 'right';
    const label = lat >= 0 ? `${lat}°N` : `${Math.abs(lat)}°S`;
    ctx.fillText(label, width - 4, y + 3);
  }
}

function getParameterLabel(parameter: string): string {
  const labels: Record<string, string> = {
    rainfall: 'Accumulated Rainfall (mm)',
    'temp-max': 'Maximum Temperature (°C)',
    'temp-min': 'Minimum Temperature (°C)',
    rh: 'Relative Humidity (%)',
    cape: 'CAPE (J/kg)'
  };
  return labels[parameter] || parameter;
}
