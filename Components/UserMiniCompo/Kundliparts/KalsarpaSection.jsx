import React from "react";
import { View, Text, StyleSheet } from "react-native";

const KalsarpaSection = ({ kalsarpaData }) => {
  // Fallbacks for missing data
  const present = kalsarpaData.present;
  const oneLine = kalsarpaData.one_line || "No Kalsarpa Dosha information available.";
  const type = kalsarpaData.type;
  const name = kalsarpaData.name;
  const reportHtml = kalsarpaData.report && kalsarpaData.report.report;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kalsarpa Dosha</Text>
      <View style={[
        styles.statusRow,
        present ? styles.redBg : styles.greenBg
      ]}>
        <Text style={styles.icon}>
          {present ? "\u26A0" : "\u2713"}
        </Text>
        <Text style={[
          styles.statusText,
          present ? styles.redText : styles.greenText
        ]}>
          {oneLine}
        </Text>
      </View>
      {present && (
        <>
          {type ? (
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Type: </Text>
              {type}
            </Text>
          ) : null}
          {name ? (
            <Text style={styles.detailText}>
              <Text style={styles.bold}>Name: </Text>
              {name}
            </Text>
          ) : null}
          {reportHtml ? (
            <View style={styles.reportBox}>
              <Text style={styles.reportText}>
                {/* Since React Native doesn't support raw HTML, show as plain text */}
                {reportHtml.replace(/<[^>]+>/g, '')}
              </Text>
            </View>
          ) : null}
        </>
      )}
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
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    flex: 1,
    flexWrap: "wrap",
  },
  redBg: {
    backgroundColor: "#ffeaea",
  },
  greenBg: {
    backgroundColor: "#eaffea",
  },
  redText: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  greenText: {
    color: "#388e3c",
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 15,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  reportBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
    padding: 10,
    marginTop: 6,
  },
  reportText: {
    fontSize: 14,
    color: "#333",
  },
});

export default KalsarpaSection;
