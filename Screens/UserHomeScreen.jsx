import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BookOpenIcon,
  ChatBubbleLeftIcon,
  HomeIcon,
  InboxArrowDownIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  UserIcon,
  WalletIcon,
} from 'react-native-heroicons/outline';
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  ChatBubbleLeftIcon as ChatBubbleLeftIconSolid,
  PhoneIcon as PhoneIconSolid,
  InboxArrowDownIcon as InboxArrowDownIconSolid,
} from 'react-native-heroicons/solid';
import HomeTab from '../Components/UserMiniCompo/HomeTab';
import ChatTab from '../Components/UserMiniCompo/ChatTab';
import CallTab from '../Components/UserMiniCompo/CallTab';
import KundliTab from '../Components/UserMiniCompo/KundliTab';
import ServiceTab from '../Components/UserMiniCompo/ServiceTab';

// Responsive utility for font size
const scaleFont = size => {
  const { width, height } = Dimensions.get('window');
  // Use smaller dimension for scaling (portrait/landscape/tablet)
  const scale = Math.min(width / 375, height / 667); // 375x667 is iPhone 8 baseline
  return Math.round(size * scale);
};

const USER_IMAGE = 'https://randomuser.me/api/portraits/men/32.jpg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Use min dimension for avatar/icon sizing for better tablet support
const BASE_DIM = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
const IMAGE_SIZE = Math.round(BASE_DIM * 0.14); // 14% of min screen dimension
const ICON_SIZE = Math.round(BASE_DIM * 0.07);
const WALLET_ICON_SIZE = ICON_SIZE; // Sync wallet icon size with others

const ICON_COLOR = '#580A46'; // Unified icon color for top icons
const LOWER_BAR_ICON_COLOR = '#454545'; // Light black for lower bar icons
const LOWER_BAR_ICON_ACTIVE_COLOR = '#580A46'; // Active icon color

const UserHomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState('Home');

  const renderMidPart = () => {
    switch (activeIndex) {
      case 'Home':
        return <HomeTab />;
      case 'Chat':
        return <ChatTab />;
      case 'Call':
        return <CallTab />;
      case 'Kundli':
        return <KundliTab />;
      case 'Services':
        return <ServiceTab />;
    }
  };
  return (
    <View style={styles.mainCont}>
      <SafeAreaView edges={['top', 'left', 'right']}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
          translucent={false}
          hidden={false}
        />
        {/* Top name info Bar  */}
        <View style={styles.topBar}>
          {/* name and pic  */}
          <View style={styles.topLeft}>
            <View
              style={[
                styles.imgCont,
                {
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: IMAGE_SIZE / 2,
                },
              ]}
            >
              <Image
                style={[
                  styles.leftImg,
                  {
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: IMAGE_SIZE / 2,
                  },
                ]}
                source={{ uri: USER_IMAGE }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.leftTextCont}>
              <Text style={styles.nameText}>Ashish</Text>
              <Text style={styles.welcomeText}>Welcome</Text>
            </View>
          </View>
          {/* amount profile and search */}
          <View style={styles.topRight}>
            <TouchableOpacity style={styles.moneyBox}>
              <Text style={styles.money}>Rs 1000</Text>
              <WalletIcon color="white" size={WALLET_ICON_SIZE} />
            </TouchableOpacity>

            {/* Always show search icon in top bar, not just for non-Home */}
            {activeIndex !== 'Home'&& <TouchableOpacity style={styles.profileBox}>
              <MagnifyingGlassIcon color="white" size={ICON_SIZE} />
            </TouchableOpacity>}

            <View style={styles.profileBox}>
              <UserIcon color="white" size={ICON_SIZE} />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView>{renderMidPart()}</ScrollView>

      <SafeAreaView
        style={{ backgroundColor: 'white', padding: 0 }}
        edges={['left', 'right', 'bottom']}
      >
        <View style={styles.lowerBar}>
          <TouchableOpacity onPress={() => setActiveIndex('Home')} style={styles.lowerBarItem}>
            {activeIndex === 'Home' ? (
              <HomeIconSolid
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_ACTIVE_COLOR}
                style={styles.lowerBarIcon}
              />
            ) : (
              <HomeIcon
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_COLOR}
                style={styles.lowerBarIcon}
              />
            )}
            <Text
              style={[
                styles.lowerBarText,
                activeIndex === 'Home' && { color: LOWER_BAR_ICON_ACTIVE_COLOR, fontWeight: '700' },
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveIndex('Kundli')}
            style={styles.lowerBarItem}
          >
            {activeIndex === 'Kundli' ? (
              <BookOpenIconSolid
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_ACTIVE_COLOR}
                style={styles.lowerBarIcon}
              />
            ) : (
              <BookOpenIcon
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_COLOR}
                style={styles.lowerBarIcon}
              />
            )}
            <Text
              style={[
                styles.lowerBarText,
                activeIndex === 'Kundli' && { color: LOWER_BAR_ICON_ACTIVE_COLOR, fontWeight: '700' },
              ]}
            >
              Kundli
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveIndex('Chat')}
            style={styles.lowerBarItem}
          >
            {activeIndex === 'Chat' ? (
              <ChatBubbleLeftIconSolid
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_ACTIVE_COLOR}
                style={styles.lowerBarIcon}
              />
            ) : (
              <ChatBubbleLeftIcon
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_COLOR}
                style={styles.lowerBarIcon}
              />
            )}
            <Text
              style={[
                styles.lowerBarText,
                activeIndex === 'Chat' && { color: LOWER_BAR_ICON_ACTIVE_COLOR, fontWeight: '700' },
              ]}
            >
              Chat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveIndex('Call')}
            style={styles.lowerBarItem}
          >
            {activeIndex === 'Call' ? (
              <PhoneIconSolid
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_ACTIVE_COLOR}
                style={styles.lowerBarIcon}
              />
            ) : (
              <PhoneIcon
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_COLOR}
                style={styles.lowerBarIcon}
              />
            )}
            <Text
              style={[
                styles.lowerBarText,
                activeIndex === 'Call' && { color: LOWER_BAR_ICON_ACTIVE_COLOR, fontWeight: '700' },
              ]}
            >
              Call
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveIndex('Services')}
            style={styles.lowerBarItem}
          >
            {activeIndex === 'Services' ? (
              <InboxArrowDownIconSolid
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_ACTIVE_COLOR}
                style={styles.lowerBarIcon}
              />
            ) : (
              <InboxArrowDownIcon
                size={ICON_SIZE}
                color={LOWER_BAR_ICON_COLOR}
                style={styles.lowerBarIcon}
              />
            )}
            <Text
              style={[
                styles.lowerBarText,
                activeIndex === 'Services' && { color: LOWER_BAR_ICON_ACTIVE_COLOR, fontWeight: '700' },
              ]}
            >
              Services
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UserHomeScreen;

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    backgroundColor: '#FFE7FA',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#ffffff',
    paddingHorizontal: SCREEN_WIDTH * 0.02, // 2% of width
    paddingVertical: SCREEN_HEIGHT * 0.01, // 1% of height
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SCREEN_WIDTH * 0.025, // 2.5% of width
    overflow: 'hidden',
  },
  leftImg: {
    backgroundColor: 'black',
  },
  leftTextCont: {},
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
    // Use gap if supported, else fallback to margin
    ...(Platform.OS === 'web' ? { gap: 10 } : {}),
    marginLeft: SCREEN_WIDTH * 0.025,
  },
  moneyBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#671453e4',
    borderWidth: 1,
    borderColor: '#580A46',
    paddingHorizontal: SCREEN_WIDTH * 0.03, // 4% of width
    paddingVertical: SCREEN_HEIGHT * 0.003, // 0.8% of height
    borderRadius: 25,
    marginRight: SCREEN_WIDTH * 0.025,
  },
  money: {
    fontSize: scaleFont(15),
    fontWeight: '400',
    color: 'white',
    marginRight: 6,
  },
  profileBox: {
    borderWidth: 1,
    borderColor: '#580A46',
    borderRadius: 25,
    backgroundColor: '#580a46e5',
    padding: SCREEN_WIDTH * 0.01, // 2% of width
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SCREEN_WIDTH * 0.015, // Add a little space between icons
  },
  lowerBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingTop: '2%',
    backgroundColor: 'white',
    borderTopColor: '#580a466c',
    borderTopWidth: 1,
  },
  lowerBarItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerBarIcon: {},
  lowerBarText: { fontSize: 15, fontWeight: 500 },
});
