// src/screens/SettingsScreen.tsx
import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ToggleRow from "../components/ToggleRow";
import { useApp } from "../context/AppContext";
import { colors } from "../theme";

const ALL = ["business","entertainment","general","health","science","sports","technology"] as const;

export default function SettingsScreen() {
  const { units, setUnits, theme, toggleTheme, categories, setCategories } = useApp();
  const themeColors = colors[theme];
  const selected = useMemo(() => new Set(categories), [categories]);

  function toggleCategory(cat: (typeof ALL)[number]) {
    const s = new Set(selected);
    if (s.has(cat)) s.delete(cat); else s.add(cat);
    setCategories(Array.from(s) as any);
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, {color: themeColors.text }]}>Preferences</Text>

      <ToggleRow
  label={`Units: ${units === "metric" ? "Celsius (°C)" : "Fahrenheit (°F)"}`}
  value={units === "imperial"}
  onValueChange={(v) => setUnits(v ? "imperial" : "metric")}

/>


      <ToggleRow
        label={`Theme: ${theme === "dark" ? "Dark" : "Light"}`}
        value={theme === "dark"}
        onValueChange={toggleTheme}
 
      />

      <Text style={[styles.subtitle, { color: themeColors.text }]}>News Categories</Text>
      <View style={styles.chips}>
        {ALL.map(c => {
          const isSelected = selected.has(c);
          return (
            <Pressable
              key={c}
              onPress={() => toggleCategory(c)}
              style={[
                styles.chip,
                {
                  borderColor: themeColors.text,
                  backgroundColor: isSelected ? themeColors.text : themeColors.background,
                },
              ]}
            >
              <Text style={{ color: isSelected ? themeColors.background : themeColors.text }}>
                {c}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={{ color: themeColors.text, opacity: 0.7, marginTop: 12 }}>
        Tip: first selected category is used for fetching, then headlines are filtered by weather mood.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16, gap:12 },
  title:{ fontSize:20, fontWeight:"700" },
  subtitle:{ marginTop:8, fontSize:16, fontWeight:"600" },
  chips:{ flexDirection:"row", flexWrap:"wrap", gap:8, marginTop:8 },
  chip:{ paddingHorizontal:12, paddingVertical:8, borderRadius:16, borderWidth:1 },
});
