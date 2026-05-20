import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ContactScreen from '../screens/ContactScreen';
import HomeScreen from '../screens/HomeScreen';
import ToursScreen from '../screens/ToursScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5b3cc4',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tours" component={ToursScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}
