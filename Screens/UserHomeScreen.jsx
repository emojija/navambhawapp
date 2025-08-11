import React from 'react';
import {  View,  Text,  Image,  StatusBar,  StyleSheet,  Dimensions,  Platform,  TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {  HomeIcon,  ChatBubbleLeftIcon,  GlobeAltIcon,  BookOpenIcon,  InboxArrowDownIcon,  MagnifyingGlassIcon,  PlusCircleIcon, UserIcon,  WalletIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeIconSolid, ChatBubbleLeftIcon as ChatBubbleLeftIconSolid, GlobeAltIcon as GlobeAltIconSolid, BookOpenIcon as BookOpenIconSolid, InboxArrowDownIcon as InboxArrowDownIconSolid } from 'react-native-heroicons/solid';

// Import your tab screens
import HomeTab from '../Components/UserMiniCompo/HomeTab';
import AstrologerChatTab from '../Components/UserMiniCompo/AstrologerChatTab';
import PoojaTab from '../Components/UserMiniCompo/PoojaTab';
import KundliTab from '../Components/UserMiniCompo/KundliTab';
import ServiceTab from '../Components/UserMiniCompo/ServiceTab';

// Screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_DIM = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
const IMAGE_SIZE = Math.round(BASE_DIM * 0.14);
const ICON_SIZE = Math.round(BASE_DIM * 0.07);
const WALLET_ICON_SIZE = ICON_SIZE;
const Money = 100;
const USER_IMAGE = 'https://randomuser.me/api/portraits/men/32.jpg';

// Font scaling helper
const scaleFont = (size) => {
  const scale = Math.min(SCREEN_WIDTH / 375, SCREEN_HEIGHT / 667);
  return Math.round(size * scale);
};

// Top bar component
const TopBar = ({ navigation }) => (
  <SafeAreaView edges={['top', 'left', 'right']} style={{ backgroundColor: '#FFE7FA' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <View style={styles.topBar}>
      {/* Left - Profile */}
      <View style={styles.topLeft}>
        <View
          style={[styles.imgCont, { width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: IMAGE_SIZE / 2 }]}
        >
          <Image
            style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: IMAGE_SIZE / 2 }}
            source={{ uri: USER_IMAGE }}
            resizeMode="cover"
          />
        </View>
        <View>
          <Text style={styles.nameText}>Ashish</Text>
          <Text style={styles.welcomeText}>Welcome</Text>
        </View>
      </View>

      {/* Right - Money, Search, Profile */}
       <View style={styles.topRight}>
        <View style={styles.moneyBox}>
          <Text style={styles.money}>Rs {Money}</Text>
          {Money < 100 ? (
            <PlusCircleIcon color="purple" size={WALLET_ICON_SIZE} />
          ) : (
            <WalletIcon color="purple" size={WALLET_ICON_SIZE} />
          )}
        </View> 

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('SearchAstro')}
          style={styles.profileBox}
        >
          <MagnifyingGlassIcon color="purple" size={ICON_SIZE} />
        </TouchableOpacity> */}

        <View style={styles.profileBox}>
          <UserIcon color="purple" size={ICON_SIZE} />
        </View>
      </View>
    </View>
  </SafeAreaView>
);

// Bottom tab navigator
const Tab = createBottomTabNavigator();

export default function UserHomeScreen() {
  return (
 
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          header: () => <TopBar navigation={navigation} />, // custom top bar
          tabBarActiveTintColor: '#580A46',
          tabBarInactiveTintColor: '#454545',
          animationEnabled: true,
          tabBarIcon: ({ color, size, focused }) => {
            switch (route.name) {
              case 'Home':
                return focused ? <HomeIconSolid color={color} size={size} /> : <HomeIcon color={color} size={size} />;
              case 'Kundli':
                return focused ? <BookOpenIconSolid color={color} size={size} /> : <BookOpenIcon color={color} size={size} />;
              case 'Talk':
                return focused ? <ChatBubbleLeftIconSolid color={color} size={size} /> : <ChatBubbleLeftIcon color={color} size={size} />;
              case 'Pooja':
                return focused ? <GlobeAltIconSolid color={color} size={size} /> : <GlobeAltIcon color={color} size={size} />;
              case 'Services':
                return focused ? <InboxArrowDownIconSolid color={color} size={size} /> : <InboxArrowDownIcon color={color} size={size} />;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Kundli" component={KundliTab} />
        <Tab.Screen name="Talk" component={AstrologerChatTab} />
        <Tab.Screen name="Pooja" component={PoojaTab} />
        <Tab.Screen name="Services" component={ServiceTab} />
      </Tab.Navigator>
   
  );
}

// Styles
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    paddingVertical: SCREEN_HEIGHT * 0.01,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgCont: {
    marginRight: SCREEN_WIDTH * 0.025,
    overflow: 'hidden',
  },
  nameText: {
    fontSize: scaleFont(20),
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: scaleFont(15),
    color: '#757575',
    fontWeight: '500',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? { gap: 10 } : {}),
    marginLeft: SCREEN_WIDTH * 0.025,
  },
  moneyBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff33',
    borderWidth: 2,
    borderColor: '#580a4654',
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_HEIGHT * 0.003,
    borderRadius: 25,
    marginRight: SCREEN_WIDTH * 0.025,
  },
  money: {
    fontSize: scaleFont(15),
    fontWeight: '400',
    color: 'purple',
    marginRight: 6,
  },
  profileBox: {
    borderWidth: 2,
    borderColor: '#580a4654',
    borderRadius: 25,
    backgroundColor: '#ffffff33',
    padding: SCREEN_WIDTH * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SCREEN_WIDTH * 0.015,
  },
});
