import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const AscendantReport = ({ report }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>General Ascendant Report</Text>
      <ScrollView>
        <Text>{report}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2, maxHeight: 250 },
  heading: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
});

export default AscendantReport;
