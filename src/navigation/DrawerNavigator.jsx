import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import CartStackNavigator from './CartStackNavigator';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

function AtlasDrawerContent(props) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Home" onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} />
      <DrawerItem label="Tours" onPress={() => navigation.navigate('MainTabs', { screen: 'Tours' })} />
      <DrawerItem label="Contact" onPress={() => navigation.navigate('MainTabs', { screen: 'Contact' })} />
      <DrawerItem label="Cart" onPress={() => navigation.navigate('CartStack')} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AtlasDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="MainTabs" component={TabNavigator} />
      <Drawer.Screen name="CartStack" component={CartStackNavigator} />
    </Drawer.Navigator>
  );
}
