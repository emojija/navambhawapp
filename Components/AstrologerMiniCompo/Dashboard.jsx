import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

// Responsive utility for scaling
const guidelineBaseWidth = 375; // iPhone X width
const guidelineBaseHeight = 812; // iPhone X height

const scale = (size, width) => (width / guidelineBaseWidth) * size;
const verticalScale = (size, height) => (height / guidelineBaseHeight) * size;

const Dashboard = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
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

  // Chart width for horizontal scroll
  const getChartWidth = () => {
    // Minimum width is screenWidth - 36, but for more data points, increase width
    const baseSpacing = scale(60, screenWidth); // Responsive spacing
    const minWidth = screenWidth - scale(36, screenWidth);
    const dataLength = chartData[filter].length;
    const calculatedWidth = dataLength * baseSpacing + scale(40, screenWidth); // 40 for initialSpacing
    return Math.max(minWidth, calculatedWidth);
  };

  // Responsive chart height
  const getChartHeight = () => {
    // Use a fraction of the screen height, but not too tall
    return Math.min(verticalScale(260, screenHeight), 0.35 * screenHeight);
  };

  // Responsive styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F4FF',
      paddingHorizontal: scale(12, screenWidth),
      paddingTop: verticalScale(18, screenHeight),
      paddingBottom: verticalScale(10, screenHeight),
      justifyContent: 'flex-start',
    },
    balanceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: verticalScale(16, screenHeight),
      gap: scale(10, screenWidth),
    },
    balanceCard: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: scale(14, screenWidth),
      paddingVertical: verticalScale(18, screenHeight),
      paddingHorizontal: scale(10, screenWidth),
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#F3E6F9',
      minWidth: 0,
    },
    label: {
      fontSize: scale(14, screenWidth),
      color: '#7B1FA2',
      fontWeight: '600',
      letterSpacing: 0.2,
      marginBottom: verticalScale(2, screenHeight),
    },
    amount: {
      fontSize: scale(22, screenWidth),
      fontWeight: 'bold',
      color: '#4A148C',
      letterSpacing: 0.5,
    },
    shadow: {
      shadowColor: '#7B1FA2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    chartSection: {
      width: '100%',
      alignItems: 'center',
      marginBottom: verticalScale(18, screenHeight),
    },
    chartCard: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: scale(10, screenWidth),
      borderWidth: 1,
      borderColor: '#E1BEE7',
      justifyContent: 'center',
      alignItems: 'center',
      padding: scale(10, screenWidth),
      minHeight: getChartHeight() + verticalScale(60, screenHeight),
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: verticalScale(8, screenHeight),
      gap: scale(6, screenWidth),
    },
    filterButton: {
      paddingHorizontal: scale(10, screenWidth),
      paddingVertical: verticalScale(6, screenHeight),
      borderRadius: scale(8, screenWidth),
      backgroundColor: "#ddd",
      marginHorizontal: scale(2, screenWidth),
    },
    activeFilter: { backgroundColor: "#3498db" },
    filterText: { fontSize: scale(13, screenWidth), color: "#333" },
    activeFilterText: { color: "#fff", fontWeight: "bold" },

    // Banner styles
    bannerContainer: {
      marginBottom: verticalScale(5, screenHeight),
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    bannerImage: {
      width: '100%',
      maxWidth: scale(400, screenWidth),
      height: verticalScale(150, screenHeight),
      borderRadius: scale(12, screenWidth),
      overflow: 'hidden',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    bannerImageStyle: {
      borderRadius: scale(12, screenWidth),
    },
    bannerOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.25)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bannerText: {
      color: '#fff',
      fontSize: scale(18, screenWidth),
      fontWeight: 'bold',
      textAlign: 'center',
      textShadowColor: 'rgba(0,0,0,0.4)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
      letterSpacing: 0.5,
    },
  });

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

          {/* Line Chart - Scrollable in X axis */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: verticalScale(10, screenHeight) }}
          >
            <LineChart
              data={chartData[filter]}
              curved
              width={getChartWidth()}
              height={getChartHeight()}
              thickness={2}
              color="#3498db"
              hideRules={false}
              yAxisColor="#ccc"
              xAxisColor="#ccc"
              yAxisTextStyle={{ color: '#333', fontSize: scale(12, screenWidth) }}
              xAxisLabelTextStyle={{
                color: '#333',
                fontSize: scale(13, screenWidth),
              }}
              initialSpacing={scale(20, screenWidth)}
              spacing={scale(60, screenWidth)} // Responsive, matches getChartWidth
              hideDataPoints={false}
              dataPointsHeight={scale(6, screenWidth)}
              dataPointsWidth={scale(6, screenWidth)}
              dataPointsColor="#36194f"
              startFillColor="rgba(52, 152, 219, 0.3)"
              endFillColor="rgba(52, 152, 219, 0.05)"
              startOpacity={0.9}
              endOpacity={0.2}
              xAxisLabelTexts={chartData[filter].map(item => item.label)}
              xAxisLabelWidth={scale(60, screenWidth)}
              xAxisLabelRotation={0}
              xAxisLabelsVerticalShift={scale(10, screenWidth)}
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