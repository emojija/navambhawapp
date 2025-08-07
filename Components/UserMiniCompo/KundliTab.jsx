import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';

// Responsive utility functions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default function KundliForm() {
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  bannerWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: verticalScale(18),
    marginBottom: verticalScale(10),
  },
  container: {
    marginHorizontal: '2%',
    paddingHorizontal: moderateScale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(30),
    // backgroundColor: 'black',
    borderRadius: moderateScale(10),
    width: '96%',
    alignSelf: 'center',
    maxWidth: 500,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: scale(22),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: verticalScale(10),
    color: '#4B2067',
    letterSpacing: 1,
  },
  formGroup: {
    gap: verticalScale(10),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    backgroundColor: '#fff',
    fontSize: scale(16),
    color: '#333',
    width: '100%',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(8),
    flex: 1,
    marginRight: moderateScale(6),
    overflow: 'hidden',
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        paddingHorizontal: moderateScale(6),
      },
    }),
    minWidth: scale(80),
  },
  genderPickerWrapper: {
    height: verticalScale(50),
    minHeight: verticalScale(50),
    justifyContent: 'center',
  },
  genderPicker: {
    height: verticalScale(50),
    width: '100%',
    color: '#333',
    fontSize: scale(16),
    ...Platform.select({
      android: {
        paddingVertical: verticalScale(),
      },
    }),
  },
  genderPickerItem: {
    fontSize: scale(16),
    height: verticalScale(54),
    lineHeight: verticalScale(54),
  },
  picker: {
    height: verticalScale(40),
    width: '100%',
    color: '#333',
    fontSize: scale(15),
  },
  pickerItem: {
    fontSize: scale(15),
    height: verticalScale(50),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    width: '100%',
  },
  rowGap: {
    marginRight: moderateScale(8),
  },
  gapBottom: {
    marginBottom: 0,
  },
  enhancedButton: {
    backgroundColor: '#82428f',
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    marginTop: verticalScale(20), // Increased margin to separate from form fields
    marginBottom: verticalScale(18), // Reduced margin to fit better with smaller banner
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
    fontSize: scale(18),
    letterSpacing: 1,
  },
  imageContainer: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 400,
    aspectRatio: 3.5, // Decreased height for the banner
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eee',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    minHeight: verticalScale(60), // Ensures banner is visible but not too tall
    maxHeight: verticalScale(90),
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
    paddingHorizontal: moderateScale(8),
  },
  overlayText: {
    color: '#fff',
    fontSize: scale(16), // Slightly smaller text for smaller banner
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
});
