import React, { useState } from 'react';
import {  View,  Text,  StyleSheet,  TouchableOpacity,  Image,  SafeAreaView,  TextInput,  Platform,  StatusBar,  PermissionsAndroid,  Alert,  Modal,  ScrollView } from 'react-native';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

import * as ImagePicker from 'react-native-image-picker';

const PURPLE = '#8e24aa';
const LIGHT_PURPLE = '#f3e5f5';

const defaultImage =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const EditProfile = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Request permission for Android (gallery)
  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'App needs access to your gallery to select a profile picture.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert('Permission error', err?.message || 'Unknown error');
        return false;
      }
    }
    return true;
  };

  // Request permission for Android (camera)
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take a profile picture.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert('Permission error', err?.message || 'Unknown error');
        return false;
      }
    }
    return true;
  };

  // Pick image from gallery using react-native-image-picker
  const handleImagePickGallery = async () => {
    setModalVisible(false);
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access gallery without permission.');
      return;
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      quality: 0.8,
      selectionLimit: 1,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        // User cancelled
        return;
      }
      if (response.errorCode) {
        Alert.alert('ImagePicker Error', response.errorMessage || 'Unknown error');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Take image from camera using react-native-image-picker
  const handleImagePickCamera = async () => {
    setModalVisible(false);
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Cannot access camera without permission.');
      return;
    }

    const options = {
      mediaType: 'photo',
      maxWidth: 512,
      maxHeight: 512,
      quality: 0.8,
      saveToPhotos: true,
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        // User cancelled
        return;
      }
      if (response.errorCode) {
        Alert.alert('ImagePicker Error', response.errorMessage || 'Unknown error');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Show modal to choose between camera and gallery
  const handleImagePick = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: LIGHT_PURPLE }}>
      <StatusBar barStyle="dark-content" backgroundColor={LIGHT_PURPLE} />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack && navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeftIcon size={28} color='black' />
          </TouchableOpacity>
          <Text style={styles.heading}>Edit Profile</Text>
        </View>
      </View>
      <Formik
        initialValues={{
          name: '',
          gender: '',
          education: '',
          address: '',
          state: '',
          description: '',
        }}
        onSubmit={values => {
          alert('Profile updated!');
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <ScrollView
            style={{ flex: 1, width: '100%' }}
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={handleImagePick}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: imageUri || defaultImage,
                }}
                style={styles.profileImage}
              />
              <View style={styles.editOverlay}>
                <Text style={styles.editText}>Edit</Text>
              </View>
            </TouchableOpacity>

            {/* Modal for choosing camera or gallery */}
            <Modal
              visible={modalVisible}
              transparent
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Choose Photo</Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleImagePickCamera}
                  >
                    <Text style={styles.modalButtonText}>Take Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleImagePickGallery}
                  >
                    <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#eee' }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[styles.modalButtonText, { color: '#333' }]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#b39ddb"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </View>

            {/* Gender */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={values.gender}
                  onValueChange={itemValue => setFieldValue('gender', itemValue)}
                  style={styles.picker}
                  dropdownIconColor={PURPLE}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Select Gender" value="" color="#b39ddb" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
            </View>

            {/* Education */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Education</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={values.education}
                  onValueChange={itemValue => setFieldValue('education', itemValue)}
                  style={styles.picker}
                  dropdownIconColor={PURPLE}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Select Education" value="" color="#b39ddb" />
                  <Picker.Item label="High School" value="high_school" />
                  <Picker.Item label="Intermediate" value="intermediate" />
                  <Picker.Item label="Diploma" value="diploma" />
                  <Picker.Item label="Undergraduate" value="Undergraduate" />
                  <Picker.Item label="Graduate" value="graduate" />
                  <Picker.Item label="Postgraduate" value="Postgraduate" />
                  <Picker.Item label="Doctorate / Phd" value="Doctareate / Phd" />
                </Picker>
              </View>
            </View>

            {/* Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your address"
                placeholderTextColor="#b39ddb"
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
            </View>

            {/* State */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>State</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your state"
                placeholderTextColor="#b39ddb"
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                value={values.state}
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
                placeholder="Enter a short description"
                placeholderTextColor="#b39ddb"
                multiline
                numberOfLines={4}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
            </View>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,
    paddingBottom: 18,
    backgroundColor: LIGHT_PURPLE,
    borderBottomWidth: 1,
    borderBottomColor: '#e1bee7',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  heading: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'left',
  },
  formContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 32,
    backgroundColor: LIGHT_PURPLE,
  },
  imageContainer: {
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: PURPLE,
    backgroundColor: '#fff',
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: PURPLE,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  editText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: PURPLE,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: PURPLE,
    fontWeight: '500',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: PURPLE,
    overflow: 'hidden',
  },
  picker: {
    color: PURPLE,
    width: '100%',
    height: 54, // Increased height for better visibility
    fontSize: 18, // Increase font size for picker text
  },
  pickerItem: {
    fontSize: 18, // Increase font size for picker items
    height: 54,   // Match the picker height
    color: PURPLE,
  },
  saveBtn: {
    marginTop: 18,
    backgroundColor: PURPLE,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 2,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    width: 280,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 18,
  },
  modalButton: {
    width: '100%',
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfile;
