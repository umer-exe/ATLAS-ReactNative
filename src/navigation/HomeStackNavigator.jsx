import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import TourDetailScreen from '../screens/TourDetailScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: '#5b3cc4' }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TourDetail" component={TourDetailScreen} options={{ title: 'Tour Details' }} />
    </Stack.Navigator>
  );
}
