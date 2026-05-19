import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TourDetailScreen from '../screens/TourDetailScreen';
import ToursScreen from '../screens/ToursScreen';

const Stack = createNativeStackNavigator();

export default function ToursStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: '#5b3cc4' }}>
      <Stack.Screen name="ToursScreen" component={ToursScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TourDetail" component={TourDetailScreen} options={{ title: 'Tour Details' }} />
    </Stack.Navigator>
  );
}
