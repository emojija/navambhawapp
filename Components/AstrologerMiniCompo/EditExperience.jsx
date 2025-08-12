import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeftIcon, ShieldCheckIcon } from 'react-native-heroicons/outline';

const PURPLE = '#8e24aa';
const LIGHT_PURPLE = '#f3e5f5';

// Example options for specialization and language
const SPECIALIZATION_OPTIONS = [
  { label: 'Vedic Astrology', value: 'vedic' },
  { label: 'Tarot Reading', value: 'tarot' },
  { label: 'Numerology', value: 'numerology' },
  { label: 'Palmistry', value: 'palmistry' },
  { label: 'Face Reading', value: 'face' },
  { label: 'KP Astrology', value: 'kp' },
  { label: 'Lal Kitab', value: 'lalkitab' },
  { label: 'Nadi Astrology', value: 'nadi' },
  { label: 'Western Astrology', value: 'western' },
];

const LANGUAGE_OPTIONS = [
  { label: 'Hindi', value: 'hindi' },
  { label: 'English', value: 'english' },
  { label: 'Tamil', value: 'tamil' },
  { label: 'Telugu', value: 'telugu' },
  { label: 'Bengali', value: 'bengali' },
  { label: 'Gujarati', value: 'gujarati' },
  { label: 'Marathi', value: 'marathi' },
  { label: 'Punjabi', value: 'punjabi' },
  { label: 'Kannada', value: 'kannada' },
  { label: 'Malayalam', value: 'malayalam' },
  { label: 'Odia', value: 'odia' },
  { label: 'Urdu', value: 'urdu' },
];

const EditExperience = ({ navigation }) => {
  const [specialization, setSpecialization] = React.useState(SPECIALIZATION_OPTIONS[0].value);
  const [language, setLanguage] = React.useState(LANGUAGE_OPTIONS[0].value);
  const [experience, setExperience] = React.useState('');
  const [pricePerMinute, setPricePerMinute] = React.useState('');

  const handleUpdateExpertise = () => {
    // Add your update expertise logic here
    // You can use specialization, language, experience, pricePerMinute
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation && navigation.goBack && navigation.goBack()}
        >
          <ArrowLeftIcon size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Expertise</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Specialization Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Specialization</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={specialization}
                onValueChange={setSpecialization}
                style={styles.pickerLarge}
                itemStyle={styles.pickerItem}
              >
                {SPECIALIZATION_OPTIONS.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
          </View>
          {/* Language Picker */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Language</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={language}
                onValueChange={setLanguage}
                style={styles.pickerLarge}
                itemStyle={styles.pickerItem}
              >
                {LANGUAGE_OPTIONS.map(opt => (
                  <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                ))}
              </Picker>
            </View>
          </View>
          {/* Experience TextInput */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Experience (in years)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your experience (e.g. 5)"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={experience}
                onChangeText={setExperience}
                maxLength={3}
              />
            </View>
          </View>
          {/* Price Per Minute */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price Per Minute (INR)</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter price per minute"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={pricePerMinute}
                onChangeText={setPricePerMinute}
                maxLength={5}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleUpdateExpertise}>
            <Text style={styles.saveButtonText}>Update Expertise</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.secureBanner}>
        <ShieldCheckIcon size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.secureBannerText}>Your credentials are secure here</Text>
      </View>
    </SafeAreaView>
  );
};

export default EditExperience;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 18 : 0, // maintain gaping at the top
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    paddingHorizontal: 18,
    paddingBottom: 18,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 10,
    padding: 4,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  formContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 30, // add some bottom padding so banner doesn't overlap
  },
  inputGroup: {
    marginBottom: 22,
  },
  label: {
    fontSize: 15,
    color: '#222',
    marginBottom: 7,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
    borderWidth: 1,
    borderColor: '#e1bee7',
    flex: 1,
  },
  pickerWrapper: {
    backgroundColor: LIGHT_PURPLE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1bee7',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: '#222',
    fontSize: 16,
    height: 48,
  },
  pickerLarge: {
    width: '100%',
    color: '#222',
    fontSize: 16,
    height: 60, // Increased height for better touch area
  },
  pickerItem: {
    fontSize: 16,
    color: '#222',
  },
  saveButton: {
    backgroundColor: PURPLE,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  secureBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PURPLE,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // shadow for iOS
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    // elevation for Android
    elevation: 4,
  },
  secureBannerText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6,
    letterSpacing: 0.2,
  },
});