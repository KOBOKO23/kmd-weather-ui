// api/testApi.ts
// Fixed version with proper backend URL

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchDomains() {
  const response = await fetch(`${API_BASE_URL}/api/domains/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch domains: ${response.status}`);
  }
  return response.json();
}

export async function fetchParameters() {
  const response = await fetch(`${API_BASE_URL}/api/parameters/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch parameters: ${response.status}`);
  }
  return response.json();
}

export async function fetchLatestForecast() {
  const response = await fetch(`${API_BASE_URL}/api/forecasts/latest/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch latest forecast: ${response.status}`);
  }
  return response.json();
}

export async function fetchGRIBData(
  domain: string,
  parameter: string,
  timestep: number
) {
  const response = await fetch(
    `${API_BASE_URL}/api/test-grib/?domain=${domain}&parameter=${parameter}&timestep=${timestep}`
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}

export async function pingBackend() {
  const response = await fetch(`${API_BASE_URL}/api/ping/`);
  if (!response.ok) {
    throw new Error(`Backend not responding: ${response.status}`);
  }
  return response.json();
}