import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HoroChartSection = ({ lagnaImg, navamshaImg }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Horo Chart Details</Text>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.subHeading}>Lagna Kundli</Text>
          <Image source={{ uri: lagnaImg }} style={styles.img} />
        </View>
        <View style={styles.box}>
          <Text style={styles.subHeading}>Navamsha Kundli</Text>
          <Image source={{ uri: navamshaImg }} style={styles.img} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  heading: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  box: { flex: 1, alignItems: "center" },
  subHeading: { fontWeight: "600", marginBottom: 5 },
  img: { width: 140, height: 140, resizeMode: "contain" },
});

export default HoroChartSection;
