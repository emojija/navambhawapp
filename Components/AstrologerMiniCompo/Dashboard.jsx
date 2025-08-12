import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const screenWidth = Dimensions.get("window").width;

const Dashboard = () => {
  const totalEarnings = 12500;
  const availableBalance = 3200;
  const [filter, setFilter] = useState("Month");

  // Chart data format for Gifted Charts
  const chartData = {
    Month: [
      { value: 20, label: 'Jan' },
      { value: 45, label: 'Feb' },
      { value: 28, label: 'Mar' },
      { value: 80, label: 'Apr' },
      { value: 99, label: 'May' },
      { value: 43, label: 'Jun' },
      { value: 55, label: 'Jul' },
      { value: 60, label: 'Aug' },
      { value: 70, label: 'Sep' },
      { value: 65, label: 'Oct' },
      { value: 75, label: 'Nov' },
      { value: 90, label: 'Dec' },
    ],
    Week: [
      { value: 50, label: 'Mon' },
      { value: 20, label: 'Tue' },
      { value: 2, label: 'Wed' },
      { value: 86, label: 'Thu' },
      { value: 71, label: 'Fri' },
      { value: 100, label: 'Sat' },
      { value: 30, label: 'Sun' },
    ],
    Day: [
      { value: 30, label: '6AM' },
      { value: 60, label: '9AM' },
      { value: 40, label: '12PM' },
      { value: 80, label: '3PM' },
      { value: 20, label: '6PM' },
      { value: 90, label: '9PM' },
    ],
  };

  // Calculate chart width based on data length to enable horizontal scrolling
  const getChartWidth = () => {
    // Minimum width is screenWidth - 36, but for more data points, increase width
    const baseSpacing = 60; // Increase for more space per point
    const minWidth = screenWidth - 36;
    const dataLength = chartData[filter].length;
    const calculatedWidth = dataLength * baseSpacing + 40; // 40 for initialSpacing
    return Math.max(minWidth, calculatedWidth);
  };

  return (
    <View style={styles.container}>
      {/* Earnings Cards */}
      <View style={styles.balanceRow}>
        <View style={[styles.balanceCard, styles.shadow]}>
          <Text style={styles.label}>Total Earnings</Text>
          <Text style={styles.amount}>₹{totalEarnings.toLocaleString()}</Text>
        </View>
        <View style={[styles.balanceCard, styles.shadow]}>
          <Text style={styles.label}>Available Balance</Text>
          <Text style={[styles.amount, { color: '#388e3c' }]}>₹{availableBalance.toLocaleString()}</Text>
        </View>
      </View>

      {/* Chart Section */}
      <View style={styles.chartSection}>
        <View style={styles.chartCard}>
          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            {["Month", "Week", "Day"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.filterButton, filter === item && styles.activeFilter]}
                onPress={() => setFilter(item)}
              >
                <Text style={[styles.filterText, filter === item && styles.activeFilterText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Line Chart - Gifted Charts with horizontal scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <LineChart
              data={chartData[filter]}
              curved
              width={getChartWidth()}
              height={350}
              thickness={2}
              color="#3498db"
              hideRules={false}
              yAxisColor="#ccc"
              xAxisColor="#ccc"
              yAxisTextStyle={{ color: '#333' }}
              xAxisLabelTextStyle={{
                color: '#333',
                fontSize: 15,
              }}
              initialSpacing={20}
              spacing={60} // Match baseSpacing for consistent scroll
              hideDataPoints={false}
              dataPointsHeight={6}
              dataPointsWidth={6}
              dataPointsColor="#36194f"
              startFillColor="rgba(52, 152, 219, 0.3)"
              endFillColor="rgba(52, 152, 219, 0.05)"
              startOpacity={0.9}
              endOpacity={0.2}
              xAxisLabelTexts={chartData[filter].map(item => item.label)}
              xAxisLabelWidth={60}
              xAxisLabelRotation={0}
              xAxisLabelsVerticalShift={10}
            />
          </ScrollView>
        </View>
      </View>

      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=80',
          }}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageStyle}
          resizeMode="cover"
        >
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerText}>Watch your earnings</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4FF',
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 18,
    marginHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3E6F9',
  },
  label: {
    fontSize: 15,
    color: '#7B1FA2',
    fontWeight: '600',
    // marginBottom: 8,
    letterSpacing: 0.2,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    letterSpacing: 0.5,
  },
  shadow: {
    shadowColor: '#7B1FA2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  chartSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  chartCard: {
    // flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E1BEE7',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 18,
    padding: 13,
    // minHeight: 0, // Increased minHeight for more space
  },
  filterContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  filterButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: "#ddd", marginHorizontal: 5 },
  activeFilter: { backgroundColor: "#3498db" },
  filterText: { fontSize: 14, color: "#333" },
  activeFilterText: { color: "#fff", fontWeight: "bold" },

  // Banner styles
  bannerContainer: {
    // marginTop: 1,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    maxWidth: 400,
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bannerImageStyle: {
    borderRadius: 14,
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
});
