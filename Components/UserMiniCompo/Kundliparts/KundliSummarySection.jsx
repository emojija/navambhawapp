import React from "react";
import { View, Text, StyleSheet } from "react-native";

const KundliSummarySection = ({ summary }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kundli Summary</Text>
      {Object.entries(summary).map(([key, val], i) => (
        <Text key={i}>{key}: {val}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  heading: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
});

export default KundliSummarySection;
