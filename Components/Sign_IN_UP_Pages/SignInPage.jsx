import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { UserIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import axios from 'axios';

const placeholderTextColor = "#999"; // Use a visible gray for placeholder

const SignInPage = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [loginData,setLoginData]= useState({})

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        'https://backend.navambhaw.com/api/auth/user/login',
        { Phone, Password }
      );
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        setLoginData(response.data.user)
        const user = response.data.user
        navigation.replace('UserHome',{loginUser : user});
      } else {
        console.error('Login failed: Unexpected response status', response.status);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Login failed:', error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Login failed: No response from server');
      } else {
        // Something else happened
        console.error('Login failed:', error.message);
      }
    }
    setPhone("")
    setPassword("")
  };

  const handleNavigateSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleAstroSignIn = () => {
    navigation.navigate('AstroSignIn');
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
          <MaskedView maskElement={<Text style={styles.text1}>Welcome Back</Text>}>
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
                value={Phone}
                onChangeText={setPhone}
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
                value={Password}
                onChangeText={setPassword}
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
        </View>

        {/* Bottom Links and Button */}
        <View style={styles.bottom_Cont}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Don't share your password.</Text>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </View>

          <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
            <Text style={styles.signInBtnText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Sign up text */}
        <Text style={styles.signupText}>
          Don’t have an account?{' '}
          <Text style={styles.signupLink} onPress={handleNavigateSignUp}>
            Sign Up
          </Text>
        </Text>

        {/* Sign up as Astrologer text */}
        <Text
          style={styles.signupText}
        >
          Sign in as <Text onPress={handleAstroSignIn} style={styles.signupLink}>Astrologer</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignInPage;

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
