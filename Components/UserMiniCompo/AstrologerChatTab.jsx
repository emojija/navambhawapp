import { useNavigation } from '@react-navigation/native';
import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';


// Responsive utility functions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const specilazation = [
  "All",
  "Vedic Astrology",
  "Vastu",
  "Tarot",
  "Palmistry",
  'Reiki',
  "Numerology",
  "Lal Kitab",
  'kpastrology',
  "kundli"
];

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

// AstrologerCard component for rendering each astrologer card
// const fakeAstrologerCard = ({  }) => {
//   return (
//     <View style={styles.cardContainer}>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Image source={{ uri: '' }} style={styles.avatar} />
//         <View style={styles.expTextContainer}>
//           <Text style={styles.expText}> yrs exp</Text>
//         </View>
//       </View>
//       <View style={styles.cardInfo}>
     
//         <View style={styles.nameRow}>
//           <Text style={styles.name}></Text>
//         </View>
//         <Text style={styles.expertise} numberOfLines={1} ellipsizeMode="tail">
         
//         </Text>
       
//         <Text style={styles.details}>
         
//         </Text>
       
//         <View style={styles.priceChatRow}>
//           <Text style={styles.price}></Text>
//           <Text style={[styles.rating]}></Text>
//         </View>
//       </View>
//     </View>
//   );
// };
const AstrologerCard = ({ astrologer , navigation }) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('AstroProfile')} activeOpacity={0.95} style={styles.cardContainer}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{ uri: astrologer.image }} style={styles.avatar} />
        <View style={styles.expTextContainer}>
          <Text style={styles.expText}>{astrologer.experience} yrs exp</Text>
        </View>
      </View>
      <View style={styles.cardInfo}>
     
        <View style={styles.nameRow}>
          <Text style={styles.name}>{astrologer.name}</Text>
        </View>
        <Text style={styles.expertise} numberOfLines={1} ellipsizeMode="tail">
          {astrologer.expertise.join(', ')}
        </Text>
       
        <Text style={styles.details}>
          {astrologer.languages.join(', ')}
        </Text>
       
        <View style={styles.priceChatRow}>
          <Text style={styles.price}>₹{astrologer.pricePerMin}/min</Text>
          <Text style={[styles.rating]}>⭐ {astrologer.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Separated RenderItem component
const SpecializationItem = ({ item, selected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.specializationItem,
      selected && { backgroundColor: '#82428f' }
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text
      style={[
        styles.specializationText,
        selected && { color: '#fff' }
      ]}
    >
      {item}
    </Text>
  </TouchableOpacity>
);

const ChatTab = () => {
  const [selectedSpec, setSelectedSpec] = useState("All");
  const navigation  = useNavigation()
  // const [isLoading,setIsLoadidng] = useState(null)

  const filteredAstrologers = useMemo(() => {
    if (selectedSpec === "All") return astrologers;
    // Remove spaces and lowercase for comparison
    const selectedKey = selectedSpec.replace(/\s/g, '').toLowerCase();
    return astrologers.filter(ast =>
      ast.expertise.some(exp =>
        exp.replace(/\s/g, '').toLowerCase().includes(selectedKey)
      )
    );
  }, [selectedSpec]);

  return (
    <View style={styles.chatCont}>
      <View style={styles.topSelector}>
        <FlatList
          data={specilazation}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <SpecializationItem
              item={item}
              selected={item === selectedSpec}
              onPress={() => setSelectedSpec(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: moderateScale(10) }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredAstrologers}
          horizontal={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <AstrologerCard astrologer={item} navigation={navigation} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(10),
            paddingVertical: verticalScale(8),
            paddingBottom: verticalScale(20)
          }}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: '#82428f', fontSize: scale(16), fontWeight: '600' }}>
                No astrologers found for this specialization.
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default ChatTab;

const styles = StyleSheet.create({
  chatCont: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f9f7fc',
    borderTopWidth: 1,
    borderColor: 'white',
  },
  topSelector: {
    position: 'static',
    top: '0',
    paddingTop: verticalScale(2),
    paddingBottom: verticalScale(2),
    backgroundColor: '#f9f7fc',
  },
  specializationItem: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: moderateScale(16),
    backgroundColor: '#f2e6fa',
    borderRadius: moderateScale(20),
    marginRight: moderateScale(10),
    marginVertical: verticalScale(8),
    // Shadow for iOS
    shadowColor: '#82428f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  specializationText: {
    color: '#82428f',
    fontWeight: '600',
    fontSize: scale(15),
    letterSpacing: 0.2,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: moderateScale(16),
    padding: moderateScale(14),
    marginBottom: verticalScale(14),
    alignItems: 'center',
    borderTopWidth: 10,
    borderTopColor: '#1dc243',
    // Shadow for iOS
    shadowColor: '#82428f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 4,
    width: '100%',
    minHeight: verticalScale(110),
    position: 'relative',
  },
  avatar: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(32),
    marginRight: moderateScale(16),
    borderWidth: 2,
    borderColor: '#e5d0f7',
    backgroundColor: '#eee',
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(2),
    width: '100%',
  },
  name: {
    fontSize: scale(18),
    fontWeight: '700',
    color: '#4B2067',
    letterSpacing: 0.2,
    flexShrink: 1,
  },
  rating: {
    // fontSize is now set dynamically in the component
    color: '#ffb300',
    fontWeight: '600',
    marginLeft: moderateScale(8),
    backgroundColor: '#fff7e6',
    paddingHorizontal: moderateScale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    fontSize:20,
    marginBottom: 0,
  },
  expertise: {
    fontSize: scale(14),
    color: '#82428f',
    fontWeight: '500',
    marginBottom: verticalScale(2),
    letterSpacing: 0.1,
    maxWidth: '95%',
  },
  details: {
    fontSize: scale(13),
    color: '#6c5b7b',
    marginBottom: verticalScale(4),
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  priceChatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: verticalScale(4),
  },
  price: {
    fontSize: scale(14),
    color: '#82428f',
    fontWeight: '600',
    marginLeft: moderateScale(8),
    backgroundColor: '#f3e6fa',
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    marginBottom: 0,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  chatButton: {
    backgroundColor: '#82428f',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(18),
    alignSelf: 'flex-end',
    shadowColor: '#82428f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
    marginLeft: moderateScale(10),
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: scale(15),
    letterSpacing: 0.5,
  },
  expTextContainer: {
    width: scale(64),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(4),
  },
  expText: {
    backgroundColor: 'transparent',
    color: '#82428f',
    fontWeight: '500',
    fontSize: scale(12),
    borderRadius: moderateScale(6),
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlign: 'center',
    overflow: 'hidden',
    width: '100%',
  },
});