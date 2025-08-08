import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

// Responsive utility functions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const specilazation = [
  "All",
  "Festival",
  "Birth Related",
  "Marriage",
  "Ceremonial",
  "Temple Service"
];

// Show 6 fake cards while loading
const FAKE_POOJA_COUNT = 6;

const FakePoojaCard = () => (
  <View style={styles.poojaCardContainer}>
    <Image source={{ uri: ''}} style={styles.poojaImage} />
    <Text
      style={[
        styles.poojaName,
        {
          backgroundColor: '#f5e9b7',
          minHeight: 18,
          borderRadius: 4,
          width: '80%',
          alignSelf: 'center',
        }
      ]}
      numberOfLines={2}
    ></Text>
    <Text
      style={[
        styles.poojaSubtitle,
        {
          backgroundColor: '#f5e9b7',
          minHeight: 14,
          borderRadius: 4,
          width: '60%',
          alignSelf: 'center',
        }
      ]}
      numberOfLines={2}
    ></Text>
    <TouchableOpacity
      style={[
        styles.viewDetailsButton,
        { backgroundColor: '#f5e9b7', width: '100%', alignSelf: 'center' }
      ]}
      disabled
    >
      <Text style={[styles.viewDetailsButtonText, { color: '#f5e9b7' }]}>.</Text>
    </TouchableOpacity>
  </View>
);

// Card for each Pooja
const PoojaCard = ({ pooja ,navigation }) => (
  <View style={styles.poojaCardContainer}>
    <Image source={{ uri: `https://backend.navambhaw.com/pooja_image/${pooja.Pooja_image}` }} style={styles.poojaImage} />
    <Text style={styles.poojaName} numberOfLines={2}>{pooja.Pooja_name}</Text>
    <Text style={styles.poojaSubtitle} numberOfLines={2}>{pooja.Title}</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('PoojaInfo')} style={styles.viewDetailsButton}>
      <Text style={styles.viewDetailsButtonText}>View Details</Text>
    </TouchableOpacity>
  </View>
);

// Separated RenderItem component
const SpecializationItem = ({ item, selected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.specializationItem,
      selected && { backgroundColor: '#ffe066', borderColor: '#ffd700' }
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[
      styles.specializationText,
      selected && { color: '#ab8900', fontWeight: 'bold' }
    ]}>{item}</Text>
  </TouchableOpacity>
);

const CallTab = () => {
  const [pooja, setPooja] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation()
  useEffect(() => {
    const fetchPoojas = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('https://backend.navambhaw.com/v1/allpoojas');
        if (res.status === 200 && Array.isArray(res.data?.data)) {
          setPooja(res.data.data);
        } else {
          setPooja([]);
          console.warn('Unexpected response structure:', res.data);
        }
      } catch (error) {
        console.error('Failed to fetch poojas:', error);
        setPooja([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPoojas();
  }, []);

  // Filter pooja list based on selected specialization
  const filteredPooja = selectedSpec === 'All'
    ? pooja
    : pooja.filter(item => {
        if (!item.Type) return false;
        if (Array.isArray(item.Type)) {
          return item.Type.map(t => t.toLowerCase()).includes(selectedSpec.toLowerCase());
        }
        return String(item.Type).toLowerCase() === selectedSpec.toLowerCase();
      });

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
              selected={selectedSpec === item}
              onPress={() => setSelectedSpec(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: moderateScale(10) }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.cardsScrollContainer}>
        <View style={styles.cardsGrid}>
          {isLoading
            ? Array.from({ length: FAKE_POOJA_COUNT }).map((_, idx) => (
                <FakePoojaCard key={idx} />
              ))
            : filteredPooja.length > 0
              ? filteredPooja.map((item, idx) => (
                  <PoojaCard key={idx} pooja={item} navigation={navigation} />
                ))
              : (
                <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
                  <Text style={{ color: '#bfa900', fontSize: scale(16), fontWeight: '600' }}>
                    No poojas found for this specialization.
                  </Text>
                </View>
              )
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default CallTab;

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
    backgroundColor: '#fffbe6', // very light yellow
    borderRadius: moderateScale(25),
    marginRight: moderateScale(10),
    marginVertical: verticalScale(8),
    borderWidth: 1.5,
    borderColor: '#ffe066', // dark yellow border
    shadowColor: '#ffe066',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 3,
  },
  specializationText: {
    color: '#e4b700',
    fontWeight: '600',
    fontSize: scale(15),
    letterSpacing: 0.2,
  },
  cardsScrollContainer: {
    paddingVertical: verticalScale(8),
    paddingBottom: verticalScale(20),
    alignItems: 'center',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  poojaCardContainer: {
    width: SCREEN_WIDTH * 0.42,
    minHeight: verticalScale(200),
    backgroundColor: '#fffef8',
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: moderateScale(14),
    margin: moderateScale(8),
    shadowColor: '#ffe066',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 5,
  },
  poojaImage: {
    width: '100%',
    height: verticalScale(90),
    borderRadius: moderateScale(14),
    marginBottom: verticalScale(12),
    backgroundColor: '#fffde7',
    resizeMode: 'cover',
  },
  poojaName: {
    fontSize: scale(16),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: verticalScale(4),
    letterSpacing: 0.2,
  },
  poojaSubtitle: {
    fontSize: scale(13),
    color: '#555',
    textAlign: 'center',
    marginBottom: verticalScale(12),
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  viewDetailsButton: {
    backgroundColor: '#ffe066',
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(8),
    paddingHorizontal: moderateScale(18),
    alignItems: 'center',
    marginTop: 'auto',
    shadowColor: '#ffe066',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  viewDetailsButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: scale(14),
    letterSpacing: 0.5,
  },
});