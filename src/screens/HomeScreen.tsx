// src/screens/HomeScreen.tsx
import { colors } from "../theme";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, FlatList, StyleSheet , Image } from "react-native";
import * as Location from "expo-location";
import { useApp } from "../context/AppContext";
import { getCurrentByCity, getCurrentByCoords, getFiveDayForecast } from "../services/weatherService";
import { getTopHeadlines } from "../services/newsService";
import WeatherCard from "../components/WeatherCard";
import NewsCard from "../components/NewsCard";
import { Article, WeatherNow } from "../utils/types";
import { filterArticlesByMood, moodFromTempC } from "../utils/filterNews";


export default function HomeScreen({ navigation }: any) {
  const { units, categories , theme } = useApp();
  const [cityQuery, setCityQuery] = useState("");
  const [weather, setWeather] = useState<WeatherNow | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
 
  const themeColors = colors[theme];
  async function loadByCoords() {
    setErr(null); setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") throw new Error("Location permission denied");
      const loc = await Location.getCurrentPositionAsync({});
      const w = await getCurrentByCoords({lat: loc.coords.latitude, lon: loc.coords.longitude}, units);
      setWeather(w);
      // Fetch news using the first preferred category (or none)
      const a = await getTopHeadlines("general");
      setArticles(a);
    } catch (e:any) {
      setErr(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function loadByCity(name: string) {
    setErr(null); setLoading(true);
    try {
      const w = await getCurrentByCity(name, units);
      setWeather(w);
      const a = await getTopHeadlines("general");
      setArticles(a);
    } catch (e:any) {
      setErr(e?.response?.data?.message ?? e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadByCoords(); }, [units, categories]);

  const filtered = useMemo(() => {
    if (!weather) return [];
    // Convert temp to °C if needed to keep one threshold scale
    const tempC = units === "metric" ? weather.main.temp : (weather.main.temp - 32) * 5/9;
    const mood = moodFromTempC(tempC);
    return filterArticlesByMood(articles, mood);
  }, [articles, weather, units]);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
         <View style={styles.header}>
  <Image
    source={{ uri: "https://i.ibb.co/LSzwtW8/ww.jpg" }}
    style={styles.logo}
    resizeMode="contain"
  />
  <Text style={[styles.heading, { color: themeColors.text }]}>
    MoodCast News
  </Text>
</View>
      <View style={styles.topRow}>
        <TextInput
          placeholder="Search city or zip"
          placeholderTextColor={theme === "dark" ? "#aaa" : "#555"}
          value={cityQuery}
          onChangeText={setCityQuery}
          style={[
            styles.input,
            { color: themeColors.text, borderColor: theme === "dark" ? "#666" : "#ccc" }
          ]}
        />
        <Button title="Search" onPress={() => cityQuery && loadByCity(cityQuery)}/>
        <Button title="Settings" onPress={() => navigation.navigate("Settings")}/>
      </View>

      {loading && <ActivityIndicator size="large" />}
      {err && <Text style={{color:"red"}}>{err}</Text>}

      {weather && <WeatherCard weather={weather} units={units} />}

      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>News matching today’s weather mood</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item, idx) => item.url + idx}
        contentContainerStyle={{ gap:12, paddingBottom:25}}
        renderItem={({item}) => <NewsCard a={item} source={undefined} description={undefined} urlToImage={undefined}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12, 
        marginBottom: 16,
      },
      logo: {
        width: 20,
        height: 20,
        borderRadius: 8, 
      },
      heading: {
        fontSize: 22,
        fontWeight: "700",
      },
  container:{ flex:1, padding:16, gap:12 },
  topRow:{ flexDirection:"row", gap:8, alignItems:"center" },
  input:{ flex:1, borderWidth:1, borderColor:"#ccc", borderRadius:8, paddingHorizontal:12, height:40 },
  sectionTitle:{ fontSize:18, fontWeight:"600", marginTop:8 }
});
