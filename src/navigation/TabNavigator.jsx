import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ContactScreen from '../screens/ContactScreen';
import HomeStackNavigator from './HomeStackNavigator';
import ToursStackNavigator from './ToursStackNavigator';

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
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Tours" component={ToursStackNavigator} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}
