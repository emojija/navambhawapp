import React, { useRef, useState } from 'react';
import {  View, TextInput, Text, TouchableOpacity, StyleSheet, Platform, Image, useWindowDimensions, FlatList, KeyboardAvoidingView } from 'react-native'; 
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

// Responsive utility functions
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = (size, width) => (width / guidelineBaseWidth) * size;
const verticalScale = (size, height) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, width, factor = 0.5) =>
  size + (scale(size, width) - size) * factor;

export default function KundliForm() {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const navigation = useNavigation();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => 2025 - i);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  const genderOptions = [
    { label: 'Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const [suggestions, setSuggestions] = useState([]);
  const typingTimeoutRef = useRef(null);

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
        console.log(res.data.message.geonames)
        setSuggestions(res.data.message.geonames);

      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.log(error)
      setSuggestions([]);
    }
  };

  const styles = getStyles(SCREEN_WIDTH, SCREEN_HEIGHT);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f7f3fa' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.outerContainer}>
        {/* Banner */}
        <View style={styles.bannerWrapper}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
              }}
              style={styles.rectImage}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Get your Kundli and Birth Chart</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Kundli / Birth Chart</Text>
          <Formik
            initialValues={{
              name: '',
              gender: '',
              day: '',
              month: '',
              year: '',
              hour: '',
              min: '',
              sec: '',
              birthPlace: {
                place_name: '',
                latitude: '',
                longitude: '',
                tzone: '5.5'
              }
            }}
            onSubmit={values => {
              // Trim name and place_name
              const trimmedName = values.name ? values.name.trim() : '';
              const trimmedPlace = values.birthPlace.place_name ? values.birthPlace.place_name.trim() : '';

              // Check for empty fields
              if (
                !trimmedName ||
                !values.gender ||
                !values.day ||
                !values.month ||
                !values.year ||
                !values.hour ||
                !values.min ||
                !values.sec ||
                !trimmedPlace ||
                !values.birthPlace.latitude ||
                !values.birthPlace.longitude ||
                !values.birthPlace.tzone
              ) {
                Toast.show({
                  type: 'error',
                  text1: 'Incomplete Details',
                  text2: 'Please fill all the fields correctly.',
                });
                return;
              }

              const formData = {
                name: trimmedName,
                gender: values.gender,
                day: values.day,
                month: values.month,
                year: values.year,
                hour: values.hour,
                min: values.min,
                sec: values.sec,
                place_name: trimmedPlace,
                lat: values.birthPlace.latitude,
                lon: values.birthPlace.longitude,
                tzone: values.birthPlace.tzone
              };
              navigation.navigate('KundliResult', { KundliData: formData });
            }}
          >
            {({ handleChange, handleSubmit, handleBlur, setFieldValue, values }) => (
              <View style={styles.formGroup}>
                {/* Name Field */}
                <View style={styles.formField}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={values.name}
                    onChangeText={(text) =>
                      setFieldValue("name", text.replace(/[^a-zA-Z\s]/g, ""))
                    }
                    placeholderTextColor="#aaa"
                  />
                </View>

                {/* Gender Picker */}
                <View style={styles.formField}>
                  <Text style={styles.label}>Gender</Text>
                  <View style={styles.genderPickerWrapper}>
                    <Picker
                      selectedValue={values.gender}
                      onValueChange={itemValue => setFieldValue('gender', itemValue)}
                      style={styles.genderPicker}
                      itemStyle={styles.genderPickerItem}
                      accessibilityLabel="Select Gender"
                      mode="dropdown"
                    >
                      {genderOptions.map(opt => (
                        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                      ))}
                    </Picker>
                  </View>
                </View>

                {/* Date Row */}
                <View style={styles.formField}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <View style={styles.row}>
                    <View style={[styles.pickerWrapper, styles.rowGap]}>
                      <Picker
                        selectedValue={values.day}
                        onValueChange={val => setFieldValue('day', val)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        dropdownIconColor="black"
                      >
                        <Picker.Item label="Day" value="" />
                        {days.map(d => (
                          <Picker.Item key={d} label={`${d}`} value={d} />
                        ))}
                      </Picker>
                    </View>
                    <View style={[styles.pickerWrapper, styles.rowGap]}>
                      <Picker
                        selectedValue={values.month}
                        onValueChange={val => setFieldValue('month', val)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        dropdownIconColor="black"
                      >
                        <Picker.Item label="Month" value="" />
                        {months.map(m => (
                          <Picker.Item key={m} label={`${m}`} value={m} />
                        ))}
                      </Picker>
                    </View>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={values.year}
                        onValueChange={val => setFieldValue('year', val)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        dropdownIconColor="black"
                      >
                        <Picker.Item label="Year" value="" />
                        {years.map(y => (
                          <Picker.Item key={y} label={`${y}`} value={y} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>

                {/* Time Row */}
                <View style={styles.formField}>
                  <Text style={styles.label}>Time of Birth</Text>
                  <View style={styles.row}>
                    <View style={[styles.pickerWrapper, styles.rowGap]}>
                      <Picker
                        selectedValue={values.hour}
                        onValueChange={val => setFieldValue('hour', val)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        dropdownIconColor="black"
                      >
                        <Picker.Item label="Hour" value="" />
                        {hours.map(h => (
                          <Picker.Item key={h} label={`${h}`} value={h} />
                        ))}
                      </Picker>
                    </View>
                    <View style={[styles.pickerWrapper, styles.rowGap]}>
                      <Picker
                        selectedValue={values.min}
                        onValueChange={val => setFieldValue('min', val)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        dropdownIconColor="black"
                      >
                        <Picker.Item label="Min" value="" />
                        {minutes.map(m => (
                          <Picker.Item key={m} label={`${m}`} value={m} />
                        ))}
                      </Picker>
                    </View>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={values.sec}
                        onValueChange={val => setFieldValue('sec', val)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        dropdownIconColor="black"
                      >
                        <Picker.Item label="Sec" value="" />
                        {seconds.map(s => (
                          <Picker.Item key={s} label={`${s}`} value={s} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>

                {/* Place Field */}
                <View style={styles.formField}>
                  <Text style={styles.label}>Place</Text>
                  <View style={{ position: 'relative', width: '100%' }}>
                    <TextInput
                      style={[
                        styles.input,
                        styles.placeInput,
                        suggestions.length > 0 && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
                      ]}
                      placeholder="Enter Place"
                      placeholderTextColor="#aaa"
                      value={values.birthPlace.place_name}
                      onBlur={handleBlur('birthPlace.place_name')}
                      onChangeText={text => {
                        setFieldValue('birthPlace', {
                          ...values.birthPlace,
                          place_name: text.replace(/[^a-zA-Z\s]/g, "")
                        });

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
                    {suggestions.length > 0 ? (
                      <View style={styles.options}>
                        <FlatList 
                          data={suggestions}
                          keyboardShouldPersistTaps="handled"
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              onPress={() => {
                                setFieldValue('birthPlace', {
                                  ...values.birthPlace,
                                  place_name: item.place_name,
                                  latitude: item.latitude,
                                  longitude: item.longitude
                                });
                                setSuggestions([]);
                              }}
                              style={styles.optionItem}
                            >
                              <Text style={styles.optionText}>{item.place_name}, {item.country_code}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    ) : (
                      suggestions.length === 0 && values.birthPlace.place_name.length > 0 ? (
                        <View style={styles.options}>
                          <Text style={styles.optionText}>No suggestions found</Text>
                        </View>
                      ) : null
                    )}
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.enhancedButton}
                  onPress={handleSubmit}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buttonText}>GET KUNDLI</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// Responsive styles generator
function getStyles(SCREEN_WIDTH, SCREEN_HEIGHT) {
  return StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      backgroundColor: '#fff',
      minHeight: SCREEN_HEIGHT,
    },
    outerContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      minHeight: SCREEN_HEIGHT,
    },
    bannerWrapper: {
      width: '100%',
      alignItems: 'center',
      marginTop: verticalScale(5, SCREEN_HEIGHT),
      // marginBottom: verticalScale(10, SCREEN_HEIGHT),
    },
    container: {
      marginHorizontal: '2%',
      paddingHorizontal: moderateScale(16, SCREEN_WIDTH),
      paddingTop: verticalScale(10, SCREEN_HEIGHT),
      // paddingBottom: verticalScale(30, SCREEN_HEIGHT),
      borderRadius: moderateScale(10, SCREEN_WIDTH),
      width: '96%',
      alignSelf: 'center',
      maxWidth: 500,
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      minHeight: verticalScale(300, SCREEN_HEIGHT),
    },
    title: {
      fontSize: scale(22, SCREEN_WIDTH),
      fontWeight: 'bold',
      alignSelf: 'center',
      // marginVertical: verticalScale(10, SCREEN_HEIGHT),
      color: '#4B2067',
      letterSpacing: 1,
    },
    formGroup: {
      // marginTop: verticalScale(10, SCREEN_HEIGHT),
      // marginBottom: verticalScale(10, SCREEN_HEIGHT),
    },
    formField: {
      marginBottom: verticalScale(18, SCREEN_HEIGHT),
    },
    label: {
      fontSize: scale(15, SCREEN_WIDTH),
      color: '#4B2067',
      fontWeight: '600',
      marginBottom: verticalScale(6, SCREEN_HEIGHT),
      marginLeft: moderateScale(2, SCREEN_WIDTH),
      letterSpacing: 0.2,
    },
    input: {
      borderWidth: 1,
      borderColor: '#bfa2d6',
      paddingHorizontal: moderateScale(14, SCREEN_WIDTH),
      paddingVertical: verticalScale(12, SCREEN_HEIGHT),
      borderRadius: moderateScale(8, SCREEN_WIDTH),
      backgroundColor: '#f7f3fa',
      fontSize: scale(16, SCREEN_WIDTH),
      color: '#333',
      width: '100%',
      height: verticalScale(38, SCREEN_HEIGHT), // Ensures consistent height for all inputs
    },
    // Add a style for place input to ensure it matches the name field
    placeInput: {
      height: verticalScale(38, SCREEN_HEIGHT), // Same as .input
      minHeight: verticalScale(38, SCREEN_HEIGHT),
      maxHeight: verticalScale(38, SCREEN_HEIGHT),
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: '#bfa2d6',
      borderRadius: moderateScale(8, SCREEN_WIDTH),
      flex: 1,
      marginRight: 0,
      overflow: 'hidden',
      backgroundColor: '#f7f3fa',
      minWidth: scale(80, SCREEN_WIDTH),
      height: verticalScale(35, SCREEN_HEIGHT),
      justifyContent: 'center',
    },
    genderPickerWrapper: {
      borderWidth: 1,
      borderColor: '#bfa2d6',
      borderRadius: moderateScale(8, SCREEN_WIDTH),
      backgroundColor: '#f7f3fa',
      minHeight: verticalScale(30, SCREEN_HEIGHT),
      height: verticalScale(35, SCREEN_HEIGHT),
      justifyContent: 'center',
      marginTop: 0,
      marginBottom: 0,
      width: '100%',
      overflow: 'hidden',
    },
    genderPicker: {
      width: '100%',
      color: '#333',
      fontSize: scale(16, SCREEN_WIDTH),
      height: verticalScale(44, SCREEN_HEIGHT),
      ...Platform.select({
        android: {
          paddingVertical: 0,
        },
      }),
    },
    genderPickerItem: {
      fontSize: scale(16, SCREEN_WIDTH),
      height: verticalScale(44, SCREEN_HEIGHT),
      lineHeight: verticalScale(44, SCREEN_HEIGHT),
    },
    picker: {
      height: verticalScale(44, SCREEN_HEIGHT),
      width: '100%',
      color: '#333',
      fontSize: scale(15, SCREEN_WIDTH),
    },
    pickerItem: {
      fontSize: scale(15, SCREEN_WIDTH),
      height: verticalScale(44, SCREEN_HEIGHT),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      gap: moderateScale(10, SCREEN_WIDTH),
    },
    rowGap: {
      marginRight: moderateScale(10, SCREEN_WIDTH),
    },
    gapBottom: {
      marginBottom: 0,
    },
    enhancedButton: {
      backgroundColor: '#82428f',
      borderRadius: moderateScale(10, SCREEN_WIDTH),
      paddingVertical: verticalScale(10, SCREEN_HEIGHT),
      alignItems: 'center',
      // marginTop: verticalScale(10, SCREEN_HEIGHT),
      marginBottom: verticalScale(10, SCREEN_HEIGHT),
      shadowColor: '#62419c',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 4,
      width: '100%',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: scale(18, SCREEN_WIDTH),
      letterSpacing: 1,
    },
    imageContainer: {
      alignSelf: 'center',
      width: '100%',
      maxWidth: 400,
      aspectRatio: 3.5,
      borderRadius: moderateScale(10, SCREEN_WIDTH),
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: '#eee',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      minHeight: verticalScale(60, SCREEN_HEIGHT),
      maxHeight: verticalScale(90, SCREEN_HEIGHT),
    },
    rectImage: {
      width: '100%',
      height: '100%',
      borderRadius: 0,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(76, 42, 110, 0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: moderateScale(8, SCREEN_WIDTH),
    },
    overlayText: {
      color: '#fff',
      fontSize: scale(16, SCREEN_WIDTH),
      fontWeight: 'bold',
      textAlign: 'center',
      textShadowColor: 'rgba(0,0,0,0.25)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
      letterSpacing: 0.5,
    },
    options: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#bfa2d6',
      borderTopWidth: 0,
      borderBottomLeftRadius: moderateScale(8, SCREEN_WIDTH),
      borderBottomRightRadius: moderateScale(8, SCREEN_WIDTH),
      zIndex: 10,
      maxHeight: verticalScale(120, SCREEN_HEIGHT),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    optionItem: {
      paddingVertical: verticalScale(10, SCREEN_HEIGHT),
      paddingHorizontal: moderateScale(14, SCREEN_WIDTH),
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    optionText: {
      fontSize: scale(15, SCREEN_WIDTH),
      color: '#4B2067',
    },
  });
}
