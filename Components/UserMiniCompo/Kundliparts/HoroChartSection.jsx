import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

const HoroChartSection = ({ d1Svg, d1CharData, d9Svg, d9CharDat }) => {
  // d1CharData and d9CharDat are expected to be arrays of 12 items each

  const [selectedChart, setSelectedChart] = useState("lagna"); // "lagna" or "navamsha"

  // Helper to render chart block
  const renderChartBlock = (type) => {
    const isLagna = type === "lagna";
    const svg = isLagna ? d1Svg : d9Svg;
    const charData = isLagna ? d1CharData : d9CharDat;
    const subHeading = isLagna ? "Lagna Kundli" : "Navamsha Kundli";
    const tableLabel = isLagna ? "Lagna Table" : "Navamsha Table";
    const tableLabelStyle = isLagna
      ? styles.tableLabel
      : [styles.tableLabel, styles.d9Label];

    return (
      <View style={styles.chartBlock}>
        <Text style={styles.subHeading}>{subHeading}</Text>
        {svg ? (
          <View style={styles.svgContainer}>
            <SvgXml xml={svg} width={140} height={140} />
          </View>
        ) : (
          <Text style={styles.placeholder}>No Chart Available</Text>
        )}
        {charData && charData.length === 12 && (
          <>
            <Text style={tableLabelStyle}>{tableLabel}</Text>
            <View style={styles.chartGrid}>
              {charData.map((sign, idx) => (
                <View style={styles.chartCell} key={idx}>
                  <Text style={styles.signName}>{sign.sign_name}</Text>
                  {sign.planet_small && sign.planet_small.length > 0 && (
                    <View style={styles.planetsRow}>
                      {sign.planet_small.map((p, i) => (
                        <Text style={styles.planet} key={i}>{p}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Horo Chart Details</Text>
      {/* Partition Option */}
      <View style={styles.partitionBar}>
        <TouchableOpacity
          style={[
            styles.partitionButton,
            selectedChart === "lagna" && styles.activePartitionButton,
          ]}
          onPress={() => setSelectedChart("lagna")}
        >
          <Text
            style={[
              styles.partitionText,
              selectedChart === "lagna" && styles.activePartitionText,
            ]}
          >
            Lagna
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.partitionButton,
            selectedChart === "navamsha" && styles.activePartitionButton,
          ]}
          onPress={() => setSelectedChart("navamsha")}
        >
          <Text
            style={[
              styles.partitionText,
              selectedChart === "navamsha" && styles.activePartitionText,
            ]}
          >
            Navamsha
          </Text>
        </TouchableOpacity>
      </View>
      {/* Chart Block */}
      <View style={styles.chartsRowSingle}>
        {selectedChart === "lagna"
          ? renderChartBlock("lagna")
          : renderChartBlock("navamsha")}
      </View>
    </ScrollView>
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
    marginBottom: 12,
    textAlign: "center",
  },
  // Partition styles
  partitionBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 4,
  },
  partitionButton: {
    paddingVertical: 6,
    paddingHorizontal: 22,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activePartitionButton: {
    backgroundColor: "#2a6",
    borderColor: "#2a6",
  },
  partitionText: {
    fontSize: 15,
    color: "#444",
    fontWeight: "600",
  },
  activePartitionText: {
    color: "#fff",
  },
  // Only one chart block shown at a time
  chartsRowSingle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  chartBlock: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  subHeading: {
    fontWeight: "600",
    marginBottom: 5,
    fontSize: 16,
    textAlign: "center",
  },
  svgContainer: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    color: "#aaa",
    marginBottom: 10,
    fontStyle: "italic",
  },
  tableLabel: {
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 6,
    textAlign: "center",
  },
  d9Label: {
    color: "#2a6",
  },
  chartGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 8,
  },
  chartCell: {
    width: "30%",
    minWidth: 90,
    backgroundColor: "#f7f7f7",
    borderRadius: 6,
    margin: 4,
    padding: 6,
    alignItems: "center",
    elevation: 1,
  },
  signName: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
    color: "#333",
  },
  planetsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 2,
  },
  planet: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    paddingHorizontal: 4,
    margin: 2,
    fontSize: 13,
    color: "#444",
  },
});

export default HoroChartSection;
