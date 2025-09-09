// src/utils/filterNews.ts
import { Article } from "./types";

// Define mood by temperature (°C)
export function moodFromTempC(tempC: number): "cold"|"cool"|"hot" {
  if (tempC <= 15) return "cold";
  if (tempC >= 30) return "hot";
  return "cool";
}

// Keyword buckets (very simple heuristic)
const BUCKETS = {
  cold: [
    "recession","layoff","accident","disaster","flood","earthquake","wildfire","storm",
    "war","conflict","inflation","downturn","bankruptcy","mourning","crash","decline"
  ],
  hot: [
    "crime","attack","threat","fear","terror","fraud","scam","hack","breach","panic",
    "outbreak","epidemic","shooting","violence","arrest","kidnap","warning"
  ],
  cool: [
    "wins","victory","celebrates","record","award","breakthrough","launch","growth",
    "innovation","recovered","profit","surge","milestone","championship","festival","happy"
  ]
};

function matchesBucket(a: Article, bucket: string[]): boolean {
  const hay = `${a.title ?? ""} ${a.description ?? ""}`.toLowerCase();
  return bucket.some(k => hay.includes(k));
}

export function filterArticlesByMood(articles: Article[], mood: "cold"|"cool"|"hot"): Article[] {
  const bucket = BUCKETS[mood];
  const picked = articles.filter(a => matchesBucket(a, bucket));
  // fallback: if nothing matched, return a trimmed list so UI isn't empty
  return picked.length ? picked : articles.slice(0, 15);
}
