import React, { useContext } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  HomeIcon, ChatBubbleLeftIcon, GlobeAltIcon,  BookOpenIcon, InboxArrowDownIcon, PlusCircleIcon, WalletIcon, ArrowLeftOnRectangleIcon, } from 'react-native-heroicons/outline';
import {  HomeIcon as HomeIconSolid,  ChatBubbleLeftIcon as ChatBubbleLeftIconSolid,  GlobeAltIcon as GlobeAltIconSolid,  BookOpenIcon as BookOpenIconSolid,  InboxArrowDownIcon as InboxArrowDownIconSolid,   } from 'react-native-heroicons/solid';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';

// Tab screens
import HomeTab from '../Components/UserMiniCompo/HomeTab';
import AstrologerChatTab from '../Components/UserMiniCompo/AstrologerChatTab';
import PoojaTab from '../Components/UserMiniCompo/PoojaTab';
import KundliTab from '../Components/UserMiniCompo/KundliTab';
import ServiceTab from '../Components/UserMiniCompo/ServiceTab';
// SideDrawer Tabs 
import Wallet from '../Components/UserMiniCompo/Wallet';
import ChatCallHistory from '../Components/UserMiniCompo/ChatCallHistory';
import EditProfile from '../Components/UserMiniCompo/EditProfile';
import ChangePassword from '../Components/UserMiniCompo/ChangePassword';
import { UserContext } from '../context/UserContext';

// Dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_DIM = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
const IMAGE_SIZE = Math.round(BASE_DIM * 0.1);
const ICON_SIZE = Math.round(BASE_DIM * 0.06);
const WALLET_ICON_SIZE = ICON_SIZE;
const Money = 100;
const USER_IMAGE = 'https://randomuser.me/api/portraits/men/32.jpg';

// Font scaling
const scaleFont = size => {
  const scale = Math.min(SCREEN_WIDTH / 375, SCREEN_HEIGHT / 667);
  return Math.round(size * scale);
};

// Top bar
const TopBar = ({ navigation }) => {
 const{userName} = useContext(UserContext)
  

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ backgroundColor: '#FFE7FA' }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
         
          <View>
            <Text style={styles.nameText}>
              {userName 
                ? (userName.length < 10
                    ? userName
                    : userName.split(" ")[0])
                : 'User'}
            </Text>
            <Text style={styles.welcomeText}>Welcome</Text>
          </View>
        </View>

        <View style={styles.topRight}>
          <View style={styles.moneyBox}>
            <Text style={styles.money}>Rs {Money}</Text>
            {Money < 100 ? (
              <PlusCircleIcon color="purple" size={WALLET_ICON_SIZE} />
            ) : (
              <WalletIcon color="purple" size={WALLET_ICON_SIZE} />
            )}
          </View>

          <TouchableOpacity style={styles.profileBox} onPress={() => navigation.replace('SignIn')}>
            <ArrowLeftOnRectangleIcon color="purple" size={ICON_SIZE} />
          </TouchableOpacity>
          {/* User button opens drawer */}
          <TouchableOpacity
            // style={styles.profileBox}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
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
              style={{
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
                borderRadius: IMAGE_SIZE / 2,
                objectFit:'fill'
              }}
              source={{ uri: USER_IMAGE }}
              resizeMode="cover"
            />
          </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Bottom Tabs
const Tab = createBottomTabNavigator();
function BottomTabs() {
  
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        header: (props) => <TopBar navigation={navigation}  />,
        tabBarActiveTintColor: '#580A46',
        tabBarInactiveTintColor: '#454545',
        animationEnabled: true,
        tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case 'Home':
              return focused ? (
                <HomeIconSolid color={color} size={size} />
              ) : (
                <HomeIcon color={color} size={size} />
              );
            case 'Kundli':
              return focused ? (
                <BookOpenIconSolid color={color} size={size} />
              ) : (
                <BookOpenIcon color={color} size={size} />
              );
            case 'Talk':
              return focused ? (
                <ChatBubbleLeftIconSolid color={color} size={size} />
              ) : (
                <ChatBubbleLeftIcon color={color} size={size} />
              );
            case 'Pooja':
              return focused ? (
                <GlobeAltIconSolid color={color} size={size} />
              ) : (
                <GlobeAltIcon color={color} size={size} />
              );
            case 'Services':
              return focused ? (
                <InboxArrowDownIconSolid color={color} size={size} />
              ) : (
                <InboxArrowDownIcon color={color} size={size} />
              );
            default:
              return null;
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

// Drawer
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabs}
        
        options={{ title: 'Home' }}
      />
      <Drawer.Screen name="Wallet" component={Wallet} />
      <Drawer.Screen name="Chat & Call History" component={ChatCallHistory} />
      <Drawer.Screen name="Edit Profile" component={EditProfile} />
      <Drawer.Screen name="Change Password" component={ChangePassword} />
    </Drawer.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    paddingBottom: SCREEN_HEIGHT * 0.01,
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
    color:'purple'
  },
  welcomeText: {
    fontSize: scaleFont(11),
    color: '#757575',
    fontWeight: '500',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
