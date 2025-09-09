// src/services/weatherService.ts
import axios from "axios";
import { OPEN_WEATHER_API_KEY } from "../config";
import { Coord, ForecastResponse, WeatherNow } from "../utils/types";

const BASE = "https://api.openweathermap.org/data/2.5";

export async function getCurrentByCity(city: string, units: "metric"|"imperial"): Promise<WeatherNow> {
  const { data } = await axios.get<WeatherNow>(`${BASE}/weather`, {
    params: { q: city, units, appid: OPEN_WEATHER_API_KEY }
  });
  return data;
}

export async function getCurrentByCoords(coords: Coord, units: "metric"|"imperial"): Promise<WeatherNow> {
  const { data } = await axios.get<WeatherNow>(`${BASE}/weather`, {
    params: { lat: coords.lat, lon: coords.lon, units, appid: OPEN_WEATHER_API_KEY }
  });
  return data;
}

// OpenWeather 5-day/3-hourly; we’ll show a daily snapshot (noon) for simplicity
export async function getFiveDayForecast(city: string, units: "metric"|"imperial"): Promise<ForecastResponse> {
  const { data } = await axios.get<ForecastResponse>(`${BASE}/forecast`, {
    params: { q: city, units, appid: OPEN_WEATHER_API_KEY }
  });
  return data;
}
