import React from 'react';
import { View, Text, StatusBar, StyleSheet, Dimensions,  TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreditCardIcon, UsersIcon, BookmarkSquareIcon, EllipsisVerticalIcon, ArrowLeftOnRectangleIcon } from 'react-native-heroicons/outline';
import { createDrawerNavigator } from '@react-navigation/drawer';


//  Bottom tabs 
import ChangePassword from '../Components/UserMiniCompo/ChangePassword';
import Dashboard from '../Components/AstrologerMiniCompo/Dashboard';
import Chats from '../Components/AstrologerMiniCompo/Chats';

// Side bar 
import EditProfile from '../Components/AstrologerMiniCompo/EditProfile';
import Updates from '../Components/AstrologerMiniCompo/Updates';
import WalletDetails from '../Components/AstrologerMiniCompo/WalletDetails';
import EditExperience from '../Components/AstrologerMiniCompo/EditExperience';

// Dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Font scaling
const scaleFont = size => {
  const scale = Math.min(SCREEN_WIDTH / 375, SCREEN_HEIGHT / 667);
  return Math.round(size * scale);
};

// Top bar
const TopBar = ({ navigation }) => (
  <SafeAreaView
    edges={['top', 'left', 'right']}
    style={{ backgroundColor: '#FFE7FA' }}
  >
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <View style={styles.topBar}>
      <Text style={styles.logoText}>Navambhaw</Text>
      <View style={styles.topBarRight}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.replace('AstroSignIn')
          }}
        >
          <ArrowLeftOnRectangleIcon color="#800080" size={scaleFont(28)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dotsButton}
          onPress={() => {
            if (navigation && navigation.openDrawer) {
              navigation.openDrawer();
            }
          }}
        >
          <EllipsisVerticalIcon color="#800080" size={scaleFont(28)} />
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);

// Bottom Tabs
const Tab = createBottomTabNavigator();
function BottomTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <TopBar navigation={navigation} />,
        tabBarActiveTintColor: '#580A46',
        tabBarInactiveTintColor: '#454545',
        animationEnabled: true,
        tabBarIcon: ({ color, size, focused }) => {
          switch (route.name) {
            case 'Dashboard':
              return <CreditCardIcon color={color} size={size} />;
            case 'Chats':
              return <UsersIcon color={color} size={size} />;
            case 'Updates':
              return <BookmarkSquareIcon color={color} size={size} />;
          }
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Updates" component={Updates} />
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
      <Drawer.Screen name="Edit Profile" component={EditProfile} />
      <Drawer.Screen name="Edit Experience" component={EditExperience} />
      <Drawer.Screen name="Change Password" component={ChangePassword} />
      <Drawer.Screen name="Wallet Details" component={WalletDetails} />
    </Drawer.Navigator>
  );
}

// Styles
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: SCREEN_WIDTH * 0.04,
    paddingRight: SCREEN_WIDTH * 0.02,
    paddingBottom: SCREEN_WIDTH * 0.01,
    backgroundColor: '#FFE7FA',
  },
  logoText: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    color: '#800080',
    letterSpacing: 1,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor: '#ffffff5a',
    borderRadius: 25,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  dotsButton: {
    backgroundColor: '#ffffff5a',
    borderRadius: 25,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
