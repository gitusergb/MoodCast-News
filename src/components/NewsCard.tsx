// src/components/NewsCard.tsx
import React from "react";
import { View, Text, Linking, Pressable, StyleSheet, Image } from "react-native";
import { Article } from "../utils/types";
import { useApp } from "../context/AppContext";
import { colors } from "../theme";

type Props = {
    source: any;
    description: any;
    urlToImage: any; a: Article 
};


export default function NewsCard({a}:Props) {
    const { theme } = useApp();
    const themeColors = colors[theme];
  return (
    <Pressable onPress={() => a.url && Linking.openURL(a.url)}>
      <View style={[styles.card, { backgroundColor: themeColors.background, borderColor: themeColors.text }]}>
        {a.urlToImage ? <Image source={{uri:a.urlToImage}} style={styles.img}/> : null}
        <Text style={[styles.title, { color: themeColors.text }]}>{a.title}</Text>
        {a.description ? <Text style={[styles.desc, { color: themeColors.text }]}>{a.description}</Text> : null}
        <Text style={styles.source}>{a.source?.name ?? ""}</Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card:{ padding:12, borderRadius:12, gap:6, elevation:1, borderWidth: 1, marginVertical: 8 },
  img:{ width:"100%", height:160, borderRadius:10, marginBottom:8 },
  title:{ fontSize:16, marginBottom: 6, fontWeight:"600" },
  desc:{ fontSize: 14, marginBottom: 6,},
  source:{ color:"#777", fontSize:12 }
});
