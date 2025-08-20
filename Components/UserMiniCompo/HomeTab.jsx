import { StyleSheet,  Text, View, Dimensions, Image, FlatList, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, LockClosedIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'react-native-linear-gradient';
import axios from 'axios';
import Carousel from 'react-native-reanimated-carousel';

// Responsive utility for font size and spacing
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// Card for Astrologer and Pandit (shared style and logic)
const AstroCard = ({ item, navigation }) => {
  // Show only first 12 characters of name, add "..." if longer
  let displayName = item.username;
  if (typeof displayName === 'string' && displayName.length > 12) {
    displayName = displayName.slice(0, 12) + '..';
  }
  return (
    <View style={styles.personCardContainer}>
      <Image
        source={{ uri: `${item.profileImage}` }}
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
      <Text style={styles.personAmount}>₹{item.price}/min</Text>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => {
          navigation.navigate('AstroProfile', { astroData: item });
        }}
        style={styles.startChatWrapper}
      >
        <View style={styles.startChatButton}>
          <Text style={styles.startChatText}>View Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const PoojaCard = ({ item, navigation }) => {
  // Show only first 12 characters of name, add "..." if longer
  let displayName = item.Pooja_name;
  if (typeof displayName === 'string' && displayName.length > 12) {
    displayName = displayName.slice(0, 12) + '..';
  }
  return (
    <View style={styles.poojaCardContainer}>
      <Image
        source={{
          uri: `https://backend.navambhaw.com/pooja_image/${item.Pooja_image}`,
        }}
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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('PoojaInfo', { poojaData: item.id });
          }}
        >
          <View style={styles.poojaStartChatButton}>
            <Text style={styles.poojaStartChatText}>View Details</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const images = [
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80', // Galaxy
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=900&q=80', // Starry sky
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80', // Moon
]
const HomeTab = ({ navigation }) => {
  const [poojaCard, setPoojaCard] = useState([]);
  const [astroCard, setAstroCard] = useState([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Accept navigation from props or useNavigation as fallback

  // for calling pooja api
  useEffect(() => {
    const fetchPoojas = async () => {
      // setIsLoading(true);
      try {
        const res = await axios.get(
          'https://backend.navambhaw.com/v1/allpoojas',
        );
        if (res.status === 200 && Array.isArray(res.data?.data)) {
          setPoojaCard(res.data.data);

          console.log(res.data.data);
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

  useEffect(() => {
    const fetchAstrologers = async () => {
      // setIsLoading(true);
      try {
        const res = await axios.get(
          'https://backend.navambhaw.com/v1/fetchastrologers',
        );
        if (res.status === 200 && Array.isArray(res.data?.data)) {
          setAstroCard(res.data.data);

          console.log(res.data.data);
        } else {
          setAstroCard([]);
          console.warn('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Failed to fetch poojas:', error);
        setAstroCard([]);
      } finally {
        // setIsLoading(false);
      }
    };
    fetchAstrologers();
  }, []);

  // --- Carousel height/width fix ---
  // We'll use a fixed aspect ratio and padding for the carousel container and images.
  // Let's use 16:9 aspect ratio for the banner, and make it responsive to screen width.

  const CAROUSEL_WIDTH = SCREEN_WIDTH - moderateScale(16); // 8px padding on each side
  const CAROUSEL_HEIGHT = Math.round(CAROUSEL_WIDTH * 9 / 16) ; // 16:9 aspect ratio

  return (
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
        <View style={styles.searchBarInner}>
          <Text style={styles.placeholderText}>
            Search Astrologers, Pandits
          </Text>
          <MagnifyingGlassIcon
            size={moderateScale(25)}
            color="#757575"
            style={styles.searchIcon}
          />
        </View>
      </TouchableOpacity>

      {/* improved image banner with secure chat text */}
      <View style={styles.bannerOuter}>
        <View style={{ width: CAROUSEL_WIDTH, alignSelf: 'center', justifyContent: 'center' }}>
          <Carousel
            loop
            width={CAROUSEL_WIDTH}
            height={CAROUSEL_HEIGHT}
            autoPlay={true}
            autoPlayInterval={2000}      // how long to wait before next auto slide
            scrollAnimationDuration={800} // 800ms animation speed
            data={images}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,   // smaller = more gap
              parallaxScrollingOffset: 50,   // bigger = more distance
            }}
            // scrollAnimationDuration={1500}
            onSnapToItem={index => setCurrentIndex(index)}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{
                  width: CAROUSEL_WIDTH,
                  height: CAROUSEL_HEIGHT,
                  borderRadius: 12,
                  resizeMode: 'cover',
                }}
              />
            )}
          />

          {/* Pagination Dots */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              
            }}
          >
            {images.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  margin: 4,
                  backgroundColor: index === currentIndex ? 'black' : 'gray',
                }}
              />
            ))}
          </View>
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
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => navigation.navigate('Kundli')}
            style={styles.card}
          >
            <Image
              style={styles.cardImg}
              source={{
                uri: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80', // Photo of Earth from space
              }}
              resizeMode="cover"
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
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={
              () =>
                navigation.navigate(
                  'Panchang',
                ) /*here add navigtion to panchang page */
            }
            style={styles.card}
          >
            <Image
              style={styles.cardImg}
              source={{
                uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80', // Buddhist monk in orange robe
              }}
              resizeMode="cover"
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
        <View style={styles.astroTopBar}>
          <Text style={styles.astrologer}>Astrologer</Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Talk')}>
            <View>
              <Text style={styles.seeMoreText}>See more</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <FlatList
            data={astroCard}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => (
              <AstroCard item={item} navigation={navigation} />
            )}
            style={styles.flatListStyle}
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
              resizeMode="cover"
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
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => navigation.navigate('Pooja')}
            style={styles.card}
          >
            <Image
              style={styles.cardImg}
              source={{
                uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80', // Diwali/candle themed image (no h/w params)
              }}
              resizeMode="cover"
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
        <View style={styles.astroTopBar}>
          <Text style={styles.astrologer}>Pooja</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Pooja')}
          >
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
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => (
              <PoojaCard item={item} navigation={navigation} />
            )}
            style={styles.flatListStyle}
          />
        </View>
      </View>

      {/* improved small banner with secure chat text */}
      <View style={styles.bannerOuter}>
        <View style={styles.banner1Wrapper}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=80', // Web security: lock icon on digital background
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
            <LockClosedIcon
              size={moderateScale(28)}
              color="#fff"
              style={{ marginBottom: moderateScale(4) }}
            />
            <Text style={styles.bannerMainText}>Your Chats are Secure</Text>
            <Text style={styles.bannerSubText}>
              End-to-end encrypted & private
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE7FA',
  },
  scrollContent: {
    // paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(5),
    paddingBottom: moderateScale(10),
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
    marginHorizontal: moderateScale(8),
  },
  searchBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  searchIcon: {
    // No inline style, all styling here
    marginLeft: moderateScale(10),
  },
  bannerOuter: {
    paddingHorizontal: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  astroTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScale(2),
    paddingHorizontal: moderateScale(8),
  },
  flatListContent: {
    paddingVertical: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  flatListStyle: {
    minHeight: moderateScale(180),
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
    shadowOpacity: 0.1,
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
    marginTop: '2%',
  },
  largeText: {
    paddingVertical: '2%',
    paddingHorizontal: '7%',
    backgroundColor: 'rgba(88, 10, 70, 0.2)',
    borderRadius: moderateScale(25),
  },
  horoscopeText: {
    fontSize: moderateScale(18),
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
    marginTop: '2%',
    borderRadius: moderateScale(18),
    shadowColor: '#ffadec',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    paddingVertical: '1%',
    marginHorizontal: moderateScale(8),
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
    marginHorizontal: 0,
    paddingHorizontal: moderateScale(2), // a little horizontal padding in card
  },
  cardImg: {
    width: '100%',
    height: verticalScale(80),
    borderRadius: moderateScale(15),
    // Remove objectFit/resizeMode from here, handled in component
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
    marginHorizontal: moderateScale(5),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(6), // a little horizontal padding in card
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
    marginHorizontal: moderateScale(5),
    backgroundColor: '#fffbe6', // light yellowish background
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(6), // a little horizontal padding in card
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
    backgroundColor: '#fff',
    objectFit: 'fill',
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
  placeholderText: {
    color: 'gray',
  },
});
