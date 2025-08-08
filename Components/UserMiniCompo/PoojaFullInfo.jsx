import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform, ScrollView } from 'react-native'
import React from 'react'
import { ArrowLeftIcon, ChatBubbleLeftEllipsisIcon, PhoneIcon } from 'react-native-heroicons/outline'
import LinearGradient from 'react-native-linear-gradient'

const pooja = {
  id: '1',
  name: 'Ganesh Pooja',
  subtitle: 'For prosperity and obstacle removal',
  about: 'Ganesh Pooja is performed to invoke the blessings of Lord Ganesha, the remover of obstacles and the god of new beginnings. This pooja is ideal for those starting new ventures, seeking prosperity, or wishing to remove hurdles from their lives.',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
}

// Yellowish theme colors
const YELLOW = '#FFD600';
const LIGHT_YELLOW = '#FFF9E3';
const ORANGE = '#FFB300';
const WHITE = '#FFF';
const GRAY = '#666';

const { width, height } = Dimensions.get('window');

const PoojaFullInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor={YELLOW} translucent={false} hidden={false} />
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation && navigation.goBack && navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeftIcon color={'#000'} size={28} />
            <Text style={styles.titleText}>Pooja</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Image with Gradient Overlay */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: pooja.image }}
              style={styles.poojaImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(255,214,0,0.0)', 'rgba(255, 179, 0, 0.85)']}
              style={styles.gradientOverlay}
            />
            <View style={styles.imageTextOverlay}>
              <Text style={styles.poojaName}>{pooja.name}</Text>
              <Text style={styles.poojaSubtitle}>{pooja.subtitle}</Text>
            </View>
          </View>

          {/* About Section */}
          <View style={styles.aboutSectionFullWidth}>
            <Text style={styles.aboutTitle}>About</Text>
            <Text style={styles.aboutText}>{pooja.about}</Text>
          </View>
        </ScrollView>

        {/* Book and WhatsApp Buttons at Bottom */}
        <SafeAreaView style={styles.bottomSafeArea} edges={['bottom']}>
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.bookBtn} activeOpacity={0.8}>
              <PhoneIcon color={WHITE} size={24} />
              <Text style={styles.bookBtnText}>Book</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.whatsappBtn} activeOpacity={0.8}>
              <ChatBubbleLeftEllipsisIcon color={WHITE} size={24} />
              <Text style={styles.whatsappBtnText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  )
}

export default PoojaFullInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YELLOW,
  },
  safeArea: {
    flex: 1,
    backgroundColor: YELLOW,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: YELLOW,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 20,
  },
  titleText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginLeft: 8,
  },
  scrollContent: {
    backgroundColor: LIGHT_YELLOW,
    // Remove border radius so image is not rounded at the top
    minHeight: height * 0.85,
    paddingBottom: 32,
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.32,
    // Remove borderTopLeftRadius and borderTopRightRadius for full width and no rounding
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eee',
  },
  poojaImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    width: '100%',
  },
  imageTextOverlay: {
    position: 'absolute',
    left: 20,
    bottom: 24,
    right: 20,
  },
  poojaName: {
    color: WHITE,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  poojaSubtitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  // New style for full width about section
  aboutSectionFullWidth: {
    marginHorizontal: 0,
    marginTop: 18,
    backgroundColor: WHITE,
    borderRadius: 0,
    padding: 24,
    elevation: 2,
    shadowColor: ORANGE,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    width: '100%',
    alignSelf: 'stretch',
  },
  aboutTitle: {
    color: ORANGE,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  aboutText: {
    color: GRAY,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  bottomSafeArea: {
    backgroundColor: 'transparent',
  },
  bottomBar: {
    backgroundColor: LIGHT_YELLOW,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop:10,
    paddingBottom: 25,
    // borderTopLeftRadius: 18,
    // borderTopRightRadius: 18,
    elevation: 10,
    shadowColor: ORANGE,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ORANGE,
    paddingVertical: 13,
    paddingHorizontal: 38,
    borderRadius: 30,
    marginHorizontal: 8,
    elevation: 2,
  },
  bookBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 13,
    paddingHorizontal: 38,
    borderRadius: 30,
    marginHorizontal: 8,
    elevation: 2,
  },
  whatsappBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
})