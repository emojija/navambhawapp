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
const GOLD = '#FFD700';

const { width, height } = Dimensions.get('window');

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
              <ChatBubbleBottomCenterIcon color={WHITE} size={24} />
              <Text style={styles.actionBtnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.callActionBtn]} activeOpacity={0.85}>
              <PhoneIcon color={WHITE} size={24} />
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
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: PURPLE,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: 20,
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
    borderRadius: 70,
    backgroundColor: WHITE,
    marginBottom: 2,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: PURPLE,
    backgroundColor: WHITE,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderWidth:1,
    borderColor: PURPLE,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
    elevation: 2,
    shadowColor: GOLD,
    shadowOpacity: 0.18,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  ratingBadgeText: {
    color: PURPLE,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: PURPLE,
    marginTop: 18,
    marginBottom: 4,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(108,46,181,0.08)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
  experienceText: {
    fontSize: 16,
    color: GRAY,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  expertiseRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  expertiseBadge: {
    backgroundColor: '#E9D5FF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    margin: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: PURPLE,
  },
  expertiseBadgeText: {
    color: PURPLE,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 22,
    marginHorizontal: 16,
    gap: 10,
  },
  infoBox: {
    backgroundColor: WHITE,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: PURPLE,
    shadowOpacity: 0.10,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  infoLabel: {
    color: PURPLE,
    fontSize: 15,
    fontWeight: '700',
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
    borderRadius: 22,
    padding: 22,
    elevation: 2,
    shadowColor: PURPLE,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  aboutTitle: {
    color: PURPLE,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  aboutText: {
    color: GRAY,
    fontSize: 15.5,
    lineHeight: 23,
    fontWeight: '400',
  },
  bottomSafeArea: {
    backgroundColor: 'transparent',
  },
  bottomBar: {
    backgroundColor: LIGHT_PURPLE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 28,
    paddingHorizontal: 18,
    // borderTopLeftRadius: 24,
    // borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: PURPLE,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
    gap: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BLUE,
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 0,
    marginRight: 8,
    elevation: 2,
    justifyContent: 'center',
    gap: 8,
  },
  callActionBtn: {
    backgroundColor: RED,
    marginLeft: 8,
    marginRight: 0,
  },
  actionBtnText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    letterSpacing: 0.5,
  },
})