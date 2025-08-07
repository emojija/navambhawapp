import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import {LinearGradient} from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native';

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

const PANDITS = [
  {
    id: '1',
    name: 'Thich Nhat Hanh',
    amount: '₹30/min',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&facepad=2&q=80', // Buddhist monk
  },
  {
    id: '2',
    name: 'Jetsunma Tenzin Palmo',
    amount: '₹28/min',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&facepad=2&q=80', // Buddhist nun
  },
  {
    id: '3',
    name: 'Ajahn Brahm',
    amount: '₹32/min',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&q=80', // Monk
  },
  {
    id: '4',
    name: 'Khandro Rinpoche',
    amount: '₹27/min',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&facepad=2&q=80', // Nun
  },
  {
    id: '5',
    name: 'Dzongsar Khyentse Rinpoche',
    amount: '₹35/min',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&facepad=2&q=80', // Monk
  },
  {
    id: '6',
    name: 'Pema Chödrön',
    amount: '₹29/min',
    image: 'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=facearea&facepad=2&q=80', // Nun
  },
];

// Card for Astrologer and Pandit (shared style and logic)
const PersonCard = ({ item }) => {
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
      <View style={styles.startChatWrapper}>
        <View style={styles.startChatButton}>
          <Text style={styles.startChatText}>Start Chat</Text>
        </View>
      </View>
    </View>
  );
};

const HomeTab = (props) => {
  // Accept navigation from props or useNavigation as fallback
  const navigation = useNavigation()

  return (
    <ScrollView style={styles.container}>
      {/* search bar  */}
      <TouchableOpacity
        style={styles.searchBar}
        activeOpacity={0.8}
        onPress={() =>  navigation.navigate('SearchAstro')}
      >
        <Text style={styles.placeholderText}>Search Astrologers</Text>
        <MagnifyingGlassIcon
          size={moderateScale(25)}
          color="#757575"
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* image banner  */}
      <View style={styles.imgcont}>
        <Image
          style={styles.banner}
          source={{
            uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Beautiful mountain lake scene
          }}
          resizeMode="cover"
        />
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
          
          <View style={styles.card}>
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
          </View>
          <View style={styles.card}>
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
          </View>
        </View>
      </View>
      {/* astrologer card container  */}
      <View style={styles.astroCont}>
        <Text style={styles.astrologer}>Astrologer</Text>
        <View>
          <FlatList
            data={ASTROLOGERS}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => <PersonCard item={item} />}
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
          <View style={styles.card}>
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
          </View>
        </View>
      </View>

      {/* pandit card container (same style as astrologer card) */}
      <View style={styles.panditCont}>
        <Text style={styles.astrologer}>Pandit</Text>
        <View>
          <FlatList
            data={PANDITS}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => <PersonCard item={item} />}
          />
        </View>
      </View>
      
      {/* banner  */}
      <View style={styles.imgcont}>
        <Image
          //  change the below photo for secure chat like something
          source={{
            uri: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80', // Universe-themed image
          }}
          style={styles.banner1}
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(5),
    paddingHorizontal: moderateScale(10),
    backgroundColor: '#FFE7FA',
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
  },
  placeholderText: {
    flex: 1,
    color: '#757575',
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  icon: {
    marginLeft: moderateScale(8),
  },
  imgcont: {
    marginTop: '5%',
    marginBottom:'3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: verticalScale(200),
    borderRadius: moderateScale(10),
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
  banner1: {
    width: '100%',
    height: verticalScale(100),
    borderRadius: moderateScale(10),
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
});
