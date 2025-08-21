import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './Navigation';
import Toast from 'react-native-toast-message';
import { UserContext, UserProvider } from './context/UserContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Navigation />
      </UserProvider>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
