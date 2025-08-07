import { Image, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window');

const services = [
  {
    img : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80',
    text: "Get Your Kundli",
    subtitle: "Personalized Vedic Horoscope",
    banner: "Most Popular"
  },
  {
    img : 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    text: "Book a Pooja",
    subtitle: "Book Rituals & Ceremonies",
    banner: "New"
  },
  {
    img : 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    text: "Panchang",
    subtitle: "Know about your day",
    banner: "Recommended"
  },
  {
    img : 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    text: "Match Making",
    subtitle: "Check Compatibility Instantly",
    banner: "Trending"
  }
];

const ServiceCard = ({ img, text, subtitle, banner }) => (
  <View style={styles.cardContainer}>
    <Image
      source={{ uri: img }}
      style={styles.cardImage}
      resizeMode="cover"
    />
    {/* Banner on top left */}
    <View style={styles.bannerContainer}>
      <LinearGradient
        colors={['#ffb347', '#ff5e62']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bannerGradient}
      >
        <Text style={styles.bannerText}>{banner}</Text>
      </LinearGradient>
    </View>
    <LinearGradient
      colors={['transparent', '#4B2067ee']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientOverlay}
    >
      <View style={styles.textContainer}>
        <Text style={styles.cardText}>{text}</Text>
        <Text
          style={styles.cardSubtitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {subtitle}
        </Text>
      </View>
    </LinearGradient>
  </View>
);

const ServiceTab = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f9f7fc' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {services.map((service, idx) => (
          <ServiceCard
            key={idx}
            img={service.img}
            text={service.text}
            subtitle={service.subtitle}
            banner={service.banner}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default ServiceTab

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 28,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#82428f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 2,
    borderRadius: 10,
    overflow: 'hidden',
    minWidth: 90,
    minHeight: 32,
    alignSelf: 'flex-start',
    elevation: 6,
    shadowColor: '#ffb347',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  bannerGradient: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
    minWidth: 90,
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
    textShadowColor: '#00000033',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textTransform: 'uppercase',
  },
  gradientOverlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  textContainer: {
    width: '65%',
    minHeight: 90,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 32,
    paddingLeft: 12,
    paddingBottom: 24,
    backgroundColor: 'transparent',
  },
  cardText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'right',
    letterSpacing: 1,
    textShadowColor: '#4B2067cc',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    marginBottom: 4,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 0,
    overflow: 'visible',
    elevation: 0,
  },
  cardSubtitle: {
    color: '#fff',
    fontSize: 15.5,
    fontWeight: '600',
    textAlign: 'right',
    letterSpacing: 0.2,
    textShadowColor: '#00000055',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    backgroundColor: 'transparent',
    marginTop: 0,
    maxWidth: '100%',
  },
});