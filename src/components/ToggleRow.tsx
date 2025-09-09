// src/components/ToggleRow.tsx
import React from "react";
import { View, Text, Switch } from "react-native";

export default function ToggleRow({
  label, value, onValueChange
}:{ label: string; value: boolean; onValueChange: (v:boolean)=>void }) {
  return (
    <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingVertical:12}}>
      <Text style={{fontSize:16}}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange}/>
    </View>
  );
}
