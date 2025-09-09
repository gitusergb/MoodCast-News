// src/components/WeatherCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { WeatherNow } from "../utils/types";
import { useApp } from "../context/AppContext";
import { colors } from "../theme";
type Props = {
    weather: WeatherNow;
    units: "metric" | "imperial";
  };

export default function WeatherCard({weather, units}:Props) {
    const { theme } = useApp();
    const themeColors = colors[theme];
  const icon = weather.weather?.[0]?.icon;
  const unitSymbol = units === "metric" ? "°C" : "°F";
  return (
    <View style={[styles.card, { backgroundColor: themeColors.background, borderColor: themeColors.text }]}>
      <View style={{flexDirection:"row", alignItems:"center", gap:12}}>
        {icon ? <Image style={{width:56,height:56}} source={{uri:`https://openweathermap.org/img/wn/${icon}@2x.png`}}/> : null}
        <View>
        
          <Text style={[styles.city,{ color: themeColors.text }]}>{weather.name}, {weather.sys?.country}</Text>
          <Text>{weather.weather?.[0]?.description}</Text>
        </View>
      </View>
      <Text style={[styles.temp,{ color: themeColors.text }]}>{Math.round(weather.main.temp)}{unitSymbol}</Text>
      <Text style={[styles.sub,{ color: themeColors.text }]}>Feels like {Math.round(weather.main.feels_like)}{unitSymbol} • Humidity {weather.main.humidity}% • Wind {Math.round(weather.wind.speed)} {units==="metric"?"m/s":"mph"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding:16, borderRadius:16, gap:8, elevation:2 },
  city: { fontSize:18, fontWeight:"600", marginBottom: 4, },
  temp: { fontSize:32, fontWeight:"700" , marginBottom: 4,},
  sub: { color:"#555" }
});
