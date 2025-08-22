import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExtraBirthDetails = ({ astroKundliDetails }) => {
  // Fix: Use astroKundliDetails instead of undefined 'details'
  const details = astroKundliDetails || {};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Birth Details</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>
          <Text style={styles.label}>Varna: </Text>
          {details.Varna || 'N/A'}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.label}>Vashya: </Text>
          {details.Vashya || 'N/A'}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.label}>Yoni: </Text>
          {details.Yoni || 'N/A'}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.label}>Gan: </Text>
          {details.Gan || 'N/A'}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.label}>Nadi: </Text>
          {details.Nadi || 'N/A'}
        </Text>
        <Text style={styles.listItem}>
          <Text style={styles.label}>Tatva: </Text>
          {details.Tatva || details.tatva || 'N/A'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  heading: { fontWeight: "bold", fontSize: 18, marginBottom: 8 },
  listContainer: { marginLeft: 10 },
  listItem: { fontSize: 16, marginBottom: 4 },
  label: { fontWeight: "bold" },
});

export default ExtraBirthDetails;
