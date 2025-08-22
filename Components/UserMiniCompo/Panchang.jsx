import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  StatusBar,
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;
const CARD_MAX_WIDTH = 400;

// Helper arrays for pickers
const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const years = Array.from({ length: 101 }, (_, i) => (1925 + i).toString());
const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, '0'),
);
const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, '0'),
);
const seconds = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, '0'),
);

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
        const res = await axios.get(
          'https://backend.navambhaw.com/v2/basic_panchang',
        );
        if (res.data.success) {
          setPanchang(res.data.message);
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Panchang',
          text2: 'failed to load panchang',
        });
      }
      setIsLoadPanch(false);
    };
    fetchPanchang();
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const typingTimeoutRef = useRef(null); // keep track of timeout

  // Only call the geo details API for the place input field
  const fetchGeoDetails = async place => {
    if (!place || place.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.post(
        'https://backend.navambhaw.com/v2/geo_details',
        { place },
      );
      if (res.status === 200) {
        setSuggestions(res.data.message.geonames);
        // console.log("yes data is coming",res.data)
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
    }
  };

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
        <Text style={styles.heading}>
          {showForm ? 'Select Panchang Date' : "Today's Panchang"}
        </Text>
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
                      <Text style={styles.cardDate}>
                        {panchang.date.substring(0, 10)}
                      </Text>
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
                        <Text style={styles.value}>
                          {panchang.vedic_sunrise}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.label}>Vedic Sunset</Text>
                        <Text style={styles.value}>
                          {panchang.vedic_sunset}
                        </Text>
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
                <Text style={styles.buttonText}>
                  See Panchang for All Dates
                </Text>
              </TouchableOpacity>
            </>
          )
        )
      ) : (
        <KeyboardAvoidingView
          style={styles.formContainerCentered}
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
              place: '',
            }}
            onSubmit={values => {
              // handle submit
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
            }) => (
              <View style={styles.formOuterWrapper}>
                <View style={styles.formInnerCentered}>
                  {/* Date Row */}
                  <View style={[styles.formRowHorizontal, { marginBottom: 10 }]}>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Day</Text>
                      <View style={styles.pickerWrapperFixed}>
                        <Picker
                          selectedValue={values.day}
                          onValueChange={value => setFieldValue('day', value)}
                          style={styles.pickerFixed}
                          dropdownIconColor="#580A46"
                          itemStyle={styles.pickerItemStyle}
                          mode="dropdown"
                        >
                          <Picker.Item label="Day" value="" color="#aaa" />
                          {days.map(d => (
                            <Picker.Item key={d} label={d} value={d} color="#580A46" />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Month</Text>
                      <View style={styles.pickerWrapperFixed}>
                        <Picker
                          selectedValue={values.month}
                          onValueChange={value => setFieldValue('month', value)}
                          style={styles.pickerFixed}
                          dropdownIconColor="#580A46"
                          itemStyle={styles.pickerItemStyle}
                          mode="dropdown"
                        >
                          <Picker.Item label="Month" value="" color="#aaa" />
                          {months.map(m => (
                            <Picker.Item key={m} label={m} value={m} color="#580A46" />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Year</Text>
                      <View style={styles.pickerWrapperFixed}>
                        <Picker
                          selectedValue={values.year}
                          onValueChange={value => setFieldValue('year', value)}
                          style={styles.pickerFixed}
                          dropdownIconColor="#580A46"
                          itemStyle={styles.pickerItemStyle}
                          mode="dropdown"
                        >
                          <Picker.Item label="Year" value="" color="#aaa" />
                          {years.map(y => (
                            <Picker.Item key={y} label={y} value={y} color="#580A46" />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                  {/* Time Row */}
                  <View style={[styles.formRowHorizontal, { marginBottom: 10 }]}>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Hour</Text>
                      <View style={styles.pickerWrapperFixed}>
                        <Picker
                          selectedValue={values.hour}
                          onValueChange={value => setFieldValue('hour', value)}
                          style={styles.pickerFixed}
                          dropdownIconColor="#580A46"
                          itemStyle={styles.pickerItemStyle}
                          mode="dropdown"
                        >
                          <Picker.Item label="Hour" value="" color="#aaa" />
                          {hours.map(h => (
                            <Picker.Item key={h} label={h} value={h} color="#580A46" />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Minute</Text>
                      <View style={styles.pickerWrapperFixed}>
                        <Picker
                          selectedValue={values.minute}
                          onValueChange={value => setFieldValue('minute', value)}
                          style={styles.pickerFixed}
                          dropdownIconColor="#580A46"
                          itemStyle={styles.pickerItemStyle}
                          mode="dropdown"
                        >
                          <Picker.Item label="Minute" value="" color="#aaa" />
                          {minutes.map(m => (
                            <Picker.Item key={m} label={m} value={m} color="#580A46" />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.formField}>
                      <Text style={styles.formLabel}>Second</Text>
                      <View style={styles.pickerWrapperFixed}>
                        <Picker
                          selectedValue={values.second}
                          onValueChange={value => setFieldValue('second', value)}
                          style={styles.pickerFixed}
                          dropdownIconColor="#580A46"
                          itemStyle={styles.pickerItemStyle}
                          mode="dropdown"
                        >
                          <Picker.Item label="Second" value="" color="#aaa" />
                          {seconds.map(s => (
                            <Picker.Item key={s} label={s} value={s} color="#580A46" />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                  {/* Place Row */}
                  <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Place</Text>
                    <View style={{ position: 'relative', flex: 1 }}>
                      <TextInput
                        style={[
                          styles.input,
                          suggestions.length > 0 && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
                        ]}
                        placeholder="Enter Place"
                        placeholderTextColor="#aaa"
                        value={values.place}
                        onBlur={handleBlur('place')}
                        onChangeText={text => {
                          setFieldValue('place', text);

                          // debounce with setTimeout
                          if (typingTimeoutRef.current) {
                            clearTimeout(typingTimeoutRef.current);
                          }
                          typingTimeoutRef.current = setTimeout(() => {
                            fetchGeoDetails(text);
                          }, 500);
                        }}
                        returnKeyType="done"
                      />

                      {/* Suggestions dropdown */}
                      {suggestions.length > 0 && (
                        <View style={styles.options}>
                          <FlatList
                            data={suggestions}
                            keyboardShouldPersistTaps="handled"
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                onPress={() => {
                                  setFieldValue('place', item.place_name);
                                  setSuggestions([]);
                                }}
                                style={styles.optionItem}
                              >
                                <Text style={styles.optionText}>{item.place_name}</Text>
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                {/* Button placed outside the formInnerCentered to avoid overlap */}
                <View style={styles.formButtonWrapper}>
                  <TouchableOpacity
                    style={styles.formButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.formButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
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
  // Center the form vertically and horizontally
  formContainerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    minHeight: height * 0.6, // Increase form area height for more space
  },
  // Outer wrapper for form and button
  formOuterWrapper: {
    // backgroundColor:'black',
    flex: 1,
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Center the form card and fix padding
  formInnerCentered: {
    // backgroundColor:'pink',
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28, // Increased padding for more space
    shadowColor: '#580A46',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 18,
    elevation: 8,
    // alignSelf: 'center',
    // justifyContent: 'center',
    minHeight: 320, // Reduced minHeight for better fit
  },
  formRow: {
    // marginBottom: 18,
  },
  formRowHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 12,
  },
  formField: {
    flex: 1,
    marginHorizontal: 4,
    minWidth: 0,
    maxWidth: 120, // Fix picker width to prevent cropping
  },
  formLabel: {
    fontSize: 16,
    color: '#580A46',
    fontWeight: '600',
    marginBottom: 4,
  },
  // Fix picker wrapper and picker height for visibility
  pickerWrapperFixed: {
    borderWidth: 1,
    borderColor: '#f3d1f3',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f7e6f7',
    marginBottom: 0,
    height: Platform.OS === 'ios' ? 54 : 54, // Increased height for both platforms
    justifyContent: 'center',
    width: '100%',
    minWidth: 90,
    maxWidth: 120,
    alignSelf: 'stretch',
  },
  pickerFixed: {
    width: '100%',
    minWidth: 90,
    maxWidth: 120,
    height: Platform.OS === 'ios' ? 54 : 54, // Increased height for both platforms
    color: '#580A46',
    fontSize: 17,
    marginTop: 0,
    marginBottom: 0,
    paddingTop: Platform.OS === 'android' ? 0 : 8,
    paddingBottom: Platform.OS === 'android' ? 0 : 8,
  },
  pickerItemStyle: {
    fontSize: 17,
    color: '#580A46',
    height: 54,
    textAlignVertical: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#f3d1f3',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
    backgroundColor: '#f7e6f7',
    color: '#580A46',
    marginTop: 2,
    minHeight: 48,
    width: '100%',
  },
  formButtonWrapper: {
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    // Place the button outside the card, not overlapped
  },
  formButton: {
    backgroundColor: '#580A46',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  formButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  options: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f3d1f3',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 180,
    zIndex: 100,
    shadowColor: '#580A46',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#f3d1f3',
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 16,
    color: '#580A46',
  },
});
