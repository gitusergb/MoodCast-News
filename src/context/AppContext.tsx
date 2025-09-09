// src/context/AppContext.tsx
import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../theme";
import { Appearance } from "react-native";

type Units = "metric" | "imperial";
type ThemeMode = "light" | "dark";
type Category = "business"|"entertainment"|"general"|"health"|"science"|"sports"|"technology";

type AppState = {
  units: Units;
  theme: ThemeMode;
  categories: Category[];
  setUnits: (u: Units) => void;
  toggleTheme: () => void;
  setCategories: (c: Category[]) => void;
};

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = "@app_prefs_v1";

export const AppProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const system = Appearance.getColorScheme();
  const [units, setUnits] = useState<Units>("metric");
  const [theme, setTheme] = useState<ThemeMode>((system ?? "light") as ThemeMode);
  const [categories, setCategories] = useState<Category[]>(["general","technology","sports"]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved.units) setUnits(saved.units);
          if (saved.theme) setTheme(saved.theme);
          if (saved.categories) setCategories(saved.categories);
        }
      } catch {}
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({units, theme, categories})).catch(()=>{});
  }, [units, theme, categories]);

  
  const value = useMemo(() => ({
    units,
    theme,
    categories,
    setUnits,
    toggleTheme: () => setTheme(t => (t === "light" ? "dark" : "light")),
    setCategories
  }), [units, theme, categories]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
