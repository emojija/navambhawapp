import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DashaSection = ({ dasha }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dasha Periods</Text>
      {dasha.map((item, i) => (
        <View key={i} style={styles.row}>
          <Text>{item.type}</Text>
          <Text>{item.planet}</Text>
          <Text>{item.start}</Text>
          <Text>{item.end}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  heading: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
});

export default DashaSection;
