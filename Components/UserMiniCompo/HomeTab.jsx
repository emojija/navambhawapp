import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Image,
  FlatList
} from 'react-native';
import React from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

// Responsive utility for font size and spacing
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = Math.min(SCREEN_WIDTH / 375, SCREEN_HEIGHT / 667); // iPhone 8 baseline

const scaleSize = size => Math.round(size * scale);

const HomeTab = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={styles.placeholderText}>Search Astrologerss</Text>
        <MagnifyingGlassIcon
          size={scaleSize(25)}
          color="#757575"
          style={styles.icon}
        />
      </View>

      <View style={styles.imgcont}>
        <Image
          style={styles.banner}
          source={{
            uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Beautiful mountain lake scene
          }}
        />
      </View>

      <View style={styles.textCon}>
        <View style={styles.largeText}>
            <Text style={styles.horoscopeText}>Get daily horoscope with</Text>
        </View>
        <Text style={styles.navambhaw}>Navambhaw</Text>
      </View>

      <View style={styles.astroCont}>
        <Text style={styles.astrologer}>Astrologer</Text>
        <View>
        <FlatList
          data={[
            { id: '1', name: 'Priya Sharma', amount: '₹20/min', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
            { id: '2', name: 'Rohan Mehta', amount: '₹25/min', image: 'https://randomuser.me/api/portraits/men/34.jpg' },
            { id: '3', name: 'Sneha Verma', amount: '₹18/min', image: 'https://randomuser.me/api/portraits/women/45.jpg' },
            { id: '4', name: 'Amit Singh', amount: '₹22/min', image: 'https://randomuser.me/api/portraits/men/56.jpg' },
            { id: '5', name: 'Kavita Joshi', amount: '₹19/min', image: 'https://randomuser.me/api/portraits/women/67.jpg' },
            { id: '6', name: 'Vikram Patel', amount: '₹23/min', image: 'https://randomuser.me/api/portraits/men/78.jpg' },
          ]}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
          renderItem={({ item }) => (
            <View
              style={{
                alignItems: 'center',
                marginRight: scaleSize(18),
                backgroundColor: '#fff',
                borderRadius: scaleSize(12),
                padding: scaleSize(10),
                shadowColor: '#000',
                shadowOpacity: 0.07,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4 * scale,
                elevation: 2,
                minWidth: scaleSize(110),
                borderWidth: 2,
                borderColor: '#580A46',
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: scaleSize(50),
                  height: scaleSize(50),
                  borderRadius: scaleSize(25),
                  marginBottom: scaleSize(8),
                }}
              />
              <Text style={{ fontSize: scaleSize(14), fontWeight: '600', color: '#580A46' }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: scaleSize(13), color: '#757575', marginTop: scaleSize(2), marginBottom: scaleSize(8) }}>
                {item.amount}
              </Text>
              <View
                style={{
                  marginTop: scaleSize(4),
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#580A46',
                    borderRadius: scaleSize(8),
                    paddingVertical: scaleSize(6),
                    paddingHorizontal: scaleSize(16),
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '500', fontSize: scaleSize(13) }}>
                    Start Chat
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
        </View>
      </View>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    paddingTop: scaleSize(5),
    paddingHorizontal: scaleSize(10),
    backgroundColor: '#FFE7FA',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: scaleSize(25),
    paddingVertical: scaleSize(10),
    paddingHorizontal: scaleSize(18),
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4 * scale,
    elevation: 2,
  },
  placeholderText: {
    flex: 1,
    color: '#757575',
    fontSize: scaleSize(16),
    fontWeight: '400',
  },
  icon: {
    marginLeft: scaleSize(8),
  },
  imgcont: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  textCon:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'5%'
  },
  largeText:{
    paddingVertical:'3%',
    paddingHorizontal:'10%',
    backgroundColor:'rgba(88, 10, 70, 0.2)',
    borderRadius:25,
  },
  horoscopeText:{
    fontSize:20,
    color:'#580A46',
    fontWeight:'bold'
  },
  navambhaw:{
    color:'rgba(88, 10, 70, 0.4)',
    fontSize:30,
    fontWeight:500
  },
  ast:{},
  astrologer:{
   color:'#580A46',
   fontSize:20,
   fontWeight:400
  }
});
