// src/utils/types.ts
export type Coord = { lat: number; lon: number; };
export type WeatherNow = {
  name: string;
  dt: number;
  main: { temp: number; feels_like: number; humidity: number; };
  weather: { id: number; main: string; description: string; icon: string; }[];
  wind: { speed: number; };
  sys: { country: string; };
};

export type ForecastItem = {
  dt: number;
  main: { temp: number; };
  weather: { id: number; description: string; icon: string; }[];
};

export type ForecastResponse = { list: ForecastItem[]; city: { name: string } };

export type Article = {
  title: string;
  description: string | null;
  url: string;
  urlToImage?: string | null;
  source?: { name?: string };
  publishedAt?: string;
};
