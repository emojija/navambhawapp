import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BirthDetails = ({ birthDetails }) => {
  // Defensive: handle missing or undefined birthDetails
  const data = birthDetails || {};

  // Helper to pad numbers to 2 digits
  const pad = (n) => n !== undefined && n !== null ? String(n).padStart(2, "0") : "--";

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Birth Details & Kundli</Text>
      <View style={styles.grid}>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>
            {pad(data.day)}-{pad(data.month)}-{data.year || "--"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time of Birth:</Text>
          <Text style={styles.value}>
            {pad(data.hour)}:{pad(data.minute)}:{pad(data.seconds)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Latitude:</Text>
          <Text style={styles.value}>{data.latitude || "--"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Longitude:</Text>
          <Text style={styles.value}>{data.longitude || "--"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Timezone:</Text>
          <Text style={styles.value}>{data.timezone || "--"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ayanamsha:</Text>
          <Text style={styles.value}>{data.ayanamsha || "--"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sunrise:</Text>
          <Text style={styles.value}>{data.sunrise || "--"}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sunset:</Text>
          <Text style={styles.value}>{data.sunset || "--"}</Text>
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
  heading: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  grid: {
    // Simulate a grid with vertical rows
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    minWidth: 120,
    color: "#333",
  },
  value: {
    marginLeft: 6,
    color: "#444",
  },
});

export default BirthDetails;
