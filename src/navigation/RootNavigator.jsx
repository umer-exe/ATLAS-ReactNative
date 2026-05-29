import { NavigationContainer } from '@react-navigation/native';

import AppStackNavigator from './AppStackNavigator';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
}
