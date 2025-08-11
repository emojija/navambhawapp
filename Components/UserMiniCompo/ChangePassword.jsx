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
import { ArrowLeftIcon, ShieldCheckIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

const PURPLE = '#8e24aa';
const LIGHT_PURPLE = '#f3e5f5';

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  // Eye toggles for each field
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleSave = () => {
    // Add your password change logic here
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
        <Text style={styles.headerText}>Change Password</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter current password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showCurrent}
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowCurrent((prev) => !prev)}
                accessibilityLabel={showCurrent ? "Hide password" : "Show password"}
              >
                {showCurrent ? (
                  <EyeIcon size={22} color="#888" />
                ) : (
                  <EyeSlashIcon size={22} color="#888" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showNew}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowNew((prev) => !prev)}
                accessibilityLabel={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? (
                  <EyeIcon size={22} color="#888" />
                ) : (
                  <EyeSlashIcon size={22} color="#888" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirm((prev) => !prev)}
                accessibilityLabel={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? (
                  <EyeIcon size={22} color="#888" />
                ) : (
                  <EyeSlashIcon size={22} color="#888" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
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

export default ChangePassword;

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
    paddingRight: 40, // space for eye icon
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    padding: 4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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