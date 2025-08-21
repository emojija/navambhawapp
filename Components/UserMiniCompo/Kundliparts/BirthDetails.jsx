import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BirthDetails = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Birth Details & Kundli</Text>
      <Text>Date of Birth: {data.dob}</Text>
      <Text>Time of Birth: {data.time}</Text>
      <Text>Latitude: {data.lat}</Text>
      <Text>Longitude: {data.lon}</Text>
      <Text>Timezone: {data.timezone}</Text>
      <Text>Sunrise: {data.sunrise}</Text>
      <Text>Sunset: {data.sunset}</Text>
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

export default BirthDetails;
