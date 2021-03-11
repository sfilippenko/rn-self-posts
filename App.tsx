import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Root from './src/Root';
import store from './src/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
