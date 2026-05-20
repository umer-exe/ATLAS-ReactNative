import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import AppStackNavigator from './AppStackNavigator';

const Drawer = createDrawerNavigator();

function AtlasDrawerContent(props) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Home" onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} />
      <DrawerItem label="Tours" onPress={() => navigation.navigate('MainTabs', { screen: 'Tours' })} />
      <DrawerItem label="Contact" onPress={() => navigation.navigate('MainTabs', { screen: 'Contact' })} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AtlasDrawerContent {...props} />}
      screenOptions={({ route }) => {
        const activeRoute = getFocusedRouteNameFromRoute(route) ?? 'MainTabs';
        const drawerEnabled = !['TourDetail', 'Cart', 'OrderConfirmation'].includes(activeRoute);

        return {
          headerShown: false,
          swipeEnabled: drawerEnabled,
        };
      }}
    >
      <Drawer.Screen name="AppStack" component={AppStackNavigator} />
    </Drawer.Navigator>
  );
}
