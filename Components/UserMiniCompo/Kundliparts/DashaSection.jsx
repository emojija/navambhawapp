import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DashaSection = ({ dashaData }) => {
  const dashaPeriods = dashaData
    ? [
        { type: "Major", ...dashaData.major },
        { type: "Minor", ...dashaData.minor },
        { type: "Sub-Minor", ...dashaData.sub_minor },
        { type: "Sub-Sub-Minor", ...dashaData.sub_sub_minor },
      ]
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dasha Periods</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.headerCell]}>Type</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Planet</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Start</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>End</Text>
        </View>
        {/* Table Body */}
        {dashaPeriods.map((period, i) => (
          <View key={i} style={styles.tableRow}>
            {/* <Text style={styles.tableCell}>{period.planet_id}</Text> */}
            <Text style={styles.tableCell}>{period.type}</Text>
            <Text style={styles.tableCell}>{period.planet}</Text>
            <Text style={styles.tableCell}>{period.start}</Text>
            <Text style={styles.tableCell}>{period.end}</Text>
          </View>
        ))}
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
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 2,
    backgroundColor: "#fff",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    color: "#333",
    paddingVertical: 2,
  },
  headerCell: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 15,
  },
});

export default DashaSection;
