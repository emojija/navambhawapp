import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { UserIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';

const PRIMARY_COLOR = '#580A46';

const SignUpPage = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    Phone: '',
    otp: '',
    Password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleNavigateSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(formData.Phone)) {
      // You can show an alert or error message here
      return;
    }
    try {
      const response = await axios.post(
        'https://backend.navambhaw.com/api/auth/user/sendOTP',
        {
          Phone: formData.Phone,
        }
      );
      if (response.data.success) {
        // You can show a success message here
        console.log("OTP sent:", response.data);
      }
    } catch (err) {
      console.error("Send OTP error:", err);
    }
  };

  const handleSignUp = async () => {
    // Basic validation
    if (!formData.name.trim()) {
      console.error("Name is required");
      return;
    }
    if (!/^\d{10}$/.test(formData.Phone)) {
      console.error("Valid 10-digit phone number is required");
      return;
    }
    if (!formData.otp.trim()) {
      console.error("OTP is required");
      return;
    }
    if (!formData.Password || formData.Password.length < 6) {
      console.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend.navambhaw.com/api/auth/user/createuser",
        formData
      );
      if (response.data && response.data.success) {
        // Optionally show a success message here
        navigation.navigate('SignIn');
      } else {
        // Optionally show an error message here
        console.error("Signup failed:", response.data?.message || "Unknown error");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error("Signup error:", error.response.data.message);
      } else {
        console.error("Signup error:", error.message || error);
      }
    } finally {
      setFormData({
        name: '',
        Phone: '',
        otp: '',
        Password: '',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        <UserIcon size={40} color="white" />
      </View>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#999"
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
      />

      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.phoneRow}>
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>+91</Text>
        </View>
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={formData.Phone}
          onChangeText={text => handleInputChange('Phone', text)}
          maxLength={10}
        />
      </View>

      <Text style={styles.label}>Otp</Text>
      <View style={styles.otpRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter otp here"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          value={formData.otp}
          onChangeText={text => handleInputChange('otp', text)}
        />
        <TouchableOpacity style={styles.otpBtn} onPress={handleSendOtp}>
          <Text style={styles.otpBtnText}>Send OTP</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordRow}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={formData.Password}
          onChangeText={text => handleInputChange('Password', text)}
        />
        <TouchableOpacity onPress={handleTogglePassword} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          {showPassword ? (
            <EyeIcon size={24} color="#555" />
          ) : (
            <EyeSlashIcon size={24} color="#555" />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
        <Text style={styles.signupBtnText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.signInLink} onPress={handleNavigateSignIn}>
          Sign In
        </Text>
      </Text>
      <Text style={styles.termsText}>
        By creating an account, you agree to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  avatarCircle: {
    alignSelf: 'center',
    backgroundColor: PRIMARY_COLOR,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#7e7e7e',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    marginTop: 14,
    marginBottom: 6,
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: '#fff',
    color: '#000',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  codeBox: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    backgroundColor: '#f5f5f5',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  codeText: {
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 8,
    color: '#000',
  },
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  otpBtn: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  otpBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 6,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: '#fff',
    color: '#000',
    borderWidth: 0,
  },
  signupBtn: {
    backgroundColor: PRIMARY_COLOR,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  signupBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  signInLink: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    marginTop: 12,
    textAlign: 'center',
  },
  link: {
    color: PRIMARY_COLOR,
  },
});
