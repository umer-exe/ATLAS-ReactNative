import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CartScreen from '../screens/CartScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import TourDetailScreen from '../screens/TourDetailScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: '#5b3cc4' }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="TourDetail"
        component={TourDetailScreen}
        options={{
          title: 'Tour Details',
          headerBackTitleVisible: false,
          headerBackTitle: '',
          headerBackButtonDisplayMode: 'minimal',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
