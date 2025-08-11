import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import {
  ArrowLeftIcon,
  ChatBubbleLeftEllipsisIcon,
  PhoneIcon,
} from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';

const pooja = {
  id: '1',
  name: 'Ganesh Pooja',
  subtitle: 'For prosperity and obstacle removal',
  about:
    'Ganesh Pooja is performed to invoke the blessings of Lord Ganesha, the remover of obstacles and the god of new beginnings. This pooja is ideal for those starting new ventures, seeking prosperity, or wishing to remove hurdles from their lives.',
  image:
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  contact: '+919999999999',
  whatsapp: '+919999999999',
};

const YELLOW = '#FFD600';
const LIGHT_YELLOW = '#FFF9E3';
const ORANGE = '#FFB300';
const WHITE = '#FFF';
const GRAY = '#666';
const GREEN = '#25D366';

const { width, height } = Dimensions.get('window');

const openPhone = (phone) => {
  Linking.openURL(`tel:${phone}`).catch(() =>
    Alert.alert('Error', 'Could not open phone dialer')
  );
};

const openWhatsApp = (phone) => {
  const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
  Linking.openURL(url).catch(() =>
    Alert.alert('Error', 'Could not open WhatsApp')
  );
};

const PoojaFullInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={YELLOW}
          translucent={false}
          hidden={false}
        />
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation && navigation.goBack && navigation.goBack()}
            activeOpacity={0.7}
          >
            <ArrowLeftIcon color={'#000'} size={28} />
          </TouchableOpacity>
          <Text style={styles.titleText}>{pooja.name}</Text>
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
            {/* Stronger gradient for better text visibility */}
            <LinearGradient
              colors={[
                'rgba(0,0,0,0.45)',
                'rgba(0,0,0,0.25)',
                'rgba(255, 255, 41, 0.723)',
              ]}
              style={styles.gradientOverlay}
              pointerEvents="none"
            />
            <View style={styles.imageTextOverlay}>
              {/* Add a semi-transparent background behind the text for extra contrast */}
              <View style={styles.textBackground}>
                <Text style={styles.poojaName}>{pooja.name}</Text>
                <Text style={styles.poojaSubtitle}>{pooja.subtitle}</Text>
              </View>
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
            <TouchableOpacity
              style={styles.bookBtn}
              activeOpacity={0.85}
              onPress={() => openPhone(pooja.contact)}
            >
              <PhoneIcon color={WHITE} size={24} />
              <Text style={styles.bookBtnText}>Book Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.whatsappBtn}
              activeOpacity={0.85}
              onPress={() => openWhatsApp(pooja.whatsapp)}
            >
              <ChatBubbleLeftEllipsisIcon color={WHITE} size={24} />
              <Text style={styles.whatsappBtnText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
};

export default PoojaFullInfo;

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
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: YELLOW,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f3e6a0',
    elevation: 2,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 20,
    marginRight: 8,
    // No background color for arrow
    backgroundColor: 'transparent',
  },
  titleText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
  },
  scrollContent: {
    backgroundColor: LIGHT_YELLOW,
    minHeight: height * 0.85,
    paddingBottom: 32,
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.34,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eee',
    // No border radius for image container
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 8,
    elevation: 3,
    shadowColor: ORANGE,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  poojaImage: {
    width: '100%',
    height: '100%',
    // No border radius for image
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    // No border radius
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: 1,
  },
  imageTextOverlay: {
    position: 'absolute',
    left: 24,
    bottom: 32,
    right: 24,
    zIndex: 2,
    // Remove pointerEvents so children are clickable if needed
  },
  // Add a new style for the text background to improve contrast
  textBackground: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  poojaName: {
    color: WHITE,
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.32)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  poojaSubtitle: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.22)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  aboutSectionFullWidth: {
    marginHorizontal: 0,
    marginTop: 18,
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 24,
    elevation: 2,
    shadowColor: ORANGE,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    width: '94%',
    alignSelf: 'center',
    marginBottom: 18,
  },
  aboutTitle: {
    color: ORANGE,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  aboutText: {
    color: GRAY,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    marginBottom: 0,
  },
  bottomSafeArea: {
    backgroundColor: 'transparent',
  },
  bottomBar: {
    backgroundColor: LIGHT_YELLOW,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 25,
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
    shadowColor: ORANGE,
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
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
    backgroundColor: GREEN,
    paddingVertical: 13,
    paddingHorizontal: 38,
    borderRadius: 30,
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: GREEN,
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  whatsappBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
});