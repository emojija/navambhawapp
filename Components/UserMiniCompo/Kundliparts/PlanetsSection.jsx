import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PlanetsSection = ({ planets }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Planets</Text>
      <ScrollView horizontal>
        <View>
          <View style={styles.row}>
            {Object.keys(planets[0]).map((key) => (
              <Text style={[styles.cell, styles.header]} key={key}>
                {key}
              </Text>
            ))}
          </View>
          {planets.map((p, idx) => (
            <View style={styles.row} key={idx}>
              {Object.values(p).map((val, i) => (
                <Text style={styles.cell} key={i}>
                  {val}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  heading: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  row: { flexDirection: "row" },
  cell: { padding: 5, minWidth: 80, borderWidth: 0.5, borderColor: "#ddd" },
  header: { fontWeight: "bold", backgroundColor: "#f1f1f1" },
});

export default PlanetsSection;
