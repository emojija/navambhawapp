import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import logo from '../assets/Images/NavambhawLogo.png';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const LOGO_WIDTH = SCREEN_WIDTH * 0.5;
const LOGO_HEIGHT = SCREEN_HEIGHT * 0.18;

const LandingPage = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        console.log('yes connected')
        // Internet really works → move ahead
        navigation.replace('SignIn');
      } else {
        // No internet access
        Toast.show({
          type: 'error',
          text1: 'Internet',
          text2: 'Please connect to internet.',
        });
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.firstPage}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  firstPage: {
    backgroundColor: '#580A46',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
});
