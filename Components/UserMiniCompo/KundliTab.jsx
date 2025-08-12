import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

// Responsive utility functions
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = (size, width) => (width / guidelineBaseWidth) * size;
const verticalScale = (size, height) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, width, factor = 0.5) =>
  size + (scale(size, width) - size) * factor;

export default function KundliForm() {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => 2025 - i);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  // Gender options as array for easier management
  const genderOptions = [
    { label: 'Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  // Responsive styles
  const styles = getStyles(SCREEN_WIDTH, SCREEN_HEIGHT);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.outerContainer}>
          {/* Overlayed Image Section - move banner to top */}
          <View style={styles.bannerWrapper}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
                }} // image of space
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
                birthPlace: '',
              }}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ handleChange, handleSubmit, setFieldValue, values }) => (
                <View style={styles.formGroup}>
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholderTextColor="#aaa"
                  />

                  {/* Gender Picker */}
                  <View style={[styles.pickerWrapper, styles.gapBottom, styles.genderPickerWrapper]}>
                    <Picker
                      selectedValue={values.gender}
                      onValueChange={itemValue => setFieldValue('gender', itemValue)}
                      style={styles.genderPicker}
                      itemStyle={styles.genderPickerItem}
                      accessibilityLabel="Select Gender"
                    >
                      {genderOptions.map(opt => (
                        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                      ))}
                    </Picker>
                  </View>

                  {/* Date Row */}
                  <View style={[styles.row, styles.gapBottom]}>
                    <View style={[styles.pickerWrapper, styles.rowGap]}>
                      <Picker
                        selectedValue={values.day}
                        onValueChange={val => setFieldValue('day', val)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
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
                      >
                        <Picker.Item label="Year" value="" />
                        {years.map(y => (
                          <Picker.Item key={y} label={`${y}`} value={y} />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  {/* Time Row */}
                  <View style={[styles.row, styles.gapBottom]}>
                    <View style={[styles.pickerWrapper, styles.rowGap]}>
                      <Picker
                        selectedValue={values.hour}
                        onValueChange={val => setFieldValue('hour', val)}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
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
                      >
                        <Picker.Item label="Sec" value="" />
                        {seconds.map(s => (
                          <Picker.Item key={s} label={`${s}`} value={s} />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  <TextInput
                    style={styles.input}
                    placeholder="Birth Place"
                    value={values.birthPlace}
                    onChangeText={handleChange('birthPlace')}
                    placeholderTextColor="#aaa"
                  />

                  {/* Add margin to the button to separate it from the banner */}
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
      </ScrollView>
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
      marginTop: verticalScale(18, SCREEN_HEIGHT),
      marginBottom: verticalScale(10, SCREEN_HEIGHT),
    },
    container: {
      marginHorizontal: '2%',
      paddingHorizontal: moderateScale(16, SCREEN_WIDTH),
      paddingTop: verticalScale(10, SCREEN_HEIGHT),
      paddingBottom: verticalScale(30, SCREEN_HEIGHT),
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
      marginVertical: verticalScale(10, SCREEN_HEIGHT),
      color: '#4B2067',
      letterSpacing: 1,
    },
    formGroup: {
      gap: verticalScale(10, SCREEN_HEIGHT),
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: moderateScale(14, SCREEN_WIDTH),
      paddingVertical: verticalScale(12, SCREEN_HEIGHT),
      borderRadius: moderateScale(8, SCREEN_WIDTH),
      backgroundColor: '#fff',
      fontSize: scale(16, SCREEN_WIDTH),
      color: '#333',
      width: '100%',
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: moderateScale(8, SCREEN_WIDTH),
      flex: 1,
      marginRight: moderateScale(6, SCREEN_WIDTH),
      overflow: 'hidden',
      backgroundColor: '#fff',
      ...Platform.select({
        android: {
          paddingHorizontal: moderateScale(6, SCREEN_WIDTH),
        },
      }),
      minWidth: scale(80, SCREEN_WIDTH),
    },
    genderPickerWrapper: {
      height: verticalScale(50, SCREEN_HEIGHT),
      minHeight: verticalScale(50, SCREEN_HEIGHT),
      justifyContent: 'center',
    },
    genderPicker: {
      height: verticalScale(50, SCREEN_HEIGHT),
      width: '100%',
      color: '#333',
      fontSize: scale(16, SCREEN_WIDTH),
      ...Platform.select({
        android: {
          paddingVertical: verticalScale(0, SCREEN_HEIGHT),
        },
      }),
    },
    genderPickerItem: {
      fontSize: scale(16, SCREEN_WIDTH),
      height: verticalScale(54, SCREEN_HEIGHT),
      lineHeight: verticalScale(54, SCREEN_HEIGHT),
    },
    picker: {
      height: verticalScale(40, SCREEN_HEIGHT),
      width: '100%',
      color: '#333',
      fontSize: scale(15, SCREEN_WIDTH),
    },
    pickerItem: {
      fontSize: scale(15, SCREEN_WIDTH),
      height: verticalScale(50, SCREEN_HEIGHT),
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 0,
      width: '100%',
    },
    rowGap: {
      marginRight: moderateScale(8, SCREEN_WIDTH),
    },
    gapBottom: {
      marginBottom: 0,
    },
    enhancedButton: {
      backgroundColor: '#82428f',
      borderRadius: moderateScale(10, SCREEN_WIDTH),
      paddingVertical: verticalScale(10, SCREEN_HEIGHT),
      alignItems: 'center',
      marginTop: verticalScale(20, SCREEN_HEIGHT),
      marginBottom: verticalScale(18, SCREEN_HEIGHT),
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
  });
}
