import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';

import ContactScreen from '../screens/ContactScreen';
import HomeScreen from '../screens/HomeScreen';
import ToursScreen from '../screens/ToursScreen';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

const tabImages = {
  Home: require('../../assets/images/tabs/home.png'),
  Tours: require('../../assets/images/tabs/tours.png'),
  Contact: require('../../assets/images/tabs/contact.png'),
};

function TabImageIcon({ focused, routeName }) {
  return (
    <View style={[styles.iconFrame, focused && styles.activeIconFrame]}>
      <Image
        resizeMode="contain"
        source={tabImages[routeName]}
        style={[
          styles.iconImage,
          { tintColor: focused ? colors.primary : colors.textMuted },
        ]}
      />
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabImageIcon focused={focused} routeName={route.name} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tours" component={ToursScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    minHeight: 72,
    paddingTop: 6,
    paddingBottom: 8,
  },
  tabItem: {
    gap: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  iconFrame: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  activeIconFrame: {
    backgroundColor: colors.primaryLight,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
});
