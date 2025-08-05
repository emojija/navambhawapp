import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './Components/LandingPage';
import SignInPage from './Components/SignInPage';
import SignUpPage from './Components/SignUpPage';
import AstrologerSignUp from './Components/AstrologerSignUp';
import AstrologerHomeScreen from './Components/AstrologerHomeScreen';
import UserHomeScreen from './Components/UserHomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="SignIn" component={SignInPage} />
        <Stack.Screen name="AstroSignIn" component={AstrologerSignUp} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="AstorHome" component={AstrologerHomeScreen} />
        <Stack.Screen name="UserHome" component={UserHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;