import React from "react";
import { View, Text, StyleSheet } from "react-native";

const KundliSummarySection = ({ planetsData }) => {
  // Defensive: planetsData may be undefined/null
  const ascendant = Array.isArray(planetsData)
    ? planetsData.find((p) => p.name === "Ascendant")
    : undefined;
  const moon = Array.isArray(planetsData)
    ? planetsData.find((p) => p.name === "Moon")
    : undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kundli Summary</Text>
      <View style={styles.list}>
        <View style={styles.listItem}>
          <Text style={styles.label}>Ascendant: </Text>
          <Text style={styles.value}>{ascendant?.sign || "N/A"}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Ascendant Lord: </Text>
          <Text style={styles.value}>{ascendant?.signLord || "N/A"}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Moon Sign: </Text>
          <Text style={styles.value}>{moon?.sign || "N/A"}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Moon Sign Lord: </Text>
          <Text style={styles.value}>{moon?.signLord || "N/A"}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Nakshatra: </Text>
          <Text style={styles.value}>{moon?.nakshatra || "N/A"}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Nakshatra Lord: </Text>
          <Text style={styles.value}>{moon?.nakshatraLord || "N/A"}</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.label}>Nakshatra Pad: </Text>
          <Text style={styles.value}>{moon?.nakshatra_pad || "N/A"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
  list: {
    marginTop: 8,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "flex-start",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    minWidth: 130,
  },
  value: {
    color: "#444",
    flex: 1,
    flexWrap: "wrap",
  },
});

export default KundliSummarySection;
