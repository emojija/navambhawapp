import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const AscendantReport = ({ ascendantReport }) => {
  if (!ascendantReport) return null;

  let reportText;
  if (typeof ascendantReport === "string") {
    reportText = ascendantReport;
  } else if (ascendantReport.report) {
    reportText = ascendantReport.report;
  } else {
    reportText = JSON.stringify(ascendantReport);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.heading, styles.centerHeading]}>
          General Ascendant Report
        </Text>
        {ascendantReport.ascendant ? (
          <Text style={styles.subheading}>
            Ascendant: {ascendantReport.ascendant}
          </Text>
        ) : null}
        <ScrollView style={styles.reportScroll}>
          <Text style={styles.reportText}>{reportText}</Text>
        </ScrollView>
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
    maxHeight: 250,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  centerHeading: {
    textAlign: "center",
  },
  subheading: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
    color: "#444",
  },
  reportScroll: {
    flexGrow: 0,
  },
  reportText: {
    fontSize: 15,
    color: "#222",
  },
});

export default AscendantReport;
