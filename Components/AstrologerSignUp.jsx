import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { UserIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { Linking } from 'react-native';
import axios from 'axios';

const placeholderTextColor = '#999';

const AstrologerSignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    Phone: '',
    Password: '',
    otp: '',
  });

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  // Astrologer sign in handler for React Native

  const handleAstroSignIn = async () => {
    // Basic validation
    if (!/^\d{10}$/.test(formData.Phone)) {
      // You can show an alert or error message here
      console.error('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.Password || formData.Password.length < 6) {
      console.error('Password must be at least 6 characters');
      return;
    }
    if (!formData.otp.trim()) {
      console.error('OTP is required');
      return;
    }

    try {
      const response = await axios.post(
        'https://backend.navambhaw.com/api/auth/astrologer/login',
        {
          Phone: formData.Phone,
          Password: formData.Password,
          otp: formData.otp,
        },
      );

      if (response.data && response.data.success) {
        navigation.navigate('AstorHome');
        console.log('Astrologer login successful:', response.data);
      } else {
        // Optionally show an error message here
        console.error(
          'Astrologer login failed:',
          response.data?.message || 'Unknown error',
        );
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error('Astrologer login error:', error.response.data.message);
      } else {
        console.error('Astrologer login error:', error.message || error);
      }
    }
  };

  const handleAstrologerSignUp = () => {
    const url = 'https://navambhaw.com/astro-signup'; // Replace with your actual URL
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleUseSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSendOtp = async () => {
    console.log('otp')
    if (formData.Phone.length !== 10 || !/^\d{10}$/.test(formData.Phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const response = await axios.post(
        'https://backend.navambhaw.com/api/auth/astrologer/sendOTP',
        {
          Phone: formData.Phone,
        },
      );
      if (response.data.success) {
        console.log('OTP SENT SUCCESSFULY');
      } else {
        console.log(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.err('Failed to send OTP. Please try again.');
    }
  };

  // Two-way binding handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.login_Cont}>
      <View style={styles.inner_Cont}>
        {/* Top Avatar */}
        <View style={styles.topLogo}>
          <UserIcon color="#fff" size={35} />
        </View>

        {/* Welcome Text */}
        <View style={styles.topText}>
          <MaskedView
            maskElement={<Text style={styles.text1}>Welcome Back</Text>}
          >
            <LinearGradient
              colors={['#5c0a4d', '#5c0a4d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.text1, { opacity: 0 }]}>Welcome Back</Text>
            </LinearGradient>
          </MaskedView>
          <Text style={styles.text2}>Sign in to your account</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form_Cont}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWithCode}>
              <View style={styles.codeBox}>
                <Text style={styles.codeText}>+91</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                placeholderTextColor={placeholderTextColor}
                value={formData.Phone}
                onChangeText={value => handleInputChange('Phone', value)}
                maxLength={10}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                placeholderTextColor={placeholderTextColor}
                value={formData.Password}
                onChangeText={value => handleInputChange('Password', value)}
              />
              <TouchableOpacity onPress={handleTogglePassword} hitSlop={10}>
                {showPassword ? (
                  <EyeIcon color="#4a004e" size={20} />
                ) : (
                  <EyeSlashIcon color="#4a004e" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* OTP Section */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>OTP</Text>
            <View style={styles.otpRow}>
              <TextInput
                style={[styles.input, styles.otpInput, { flex: 1 }]}
                placeholder="Enter OTP"
                keyboardType="number-pad"
                placeholderTextColor={placeholderTextColor}
                value={formData.otp}
                onChangeText={value => handleInputChange('otp', value)}
                maxLength={6}
              />
              <TouchableOpacity style={styles.otpBtn} onPress={handleSendOtp}>
                <Text style={styles.otpBtnText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bottom Links and Button */}
        <View style={styles.bottom_Cont}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Don't share your password.</Text>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </View>

          <TouchableOpacity style={styles.signInBtn} onPress={handleAstroSignIn}>
            <Text  style={styles.signInBtnText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Sign up text */}
        <Text style={styles.signupText}>
          Don’t have an account?{' '}
          <Text style={styles.signupLink} onPress={handleAstrologerSignUp}>
            Create Account {/*   here add link for the astrologer sign up */}
          </Text>
        </Text>

        {/* Sign up as Astrologer text */}
        <Text
          style={styles.signupText}
          // Uncomment below to make it clickable if you have a handler/page
          // onPress={handleNavigateAstrologerSignUp}
        >
          Sign In as{' '}
          <Text onPress={handleUseSignIn} style={styles.signupLink}>
            User
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default AstrologerSignUp;

const styles = StyleSheet.create({
  login_Cont: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner_Cont: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  topLogo: {
    alignSelf: 'center',
    backgroundColor: '#580A46',
    borderRadius: 40,
    padding: 15,
    marginBottom: 20,
  },
  topText: {
    alignItems: 'center',
    marginBottom: 30,
  },
  text1: {
    fontSize: 22,
    fontWeight: '700',
  },
  text2: {
    marginTop: 5,
    fontSize: 14,
    color: '#7e7e7e',
  },
  form_Cont: {
    gap: 20,
  },
  inputGroup: {},
  label: {
    marginBottom: 8,
    color: '#580A46',
    fontWeight: '600',
  },
  inputWithCode: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  codeBox: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  codeText: {
    fontWeight: '500',
    color: '#580A46',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000', // Ensure input text is visible
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 15,
  },
  otpBtn: {
    backgroundColor: '#580A46',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  otpBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  bottom_Cont: {
    marginTop: 25,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 13,
    color: '#888',
  },
  forgotText: {
    fontSize: 13,
    color: '#580A46',
    fontWeight: '600',
  },
  signInBtn: {
    backgroundColor: '#580A46',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  signInBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    marginTop: 25,
    color: '#444',
  },
  signupLink: {
    color: '#580A46',
    fontWeight: '600',
  },
  signupAstrologerText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#580A46',
    fontWeight: '600',
    fontSize: 15,
    // textDecorationLine: 'underline', // Uncomment if you want underline
  },
});
