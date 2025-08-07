import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Dimensions, StatusBar, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeftIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context';

// Astrologer data
const astrologers = [
  {
    id: '1',
    name: 'Priya Sharma',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    expertise: ['Vedic Astrology', 'Tarot', 'Numerology'],
    experience: 8,
    languages: ['Hindi', 'English'],
    pricePerMin: 25,
    rating: 4.7,
  },
  {
    id: '2',
    name: 'Rahul Verma',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    expertise: ['Palmistry', 'Vastu'],
    experience: 12,
    languages: ['Hindi', 'English', 'Punjabi'],
    pricePerMin: 30,
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Sneha Kapoor',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    expertise: ['Reiki', 'Lal Kitab', 'KP Astrology'],
    experience: 6,
    languages: ['English', 'Marathi'],
    pricePerMin: 20,
    rating: 4.5,
  },
  {
    id: '4',
    name: 'Amit Joshi',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
    expertise: ['Vedic Astrology', 'Kundli', 'Numerology'],
    experience: 10,
    languages: ['Hindi', 'Gujarati'],
    pricePerMin: 28,
    rating: 4.8,
  },
  {
    id: '5',
    name: 'Meera Desai',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
    expertise: ['Tarot', 'Vastu', 'Palmistry'],
    experience: 7,
    languages: ['English', 'Hindi', 'Bengali'],
    pricePerMin: 22,
    rating: 4.6,
  },
];

// Responsive utility functions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 375; // iPhone 8 width
const guidelineBaseHeight = 667; // iPhone 8 height

const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// Card component for astrologer
const AstrologerCard = ({ astrologer }) => (
    <TouchableOpacity activeOpacity={0.8}>
  <View style={styles.card}>
    <View style={styles.cardLeft}>
      <Image source={{ uri: astrologer.image }} style={styles.cardImage} />
      <View style={styles.expTextContainer}>
        <Text style={styles.expText}>{astrologer.experience} yrs exp</Text>
      </View>
    </View>
    <View style={styles.cardRight}>
      <View style={styles.nameRow}>
        <Text style={styles.cardName} numberOfLines={1}>{astrologer.name}</Text>
        <View style={styles.ratingBox}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingText}>{astrologer.rating}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Expertise: </Text>
        <Text style={styles.value} numberOfLines={1}>{astrologer.expertise.join(', ')}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Languages: </Text>
        <Text style={styles.value} numberOfLines={1}>{astrologer.languages.join(', ')}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price/min: </Text>
        <Text style={styles.priceValue}>₹{astrologer.pricePerMin}</Text>
      </View>
    </View>
  </View>
  </TouchableOpacity>
);

const SearchAstrologer = ({navigation}) => {
  const [search, setSearch] = useState('');

  // Filter astrologers by search text (case-insensitive)
  const filteredAstrologers = astrologers.filter(a =>
    a.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const showResults = search.trim().length > 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right','bottom']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#f9f7fc"
      />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.searchBoxWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowInInputButton} activeOpacity={0.7}>
              <ArrowLeftIcon color="#82428f" size={moderateScale(24)} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Search Astrologer"
              placeholderTextColor="#b09fc7"
              value={search}
              onChangeText={setSearch}
              underlineColorAndroid="transparent"
              returnKeyType="search"
            />
            {search.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearch('')}
                style={styles.crossButton}
                activeOpacity={0.7}
                accessibilityLabel="Clear search"
              >
                <XMarkIcon color="#000000" size={moderateScale(28)} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {showResults ? (
            filteredAstrologers.length > 0 ? (
              <ScrollView contentContainerStyle={styles.cardsContainer}>
                {filteredAstrologers.map(astrologer => (
                  <AstrologerCard astrologer={astrologer} key={astrologer.id} />
                ))}
              </ScrollView>
            ) : (
              <View style={styles.noResultContainer}>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png' }}
                  style={styles.noResultImage}
                  resizeMode="contain"
                />
                <Text style={styles.noResultText}>No astrologers found</Text>
              </View>
            )
          ) : (
            <View style={styles.searchPromptContainer}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4072/4072301.png' }}
                style={styles.searchPromptImage}
                resizeMode="contain"
              />
              <Text style={styles.searchPromptText}>Search for astrologers</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SearchAstrologer

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f7fc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f7fc',
    paddingTop: verticalScale(3),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    paddingHorizontal: moderateScale(10),
  },
  searchBoxWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(50),
    paddingHorizontal: moderateScale(16),
    paddingVertical: Platform.OS === 'ios' ? verticalScale(14) : verticalScale(8),
    shadowColor: '#82428f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5d0f7',
  },
  arrowInInputButton: {
    marginRight: moderateScale(10),
    padding: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: '#4B2067',
    fontWeight: '500',
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
  crossButton: {
    marginLeft: moderateScale(8),
    padding: moderateScale(6),
    backgroundColor: '#e3e3e3',
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(36),
    height: moderateScale(36),
    // Enhanced shadow for both iOS and Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },
  iconButton: {
    marginLeft: moderateScale(10),
    padding: moderateScale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Astrologer card styles
  cardsContainer: {
    paddingHorizontal: moderateScale(10),
    paddingBottom: verticalScale(20),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: moderateScale(18),
    padding: moderateScale(16),
    marginBottom: verticalScale(16),
    shadowColor: '#82428f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5d0f7',
  },
  cardLeft: {
    alignItems: 'center',
    marginRight: moderateScale(18),
    width: moderateScale(70),
  },
  cardImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#e5d0f7',
  },
  expTextContainer: {
    marginTop: verticalScale(7),
    backgroundColor: '#f2e6fa',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(3),
    alignSelf: 'center',
    shadowColor: '#82428f',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  expText: {
    fontSize: moderateScale(12),
    color: '#82428f',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  cardRight: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(4),
    width: '100%',
  },
  cardName: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: '#4B2067',
    flexShrink: 1,
    marginRight: moderateScale(8),
    letterSpacing: 0.1,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7e6',
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(2),
    minWidth: moderateScale(44),
    justifyContent: 'center',
  },
  ratingStar: {
    color: '#ffb300',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    marginRight: 2,
  },
  ratingText: {
    color: '#ffb300',
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(2),
    flexWrap: 'wrap',
  },
  label: {
    fontSize: moderateScale(13),
    color: '#b09fc7',
    fontWeight: '600',
    marginRight: 2,
  },
  value: {
    fontSize: moderateScale(13),
    color: '#82428f',
    fontWeight: '500',
    flexShrink: 1,
  },
  priceValue: {
    fontSize: moderateScale(14),
    color: '#4B2067',
    fontWeight: 'bold',
    backgroundColor: '#f2e6fa',
    borderRadius: moderateScale(7),
    paddingHorizontal: moderateScale(7),
    paddingVertical: verticalScale(1),
    overflow: 'hidden',
  },
  // Search prompt image and text
  searchPromptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchPromptImage: {
    width: moderateScale(120),
    height: moderateScale(120),
    marginBottom: verticalScale(16),
    opacity: 0.7,
  },
  searchPromptText: {
    fontSize: moderateScale(16),
    color: '#b09fc7',
    fontWeight: '500',
  },
  // No result
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    marginBottom: verticalScale(12),
    opacity: 0.7,
  },
  noResultText: {
    fontSize: moderateScale(15),
    color: '#b09fc7',
    fontWeight: '500',
  },
})