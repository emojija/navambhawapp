import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './Components/LandingPage';
import SignInPage from './Components/Sign_IN_UP_Pages/SignInPage';
import SignUpPage from './Components/Sign_IN_UP_Pages/SignUpPage';
import AstrologerSignUp from './Components/Sign_IN_UP_Pages/AstrologerSignUp';
import AstrologerHomeScreen from './Screens/AstrologerHomeScreen';
import UserHomeScreen from './Screens/UserHomeScreen';
import SearchAstrologer from './Components/UserMiniCompo/SearchAstrologer';
import AstrologerProfile from './Components/UserMiniCompo/AstrologerProfile';
import PoojaFullInfo from './Components/UserMiniCompo/PoojaFullInfo';
import Panchang from './Components/UserMiniCompo/Panchang';
import KundliAstro from './Components/AstrologerMiniCompo/KundliAstro'
import PoojaAstro from './Components/AstrologerMiniCompo/PoojaAstro';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AstorHome" component={AstrologerHomeScreen} />
        <Stack.Screen name="UserHome" component={UserHomeScreen} />
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="AstroSignIn" component={AstrologerSignUp} />
        <Stack.Screen name="SignUp" component={SignUpPage} />

        {/* users route  */}
        <Stack.Screen name="SearchAstro" component={SearchAstrologer} />
        <Stack.Screen name="AstroProfile" component={AstrologerProfile} />
        <Stack.Screen name="PoojaInfo" component={PoojaFullInfo} />
        <Stack.Screen name="Panchang" component={Panchang} />

        {/* astrologer route */}
        <Stack.Screen name="PoojaAstro" component={PoojaAstro} />
        <Stack.Screen name="KundliAstro" component={KundliAstro} />
        
        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
