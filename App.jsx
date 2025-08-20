import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from './Navigation'
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigation/>
      <Toast/>
    </SafeAreaProvider>
  )
}

export default App