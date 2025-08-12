import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, Platform, PixelRatio } from 'react-native'
import React from 'react'
import { ArrowLeftIcon, PhoneIcon } from 'react-native-heroicons/outline'
import { ChatBubbleBottomCenterIcon } from 'react-native-heroicons/solid'

// Responsive scaling helpers
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = size => (SCREEN_WIDTH / 375) * size;
const verticalScale = size => (SCREEN_HEIGHT / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// For font scaling
const fontScale = size => size * PixelRatio.getFontScale() * (SCREEN_WIDTH / 375);

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
const GOLD = '#FFD700';

const AstrologerProfile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={PURPLE}
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
            <ArrowLeftIcon color={WHITE} size={moderateScale(26)} />
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
                resizeMode="cover"
              />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingBadgeText}>⭐ {astrologer.rating}</Text>
              </View>
            </View>
            <Text style={styles.nameText}>{astrologer.name}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.experienceText}>
                {astrologer.experience} yrs experience
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
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}>
              <ChatBubbleBottomCenterIcon color={WHITE} size={moderateScale(22)} />
              <Text style={styles.actionBtnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.callActionBtn]} activeOpacity={0.85}>
              <PhoneIcon color={WHITE} size={moderateScale(22)} />
              <Text style={styles.actionBtnText}>Call</Text>
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
    paddingTop: Platform.OS === 'android' ? verticalScale(15) : 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    backgroundColor: PURPLE,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(2),
    borderRadius: moderateScale(20),
  },
  profileTitle: {
    color: WHITE,
    fontSize: fontScale(21),
    fontWeight: 'bold',
    letterSpacing: 1,
    marginLeft: scale(8),
  },
  scrollContent: {
    paddingBottom: verticalScale(100),
    backgroundColor: LIGHT_PURPLE,
    minHeight: SCREEN_HEIGHT * 0.88,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: verticalScale(22),
    marginBottom: verticalScale(14),
  },
  profileImageShadow: {
    shadowColor: PURPLE,
    shadowOpacity: 0.18,
    shadowRadius: moderateScale(10),
    shadowOffset: { width: 0, height: moderateScale(4) },
    elevation: 6,
    borderRadius: moderateScale(70),
    backgroundColor: WHITE,
    marginBottom: verticalScale(2),
    width: scale(120),
    height: scale(120),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: moderateScale(50),
    borderWidth: 3,
    borderColor: PURPLE,
    backgroundColor: WHITE,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: scale(6),
    right: scale(6),
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: PURPLE,
    borderRadius: moderateScale(14),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    elevation: 2,
    shadowColor: GOLD,
    shadowOpacity: 0.18,
    shadowRadius: moderateScale(3),
    shadowOffset: { width: 0, height: moderateScale(1) },
  },
  ratingBadgeText: {
    color: PURPLE,
    fontWeight: 'bold',
    fontSize: fontScale(13),
    letterSpacing: 0.2,
  },
  nameText: {
    fontSize: fontScale(24),
    fontWeight: 'bold',
    color: PURPLE,
    marginTop: verticalScale(14),
    marginBottom: verticalScale(2),
    letterSpacing: 0.5,
    textShadowColor: 'rgba(108,46,181,0.08)',
    textShadowOffset: { width: 0, height: verticalScale(1.5) },
    textShadowRadius: moderateScale(3),
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(6),
    marginTop: verticalScale(2),
  },
  experienceText: {
    fontSize: fontScale(14),
    color: GRAY,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  expertiseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: verticalScale(8),
  },
  expertiseBadge: {
    backgroundColor: '#E9D5FF',
    borderRadius: moderateScale(14),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    margin: scale(3),
    elevation: 1,
    borderWidth: 1,
    borderColor: PURPLE,
  },
  expertiseBadgeText: {
    color: PURPLE,
    fontSize: fontScale(13),
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(16),
    marginHorizontal: scale(10),
    gap: scale(6),
  },
  infoBox: {
    backgroundColor: WHITE,
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(8),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: scale(2),
    elevation: 2,
    shadowColor: PURPLE,
    shadowOpacity: 0.10,
    shadowRadius: moderateScale(3),
    shadowOffset: { width: 0, height: moderateScale(1) },
  },
  infoLabel: {
    color: PURPLE,
    fontSize: fontScale(13),
    fontWeight: '700',
    marginBottom: verticalScale(1),
    letterSpacing: 0.2,
  },
  infoValue: {
    color: GRAY,
    fontSize: fontScale(14),
    fontWeight: '500',
    textAlign: 'center',
  },
  aboutSection: {
    marginHorizontal: scale(12),
    marginTop: verticalScale(8),
    backgroundColor: WHITE,
    borderRadius: moderateScale(16),
    padding: scale(14),
    elevation: 2,
    shadowColor: PURPLE,
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(3),
    shadowOffset: { width: 0, height: moderateScale(1) },
  },
  aboutTitle: {
    color: PURPLE,
    fontSize: fontScale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
    letterSpacing: 0.2,
  },
  aboutText: {
    color: GRAY,
    fontSize: fontScale(13.5),
    lineHeight: fontScale(20),
    fontWeight: '400',
    textAlign: 'justify',
  },
  bottomSafeArea: {
    backgroundColor: 'transparent',
  },
  bottomBar: {
    backgroundColor: LIGHT_PURPLE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    paddingBottom: Platform.OS === 'ios' ? verticalScale(18) : verticalScale(10),
    paddingHorizontal: scale(10),
    elevation: 8,
    shadowColor: PURPLE,
    shadowOpacity: 0.12,
    shadowRadius: moderateScale(6),
    shadowOffset: { width: 0, height: -moderateScale(2) },
    marginBottom: 0,
    gap: scale(8),
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BLUE,
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(22),
    marginHorizontal: 0,
    marginRight: scale(4),
    elevation: 2,
    justifyContent: 'center',
    gap: scale(6),
  },
  callActionBtn: {
    backgroundColor: RED,
    marginLeft: scale(4),
    marginRight: 0,
  },
  actionBtnText: {
    color: WHITE,
    fontSize: fontScale(15),
    fontWeight: 'bold',
    marginLeft: scale(6),
    letterSpacing: 0.5,
  },
})