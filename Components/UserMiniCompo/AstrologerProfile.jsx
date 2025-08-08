import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, Platform } from 'react-native'
import React from 'react'
import { ArrowLeftIcon, PhoneIcon } from 'react-native-heroicons/outline'
import { ChatBubbleBottomCenterIcon } from 'react-native-heroicons/solid'

const astrologer = {
    id: '1',
    name: 'Priya Sharma',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    expertise: ['Vedic Astrology', 'Tarot', 'Numerology'],
    experience: 8,
    languages: ['Hindi', 'English'],
    pricePerMin: 25,
    rating: 4.7,
    about: 'Priya Sharma is a highly experienced astrologer with over 8 years of expertise in Vedic Astrology, Tarot, and Numerology. She is known for her compassionate approach, deep insights, and accurate predictions. Priya has helped countless clients find clarity and direction in their lives through her guidance.',
};

const PURPLE = '#6C2EB5';
const LIGHT_PURPLE = '#F3E8FF';
const BLUE = '#2563EB';
const RED = '#EF4444';
const WHITE = '#FFF';
const GRAY = '#666';

const { width, height } = Dimensions.get('window');

const AstrologerProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor='white'
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
            <ArrowLeftIcon color={WHITE} size={28} />
            <Text style={styles.profileTitle}>Profile</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Image, Name, Rating, Expertise */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageShadow}>
              <Image
                source={{ uri: astrologer.image }}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.nameText}>{astrologer.name}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingText}>⭐ {astrologer.rating}</Text>
              <Text style={styles.experienceText}>
                • {astrologer.experience} yrs exp
              </Text>
            </View>
            <View style={styles.expertiseRow}>
              {astrologer.expertise.map((exp, idx) => (
                <View key={idx} style={styles.expertiseBadge}>
                  <Text style={styles.expertiseBadgeText}>{exp}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Language, Experience, Amount */}
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Languages</Text>
              <Text style={styles.infoValue}>{astrologer.languages.join(', ')}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Experience</Text>
              <Text style={styles.infoValue}>{astrologer.experience} yrs</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={styles.infoValue}>₹{astrologer.pricePerMin}/min</Text>
            </View>
          </View>

          {/* About */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>About</Text>
            <Text style={styles.aboutText}>{astrologer.about}</Text>
          </View>
        </ScrollView>

        {/* Chat and Call Buttons at Bottom */}
        <SafeAreaView style={styles.bottomSafeArea}>
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.chatBtn} activeOpacity={0.8}>
              <ChatBubbleBottomCenterIcon color={WHITE} size={24} />
              <Text style={styles.chatBtnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
              <PhoneIcon color={WHITE} size={24} />
              <Text style={styles.callBtnText}>Call</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  )
}

export default AstrologerProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PURPLE,
  },
  safeArea: {
    flex: 1,
    backgroundColor: PURPLE,
    paddingTop: Platform.OS === 'android' ? 24 : 0, // fallback for Android notch
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: PURPLE,
    // No justifyContent, keep left-aligned
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 20,
    // backgroundColor: 'rgba(255,255,255,0.08)',
  },
  profileTitle: {
    color: WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginLeft: 8,
  },
  scrollContent: {
    paddingBottom: 120,
    backgroundColor: LIGHT_PURPLE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    minHeight: height * 0.85,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 18,
  },
  profileImageShadow: {
    shadowColor: PURPLE,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    borderRadius: 60,
    backgroundColor: WHITE,
    marginBottom: 2,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: PURPLE,
    backgroundColor: WHITE,
  },
  nameText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: PURPLE,
    marginTop: 16,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 17,
    color: '#FFD700',
    fontWeight: 'bold',
    marginRight: 8,
  },
  experienceText: {
    fontSize: 15,
    color: GRAY,
    fontWeight: '500',
  },
  expertiseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  expertiseBadge: {
    backgroundColor: PURPLE,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    margin: 4,
    elevation: 1,
  },
  expertiseBadgeText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  infoBox: {
    backgroundColor: WHITE,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    minWidth: width * 0.27,
    elevation: 3,
    shadowColor: PURPLE,
    shadowOpacity: 0.10,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  infoLabel: {
    color: PURPLE,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  infoValue: {
    color: GRAY,
    fontSize: 16,
    fontWeight: '500',
  },
  aboutSection: {
    marginHorizontal: 22,
    marginTop: 12,
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    shadowColor: PURPLE,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  aboutTitle: {
    color: PURPLE,
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
    backgroundColor: LIGHT_PURPLE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical:10,
    paddingBottom: 25,
    // borderTopLeftRadius: 18,
    // borderTopRightRadius: 18,
    elevation: 10,
    shadowColor: PURPLE,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    marginBottom: Platform.OS === 'ios' ? 0 : 0, // SafeAreaView handles iOS, Android is fine
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BLUE,
    paddingVertical: 13,
    paddingHorizontal: 38,
    borderRadius: 30,
    marginHorizontal: 8,
    elevation: 2,
  },
  chatBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RED,
    paddingVertical: 13,
    paddingHorizontal: 38,
    borderRadius: 30,
    marginHorizontal: 8,
    elevation: 2,
  },
  callBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
})