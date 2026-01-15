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
        const data = await fetchGRIBData(domain, parameter, timeStep);
        
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
          const data = await fetchGRIBData(domain, parameter, step);
          
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
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Domain Label */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg z-[1000]">
        <div className="text-xs text-slate-500">Domain</div>
        <div className="text-sm font-medium">{domain === 'kenya' ? 'Kenya (3km)' : 'East Africa (9km)'}</div>
      </div>
      
      {/* Parameter Label */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-xs text-slate-600 z-[1000]">
        <div className="font-medium">WRF Model Forecast</div>
        <div className="text-slate-500">{getParameterLabel(parameter)}</div>
      </div>

      {/* Status/Error Display */}
      {(loadStatus || error) && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg z-[1000] max-w-md">
          {error && (
            <div className="text-xs text-red-600 mb-1 font-medium">⚠️ {error}</div>
          )}
          {loadStatus && !error && (
            <div className="text-xs text-slate-600">{loadStatus}</div>
          )}
        </div>
      )}
      
      {/* Loading Indicator */}
      {isLoadingData && (
        <div className="absolute top-20 right-4 bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg z-[1000]">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="text-xs text-white font-medium">Loading forecast data...</span>
          </div>
        </div>
      )}
      
      {/* No Data Warning */}
      {!isLoadingData && wrfData.length === 0 && !error && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-50 border border-yellow-200 px-6 py-4 rounded-lg shadow-lg z-[1000]">
          <div className="text-sm text-yellow-800 font-medium mb-1">No forecast data available</div>
          <div className="text-xs text-yellow-600">
            Data may not have been fetched yet for this timestep.
          </div>
        </div>
      )}
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
  if (parameter === 'rainfall') {
    const r = Math.floor(240 - normalized * 220);
    const g = Math.floor(248 - normalized * 150);
    const b = 255;
    return `rgb(${r}, ${g}, ${b})`;
  } else if (parameter === 'temp-max' || parameter === 'temp-min') {
    if (normalized < 0.5) {
      const t = normalized * 2;
      const r = Math.floor(100 + t * 155);
      const g = Math.floor(100 + t * 155);
      const b = Math.floor(255 - t * 155);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const t = (normalized - 0.5) * 2;
      const r = 255;
      const g = Math.floor(255 - t * 155);
      const b = Math.floor(100 - t * 100);
      return `rgb(${r}, ${g}, ${b})`;
    }
  } else if (parameter === 'rh') {
    if (normalized < 0.5) {
      const t = normalized * 2;
      const r = Math.floor(165 - t * 100);
      const g = Math.floor(100 + t * 155);
      const b = Math.floor(50 + t * 50);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const t = (normalized - 0.5) * 2;
      const r = Math.floor(65 - t * 50);
      const g = Math.floor(255 - t * 100);
      const b = Math.floor(100 + t * 155);
      return `rgb(${r}, ${g}, ${b})`;
    }
  } else {
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

function drawCoordinateLabels(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bounds: any,
  lonToX: (lon: number) => number,
  latToY: (lat: number) => number
) {
  ctx.fillStyle = '#475569';
  ctx.font = '10px system-ui';

  for (let lon = Math.ceil(bounds.minLon); lon <= bounds.maxLon; lon += 4) {
    const x = lonToX(lon);
    ctx.textAlign = 'center';
    ctx.fillText(`${lon}°E`, x, height - 5);
  }

  for (let lat = Math.ceil(bounds.minLat); lat <= bounds.maxLat; lat += 4) {
    const y = latToY(lat);
    ctx.textAlign = 'right';
    const label = lat >= 0 ? `${lat}°N` : `${Math.abs(lat)}°S`;
    ctx.fillText(label, width - 5, y + 3);
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