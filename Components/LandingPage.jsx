import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect } from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import LinearGradient from 'react-native-linear-gradient'

const LandingPage = ({navigation}) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('SignIn');
      }, 700);
      return () => clearTimeout(timer);
    }, []);
    
  return (
    <View style={styles.firstPage}>
      <MaskedView
        maskElement={
          <Text style={styles.logo}>
            Navambhaw.com
          </Text>
        }
      >
        <LinearGradient
          colors={['#800080', '#FFFFFF']} // purple to white
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 40, justifyContent: 'center' }}
        >
     
          <Text style={[styles.logo, { opacity: 0 }]}>Navambhaw.com</Text>
        </LinearGradient>
      </MaskedView>
    </View>
  )
}

export default LandingPage

const styles = StyleSheet.create({
    firstPage:{
        backgroundColor:'#580A46',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})