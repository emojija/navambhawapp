import React from "react";
import { View, Text, StyleSheet } from "react-native";

const KalsarpaSection = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Kalsarpa Dosha</Text>
      <Text>{message}</Text>
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
});

export default KalsarpaSection;
