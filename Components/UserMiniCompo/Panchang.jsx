import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'

const panchangData = {
  title: "Today's Panchang",
  location: "New Delhi, India",
  date: "8-08-2025",
  day: "Thursday",
  tithi: "Shukla Trayodashi",
  nakshatra: "Purva Shadha",
  yoga: "Priti",
  karan: "Taitil",
  sunrise: "05:46:00",
  sunset: "19:07:32",
  vedicSunrise: "05:50:02",
  vedicSunset: "19:03:30"
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;
const CARD_MAX_WIDTH = 400;

const Panchang = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => {
            if (navigation && navigation.goBack) navigation.goBack();
          }}
        >
          <ArrowLeftIcon size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.heading}>Today's Panchang</Text>
        <View style={{ width: 36 }} /> {/* Placeholder for symmetry */}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardWrapper}>
          <View style={styles.cardShadow}>
            <View style={styles.cardGradient}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardDate}>{panchangData.date}</Text>
                <Text style={styles.cardDay}>{panchangData.day}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.cardContent}>
                <View style={styles.row}>
                  <Text style={styles.label}>Location</Text>
                  <Text style={styles.value}>{panchangData.location}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Tithi</Text>
                  <Text style={styles.value}>{panchangData.tithi}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Nakshatra</Text>
                  <Text style={styles.value}>{panchangData.nakshatra}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Yoga</Text>
                  <Text style={styles.value}>{panchangData.yoga}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Karan</Text>
                  <Text style={styles.value}>{panchangData.karan}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Sunrise</Text>
                  <Text style={styles.value}>{panchangData.sunrise}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Sunset</Text>
                  <Text style={styles.value}>{panchangData.sunset}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Vedic Sunrise</Text>
                  <Text style={styles.value}>{panchangData.vedicSunrise}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Vedic Sunset</Text>
                  <Text style={styles.value}>{panchangData.vedicSunset}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => {
          // navigation && navigation.navigate('AllDatePanchang')
        }}
      >
        <Text style={styles.buttonText}>See Panchang for All Dates</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Panchang

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7fc',
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#f3d1f3',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#580A46',
    textAlign: 'center',
    letterSpacing: 0.5,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
  },
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  cardShadow: {
    width: Math.min(CARD_WIDTH, CARD_MAX_WIDTH),
    borderRadius: 22,
    backgroundColor: '#fff',
    shadowColor: '#580A46',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 18,
    elevation: 8,
  },
  cardGradient: {
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 0,
  },
  cardHeader: {
    backgroundColor: '#f7e6f7',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 20,
    fontWeight: '700',
    color: '#580A46',
    letterSpacing: 0.2,
  },
  cardDay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a05c9c',
    backgroundColor: '#f3d1f3',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  divider: {
    height: 1.5,
    backgroundColor: '#f3d1f3',
    marginHorizontal: 0,
  },
  cardContent: {
    paddingHorizontal: 28,
    paddingVertical: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#580A46',
    fontWeight: '600',
    flex: 1.2,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    flex: 1.5,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#580A46',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 10,
    marginBottom: 8,
    shadowColor: '#580A46',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
})