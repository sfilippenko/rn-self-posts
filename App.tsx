import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Root from './src/Root';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Root />
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
