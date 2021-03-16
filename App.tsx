import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import Root from './src/Root';
import store from './src/store';
import { DB } from './db';

const bootstrap = async () => {
  await DB.init();
};

const App: React.FC = () => {
  const [ready, setReady] = React.useState(false);

  if (!ready) {
    return (
      <AppLoading startAsync={bootstrap} onFinish={() => setReady(true)} onError={console.warn} />
    );
  }

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
