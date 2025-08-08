import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, TextInput, KeyboardAvoidingView, StatusBar } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;
const CARD_MAX_WIDTH = 400;

// Helper arrays for pickers
const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const years = Array.from({ length: 101 }, (_, i) => (1925 + i).toString());
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const seconds = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

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

const Panchang = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <View style={styles.container}>
      {/* Status Bar configuration */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f9f7fc"
        translucent={false}
        animated={true}
      />
      {/* Top Bar with Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => {
            if (showForm) {
              setShowForm(false);
            } else if (navigation && navigation.goBack) {
              navigation.goBack();
            }
          }}
        >
          <ArrowLeftIcon size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.heading}>{showForm ? 'Select Panchang Date' : "Today's Panchang"}</Text>
      </View>

      {!showForm ? (
        <>
          <View style={styles.centeredContent}>
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
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => setShowForm(true)}
          >
            <Text style={styles.buttonText}>See Panchang for All Dates</Text>
          </TouchableOpacity>
        </>
      ) : (
        <KeyboardAvoidingView
          style={styles.formContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Formik
            initialValues={{
              day: '',
              month: '',
              year: '',
              hour: '',
              minute: '',
              second: '',
              place: ''
            }}
            onSubmit={values => {
              // handle submit
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
              <View style={styles.formInner}>
                {/* First row: Day, Month, Year */}
                <View style={styles.formRowHorizontal}>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Day</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={values.day}
                        onValueChange={value => setFieldValue('day', value)}
                        style={styles.pickerLarge}
                      >
                        <Picker.Item label="Day" value="" />
                        {days.map(d => (
                          <Picker.Item key={d} label={d} value={d} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Month</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={values.month}
                        onValueChange={value => setFieldValue('month', value)}
                        style={styles.pickerLarge}
                      >
                        <Picker.Item label="Month" value="" />
                        {months.map((m, idx) => (
                          <Picker.Item key={m} label={m} value={m} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Year</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={values.year}
                        onValueChange={value => setFieldValue('year', value)}
                        style={styles.pickerLarge}
                      >
                        <Picker.Item label="Year" value="" />
                        {years.map(y => (
                          <Picker.Item key={y} label={y} value={y} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
                {/* Second row: Hour, Minute, Second */}
                <View style={styles.formRowHorizontal}>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Hour</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={values.hour}
                        onValueChange={value => setFieldValue('hour', value)}
                        style={styles.pickerLarge}
                      >
                        <Picker.Item label="Hour" value="" />
                        {hours.map(h => (
                          <Picker.Item key={h} label={h} value={h} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Minute</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={values.minute}
                        onValueChange={value => setFieldValue('minute', value)}
                        style={styles.pickerLarge}
                      >
                        <Picker.Item label="Minute" value="" />
                        {minutes.map(m => (
                          <Picker.Item key={m} label={m} value={m} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.formLabel}>Second</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={values.second}
                        onValueChange={value => setFieldValue('second', value)}
                        style={styles.pickerLarge}
                      >
                        <Picker.Item label="Second" value="" />
                        {seconds.map(s => (
                          <Picker.Item key={s} label={s} value={s} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
                {/* Place row */}
                <View style={styles.formRow}>
                  <Text style={styles.formLabel}>Place</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Place"
                    onChangeText={handleChange('place')}
                    onBlur={handleBlur('place')}
                    value={values.place}
                  />
                </View>
                {/* Submit Button */}
                <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
                  <Text style={styles.formButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default Panchang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7fc',
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 16,
    justifyContent: 'flex-start',
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
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#580A46',
    textAlign: 'center',
    letterSpacing: 0.5,
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  formInner: {
    width: Math.min(CARD_WIDTH, CARD_MAX_WIDTH),
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#580A46',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 18,
    elevation: 8,
  },
  formRow: {
    marginBottom: 16,
  },
  formRowHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  formField: {
    flex: 1,
    marginHorizontal: 4,
  },
  formLabel: {
    fontSize: 16,
    color: '#580A46',
    fontWeight: '600',
    marginBottom: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#f3d1f3',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f7e6f7',
  },
  // Increased height for picker for better placeholder visibility
  picker: {
    width: '100%',
    height: 44,
    color: '#580A46',
  },
  pickerLarge: {
    width: '100%',
    height: 56, // Increased from 44 to 56 for better visibility
    color: '#580A46',
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#f3d1f3',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    backgroundColor: '#f7e6f7',
    color: '#580A46',
    marginTop: 4,
  },
  formButton: {
    backgroundColor: '#580A46',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  formButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});