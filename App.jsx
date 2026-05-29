import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

import { ThemeProvider } from './src/context/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <RootNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
