import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions, ScrollView, Platform, PixelRatio } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';

// Responsive utility functions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

// Slightly reduce scale for a less "large" look, but still responsive
const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size * 0.93;
const verticalScale = size => (SCREEN_HEIGHT / guidelineBaseHeight) * size * 0.93;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor * 0.93;

// For font scaling, use PixelRatio for better cross-platform font sizing
const fontScale = size => size * PixelRatio.getFontScale() * (SCREEN_WIDTH / guidelineBaseWidth) * 0.93;

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
    <Image
      source={{
        uri: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
      }}
      style={[styles.poojaImage, { opacity: 0.3 }]}
    />
    <Text
      style={[
        styles.poojaName,
        {
          backgroundColor: '#f5e9b7',
          minHeight: verticalScale(15),
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
          minHeight: verticalScale(11),
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

const PoojaAstro = () => {
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
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: '#f9f7fc' }}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation && navigation.goBack) {
              navigation.goBack();
            }
          }}
          activeOpacity={0.7}
        >
          <ArrowLeftIcon color="#4B2067" size={scale(26)} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pooja</Text>
      </View>
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
            contentContainerStyle={{ paddingHorizontal: moderateScale(8) }}
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
                  <View style={{ width: '100%', alignItems: 'center', marginTop: verticalScale(30) }}>
                    <Text style={{ color: '#bfa900', fontSize: fontScale(14), fontWeight: '600' }}>
                      No poojas found for this specialization.
                    </Text>
                  </View>
                )
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PoojaAstro;

const styles = StyleSheet.create({
  chatCont: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f9f7fc',
    borderTopWidth: 1,
    borderColor: 'white',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: verticalScale(8),
    // paddingBottom: verticalScale(6),
    // paddingHorizontal: moderateScale(10),
    backgroundColor: '#f9f7fc',
    borderBottomWidth: 0.5,
    borderColor: '#f3e7b7',
    zIndex: 10,
  },
  backButton: {
    padding: moderateScale(4),
    marginRight: moderateScale(8),
  },
  headerTitle: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: '#4B2067',
    letterSpacing: 0.2,
  },
  topSelector: {
    position: 'static',
    top: '0',
    paddingTop: verticalScale(1),
    paddingBottom: verticalScale(1),
    backgroundColor: '#f9f7fc',
  },
  specializationItem: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: moderateScale(12),
    backgroundColor: '#fffbe6', // very light yellow
    borderRadius: moderateScale(20),
    marginRight: moderateScale(7),
    marginVertical: verticalScale(6),
    borderWidth: 1.2,
    borderColor: '#ffe066', // dark yellow border
    shadowColor: '#ffe066',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.11,
    shadowRadius: 3,
    elevation: 2,
  },
  specializationText: {
    color: '#e4b700',
    fontWeight: '600',
    fontSize: fontScale(13.5),
    letterSpacing: 0.2,
  },
  cardsScrollContainer: {
    paddingVertical: verticalScale(6),
    paddingBottom: verticalScale(14),
    alignItems: 'center',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  poojaCardContainer: {
    width: SCREEN_WIDTH * 0.39,
    minHeight: verticalScale(170),
    backgroundColor: '#fffef8',
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: moderateScale(10),
    margin: moderateScale(6),
    shadowColor: '#ffe066',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 7,
    elevation: 3,
  },
  poojaImage: {
    width: '100%',
    height: verticalScale(70),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(8),
    backgroundColor: '#fffde7',
    resizeMode: 'cover',
  },
  poojaName: {
    fontSize: fontScale(13.5),
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: verticalScale(2),
    letterSpacing: 0.2,
  },
  poojaSubtitle: {
    fontSize: fontScale(11.5),
    color: '#555',
    textAlign: 'center',
    marginBottom: verticalScale(8),
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  viewDetailsButton: {
    backgroundColor: '#ffe066',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(6),
    paddingHorizontal: moderateScale(13),
    alignItems: 'center',
    marginTop: 'auto',
    shadowColor: '#ffe066',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.13,
    shadowRadius: 3,
    elevation: 2,
  },
  viewDetailsButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: fontScale(12.5),
    letterSpacing: 0.5,
  },
});