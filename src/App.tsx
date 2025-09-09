// src/App.tsx
import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import RootNavigator from "./navigation";
import { AppProvider, useApp } from "./context/AppContext";
import { StatusBar } from "expo-status-bar";

function ThemedNav() {
  const { theme } = useApp();
  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <RootNavigator/>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ThemedNav/>
    </AppProvider>
  );
}
