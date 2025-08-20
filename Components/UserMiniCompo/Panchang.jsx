import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, TextInput, KeyboardAvoidingView, StatusBar } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Toast from 'react-native-toast-message';

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

const Loader = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 16, color: '#888' }}>Loading...</Text>
  </View>
);

const Panchang = ({ navigation }) => {
  const [showForm, setShowForm] = useState(false);
  const [panchang, setPanchang] = useState(null);
  const [isLoadPanch, setIsLoadPanch] = useState(false);

  // api calling for todays panchang 
  useEffect(() => {
    const fetchPanchang = async () => {
      setIsLoadPanch(true);
      try {
        const res = await axios.get('https://backend.navambhaw.com/v2/basic_panchang');
        if (res.data.success) {
          setPanchang(res.data.message);
        
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Panchang',
          text2: 'failed to load panchang'
        });
      }
      setIsLoadPanch(false);
    };
    fetchPanchang();
  }, []);

  // api for calling places 
    // Debounced API call for geo suggestions (updated to match Allpanchang)
    const fetchGeoDetails = useCallback(async (place) => {
      if (!place) {
        // setGeoSuggestions([]);
        return;
      }
      // setGeoLoading(true);
      // setGeoError(null);
      try {
        const res = await axios.post('https://backend.navambhaw.com/v2/geo_details', { place });
        if (res.data.success) {
          // setGeoSuggestions(res.data.message.geonames || []);
        } else {
          // setGeoError('Failed to fetch geo details.');
        }
      } catch (error) {
        // setGeoError('Failed to fetch geo details.');
      } finally {
        // setGeoLoading(false);
      }
    }, []);
    

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f9f7fc"
        translucent={false}
        animated={true}
      />
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
          <ArrowLeftIcon size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.heading}>{showForm ? 'Select Panchang Date' : "Today's Panchang"}</Text>
      </View>

      {!showForm ? (
        isLoadPanch ? (
          <Loader />
        ) : (
          panchang && (
            <>
              <View style={styles.centeredContent}>
                <View style={styles.cardShadow}>
                  <View style={styles.cardGradient}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardDate}>{panchang.date.substring(0, 10)}</Text>
                      <Text style={styles.cardDay}>{panchang.day}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.cardContent}>
                      <View style={styles.row}>
                        <Text style={styles.label}>Tithi</Text>
                        <Text style={styles.value}>{panchang.tithi}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Nakshatra</Text>
                        <Text style={styles.value}>{panchang.nakshatra}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Yoga</Text>
                        <Text style={styles.value}>{panchang.yog}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Karan</Text>
                        <Text style={styles.value}>{panchang.karan}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Sunrise</Text>
                        <Text style={styles.value}>{panchang.sunrise}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Sunset</Text>
                        <Text style={styles.value}>{panchang.sunset}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Vedic Sunrise</Text>
                        <Text style={styles.value}>{panchang.vedic_sunrise}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Vedic Sunset</Text>
                        <Text style={styles.value}>{panchang.vedic_sunset}</Text>
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
          )
        )
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
                        {months.map((m) => (
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
                <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
                  <Text style={styles.formButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default Panchang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7fc',
    paddingHorizontal: 0,
    paddingTop: 0,
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    paddingLeft: 2,
    fontWeight: 'bold',
    color: '#580A46',
    textAlign: 'left',
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
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 24,
    // marginTop: 10,
    // marginBottom: 8,
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