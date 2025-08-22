import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PlanetsSection = ({ planetsData }) => {
  // Defensive: planetsData may be undefined/null or not an array
  const planets = Array.isArray(planetsData) ? planetsData : [];

  const formatDegree = (fullDegree) => {
    if (typeof fullDegree !== "number" || isNaN(fullDegree)) return "N/A";
    const degrees = Math.floor(fullDegree);
    const minutesDecimal = (fullDegree - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.round((minutesDecimal - minutes) * 60);
    return `${degrees}° ${minutes}′ ${seconds}″`;
  };

  if (!planets.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Planets</Text>
        <Text style={styles.noDataText}>No planet data available.</Text>
      </View> 
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Planets</Text>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.row}>
            <Text style={[styles.cell, styles.header]}>Planet</Text>
            <Text style={[styles.cell, styles.header]}>House</Text>
            <Text style={[styles.cell, styles.header]}>Sign</Text>
            <Text style={[styles.cell, styles.header]}>Sign Lord</Text>
            <Text style={[styles.cell, styles.header]}>Nakshatra</Text>
            <Text style={[styles.cell, styles.header]}>Pad</Text>
            <Text style={[styles.cell, styles.header]}>Naksh Lord</Text>
            <Text style={[styles.cell, styles.header]}>Degree</Text>
            <Text style={[styles.cell, styles.header]}>Retro</Text>
            <Text style={[styles.cell, styles.header]}>Combust</Text>
            <Text style={[styles.cell, styles.header]}>Avastha</Text>
          </View>
          {/* Table Body */}
          {planets.map((p, idx) => (
            <View style={styles.row} key={p.id || idx}>
              <Text style={styles.cell}>{p.name}</Text>
              <Text style={styles.cell}>{p.house}</Text>
              <Text style={styles.cell}>{p.sign}</Text>
              <Text style={styles.cell}>{p.signLord}</Text>
              <Text style={styles.cell}>{p.nakshatra}</Text>
              <Text style={styles.cell}>{p.nakshatra_pad || 'N/A'}</Text>
              <Text style={styles.cell}>{p.nakshatraLord}</Text>
              <Text style={styles.cell}>
                {formatDegree(p.normDegree)}
              </Text>
              <Text style={styles.cell}>{p.isRetro ? 'Retro' : 'Direct'}</Text>
              <Text style={styles.cell}>{p.is_planet_set ? 'Yes' : 'No'}</Text>
              <Text style={styles.cell}>{p.planet_awastha}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  row: { flexDirection: "row" },
  cell: {
    padding: 5,
    minWidth: 80,
    borderWidth: 0.5,
    borderColor: "#ddd",
    textAlign: "center",
  },
  header: { fontWeight: "bold", backgroundColor: "#f1f1f1" },
  noDataText: {
    color: "#888",
    fontStyle: "italic",
    marginTop: 10,
    textAlign: "center",
  },
});

export default PlanetsSection;
