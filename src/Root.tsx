import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './screens/Main';
import Post from './screens/Post';
import Create from './screens/Create';
import Bookmarked from './screens/Bookmarked';
import About from './screens/About';
import { ParamsList, Routes } from './types/navigation';
import { Colors } from './consts/theme';

const Stack = createStackNavigator<ParamsList>();

const Root: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: styles.header,
        headerTitleAlign: 'center',
        headerTintColor: Colors.White,
        cardStyle: styles.card,
      }}>
      <Stack.Screen
        name={Routes.Main}
        component={Main}
        options={{
          title: 'Главная',
        }}
      />
      <Stack.Screen
        name={Routes.Post}
        component={Post}
        options={{
          title: 'Пост',
        }}
      />
      <Stack.Screen name={Routes.About} component={About} />
      <Stack.Screen name={Routes.Bookmarked} component={Bookmarked} />
      <Stack.Screen name={Routes.Create} component={Create} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.Main,
  },
  card: {
    backgroundColor: Colors.White,
  },
});

export default Root;
