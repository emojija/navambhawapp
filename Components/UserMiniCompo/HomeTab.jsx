import {  StyleSheet,  Text, View, Dimensions, Image, FlatList, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Responsive utility for font size and spacing
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// FlatList data separated
const ASTROLOGERS = [
  {
    id: '1',
    name: 'Priya Sharma',
    amount: '₹20/min',
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    id: '2',
    name: 'Rohan Mehta',
    amount: '₹25/min',
    image: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    id: '3',
    name: 'Sneha Verma',
    amount: '₹18/min',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: '4',
    name: 'Amit Singh',
    amount: '₹22/min',
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
  },
  {
    id: '5',
    name: 'Kavita Joshi',
    amount: '₹19/min',
    image: 'https://randomuser.me/api/portraits/women/67.jpg',
  },
  {
    id: '6',
    name: 'Vikram Patel',
    amount: '₹23/min',
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
  },
];

// Card for Astrologer and Pandit (shared style and logic)
const PersonCard = ({ item ,navigation }) => {
  // Show only first 12 characters of name, add "..." if longer
  let displayName = item.name;
  if (typeof displayName === 'string' && displayName.length > 12) {
    displayName = displayName.slice(0, 12) + '..';
  }
  return (
    <View style={styles.personCardContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.personImage}
        resizeMode="cover"
      />
      <Text
        style={styles.personName}
        numberOfLines={2}
        ellipsizeMode="tail"
        adjustsFontSizeToFit={false}
      >
        {displayName}
      </Text>
      <Text style={styles.personAmount}>{item.amount}</Text>
      <TouchableOpacity activeOpacity={0.95} onPress={()=>{navigation.navigate('AstroProfile')}} style={styles.startChatWrapper}>
        <View style={styles.startChatButton}>
          <Text style={styles.startChatText}>View Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const PoojaCard = ({ item , navigation }) => {
  // Show only first 12 characters of name, add "..." if longer
  let displayName = item.Pooja_name;
  if (typeof displayName === 'string' && displayName.length > 12) {
    displayName = displayName.slice(0, 12) + '..';
  }
  return (
    <View style={styles.poojaCardContainer}>
      <Image
        source={{ uri: `https://backend.navambhaw.com/pooja_image/${item.Pooja_image}` }}
        style={styles.personImage}
        resizeMode="cover"
      />
      <Text
        style={styles.personName}
        numberOfLines={2}
        ellipsizeMode="tail"
        adjustsFontSizeToFit={false}
      >
        {displayName}
      </Text>
      <Text style={styles.personAmount}>{item.Type}</Text>
      <View style={styles.startChatWrapper}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('PoojaInfo')}}>
          <View style={styles.poojaStartChatButton}>
            <Text style={styles.poojaStartChatText}>View Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HomeTab = ({navigation}) => {
  const[poojaCard,setPoojaCard] = useState([])
  
  // Accept navigation from props or useNavigation as fallback
   
  // for calling pooja api 
  useEffect(() => {
    const fetchPoojas = async () => {
      // setIsLoading(true);
      try {
        const res = await axios.get('https://backend.navambhaw.com/v1/allpoojas');
        if (res.status === 200 && Array.isArray(res.data?.data)) {
          setPoojaCard(res.data.data);
        
          console.log(res.data.data)
        } else {
          setPoojaCard([]);
          console.warn('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Failed to fetch poojas:', error);
        setPoojaCard([]);
      } finally {
        // setIsLoading(false);
       
      }
    };
    fetchPoojas();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* search bar  */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SearchAstro')}
        >
          <Text style={styles.placeholderText}>Search Astrologers, Pandits</Text>
          <MagnifyingGlassIcon
            size={moderateScale(25)}
            color="#757575"
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* improved image banner with secure chat text */}
        <View style={styles.imgcont}>
          <View style={styles.bannerWrapper}>
            <Image
              style={styles.banner}
              source={{
                uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80', // Secure chat themed, more focused
              }}
              resizeMode="cover"
            />
          
            
          </View>
        </View>

        {/* navabhaw text  */}
        <View style={styles.textCon}>
          <View style={styles.largeText}>
            <Text style={styles.horoscopeText}>Get daily horoscope with</Text>
          </View>
          <Text style={styles.navambhaw}>Navambhaw</Text>
        </View>

        {/*Free services  */}
        <View style={styles.serviceCard}>
          <Text style={styles.serviceText}>Free Services</Text>
          <View style={styles.innService}>
            <TouchableOpacity activeOpacity={0.95} onPress={()=>navigation.navigate('Kundli')} style={styles.card}>
              <Image
                style={styles.cardImg}
                source={{
                  uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', // Photo of Earth from space
                }}
              />
              <LinearGradient
                colors={['transparent', '#4B006E']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1.5 }}
              />
              <View style={styles.cardTextCont}>
                <Text style={styles.cardText}>Kundli/Birth</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.95} onPress={()=>navigation.navigate('Panchang')/*here add navigtion to panchang page */} style={styles.card}>
              <Image
                style={styles.cardImg}
                source={{
                  uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80', // Buddhist monk in orange robe
                }}
              />
              <LinearGradient
                colors={['transparent', '#4B006E']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1.5 }}
              />
              <View style={styles.cardTextCont}>
                <Text style={styles.cardText}>Panchang</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* astrologer card container  */}
        <View style={styles.astroCont}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: moderateScale(2)}}>
            <Text style={styles.astrologer}>Astrologer</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Talk')}>
              <View>
                <Text style={styles.seeMoreText}>See more</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <FlatList
              data={ASTROLOGERS}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
              renderItem={({ item }) => <PersonCard item={item} navigation={navigation} />}
              style={{ minHeight: moderateScale(180) }}
            />
          </View>
        </View>

        {/* Paid services  */}
        <View style={styles.serviceCard}>
          <Text style={styles.serviceText}>Paid Services</Text>
          <View style={styles.innService}>
            <View style={styles.card}>
              <Image
                style={styles.cardImg}
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/32.jpg', // Example astrologer image
                }}
              />
              <LinearGradient
                colors={['transparent', '#4B006E']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1.5 }}
              />
              <View style={styles.cardTextCont}>
                <Text style={styles.cardText}>Pandits</Text>
              </View>
            </View>
            <TouchableOpacity  activeOpacity={0.95} onPress={()=>navigation.navigate('Pooja')} style={styles.card}>
              <Image
                style={styles.cardImg}
                source={{
                  uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80', // Diwali/candle themed image (no h/w params)
                }}
              />
              <LinearGradient
                colors={['transparent', '#4B006E']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1.5 }}
              />
              <View style={styles.cardTextCont}>
                <Text style={styles.cardText}>Pooja</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* pandit card container (same style as astrologer card) */}
        <View style={styles.panditCont}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: moderateScale(2)}}>
            <Text style={styles.astrologer}>Pooja</Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Pooja')}>
              <View>
                <Text style={styles.seeMoreText}>See more</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View>
            <FlatList
              data={poojaCard.slice(0, 10)}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
              renderItem={({ item }) => <PoojaCard item={item} navigation={navigation} />}
              style={{ minHeight: moderateScale(180) }}
            />
          </View>
        </View>

        {/* improved small banner with secure chat text */}
        <View style={styles.imgcont}>
          <View style={styles.banner1Wrapper}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=900&q=80', // A more modern, secure, chat-like image
              }}
              style={styles.banner1}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.0)', 'rgba(88,10,70,0.7)']}
              style={styles.banner1Gradient}
              start={{ x: 0.5, y: 0.2 }}
              end={{ x: 0.5, y: 1 }}
            />
            <View style={styles.bannerTextContainer}>
              <LockClosedIcon size={moderateScale(28)} color="#fff" style={{marginBottom: moderateScale(4)}} />
              <Text style={styles.bannerMainText}>Your Chats are Secure</Text>
              <Text style={styles.bannerSubText}>End-to-end encrypted & private</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFE7FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFE7FA',
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(5),
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(30),
    minHeight: SCREEN_HEIGHT,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(25),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(18),
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4 * scale(1),
    elevation: 2,
    marginBottom: moderateScale(10),
  },
  placeholderText: {
    flex: 1,
    color: '#989898',
    fontSize: moderateScale(15),
    fontWeight: '400',
  },
  icon: {
    marginLeft: moderateScale(8),
  },
  imgcont: {
    marginTop: '5%',
    marginBottom: '1%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerWrapper: {
    width: '100%',
    position: 'relative',
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#580A46',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  banner: {
    width: '100%',
    height: verticalScale(200),
    borderRadius: moderateScale(16),
  },
  bannerGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: moderateScale(16),
  },
  bannerTextContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: moderateScale(18),
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    zIndex: 2,
  },
  bannerMainText: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
    marginBottom: moderateScale(2),
  },
  bannerSubText: {
    color: '#fff',
    fontSize: moderateScale(15),
    fontWeight: '500',
    opacity: 0.85,
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  banner1Wrapper: {
    width: '100%',
    position: 'relative',
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#580A46',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  banner1: {
    width: '100%',
    height: verticalScale(100),
    borderRadius: moderateScale(12),
  },
  banner1Gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: moderateScale(12),
  },
  banner1TextContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: moderateScale(10),
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: moderateScale(8),
  },
  banner1MainText: {
    color: '#fff',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.3,
  },
  textCon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1%',
  },
  largeText: {
    paddingVertical: '3%',
    paddingHorizontal: '10%',
    backgroundColor: 'rgba(88, 10, 70, 0.2)',
    borderRadius: moderateScale(25),
  },
  horoscopeText: {
    fontSize: moderateScale(20),
    color: '#580A46',
    fontWeight: 'bold',
  },
  navambhaw: {
    color: 'rgba(88, 10, 70, 0.4)',
    fontSize: moderateScale(30),
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  serviceText: {
    color: '#580A46',
    fontSize: moderateScale(20),
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    textAlign: 'center',
  },
  astroCont: {
    marginTop: '2%',
  },
  panditCont: {
    marginTop: '2%',
  },
  astrologer: {
    color: '#580A46',
    fontSize: moderateScale(20),
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  seeMoreText: {
    color: '#B388D9', // light purple
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginLeft: moderateScale(10),
    // not a button, just text
  },
  serviceCard: {
    backgroundColor: '#fff0fa',
    marginTop: '5%',
    borderRadius: moderateScale(18),
    shadowColor: '#ffadec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    paddingVertical: '1%',
  },
  innService: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'relative',
    width: '44%',
    borderRadius: moderateScale(15),
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#684444bb',
    marginBottom: moderateScale(14),
    shadowColor: '#580A46',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardImg: {
    width: '100%',
    height: verticalScale(80),
    borderRadius: moderateScale(15),
  },
  cardTextCont: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 1,
    backgroundColor: 'rgba(255,255,255,0.92)',
    shadowColor: '#580A46',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    textAlign: 'left',
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#580A46',
    letterSpacing: 0.5,
  },
  // PersonCard styles (shared for astrologer and pandit)
  personCardContainer: {
    alignItems: 'center',
    marginRight: moderateScale(18),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4 * scale(1),
    elevation: 2,
    minWidth: moderateScale(120),
    maxWidth: moderateScale(140),
    borderWidth: 2,
    borderColor: '#580A46',
    width: moderateScale(130),
    flexShrink: 1,
  },
  // PoojaCard custom style for yellowish tone
  poojaCardContainer: {
    alignItems: 'center',
    marginRight: moderateScale(18),
    backgroundColor: '#fffbe6', // light yellowish background
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    shadowColor: '#FFD700', // gold/yellow shadow
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    minWidth: moderateScale(120),
    maxWidth: moderateScale(140),
    borderWidth: 2,
    borderColor: '#e6c200', // gold border
    width: moderateScale(130),
    flexShrink: 1,
  },
  personImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginBottom: moderateScale(8),
  },
  personName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#580A46',
    textAlign: 'center',
    width: '100%',
    flexWrap: 'wrap',
    minHeight: moderateScale(18),
    maxWidth: '100%',
    marginBottom: moderateScale(2),
  },
  personAmount: {
    fontSize: moderateScale(13),
    color: '#757575',
    marginTop: moderateScale(2),
    marginBottom: moderateScale(8),
    textAlign: 'center',
  },
  startChatWrapper: {
    marginTop: moderateScale(4),
    width: '100%',
    alignItems: 'center',
  },
  startChatButton: {
    backgroundColor: '#580A46',
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(16),
  },
  startChatText: {
    color: '#fff',
    fontWeight: Platform.OS === 'ios' ? '500' : 'bold',
    fontSize: moderateScale(13),
  },
  // PoojaCard button style (yellowish)
  poojaStartChatButton: {
    backgroundColor: '#ffe066', // yellow button
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(16),
  },
  poojaStartChatText: {
    color: '#8d6a00', // dark gold text
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    fontSize: moderateScale(13),
  },
});
