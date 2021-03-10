import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainRoutes } from '../types/navigation';
import Main from '../screens/Main';
import Post from '../screens/Post';
import { screenOptions } from '../consts/navigation';

const Stack = createStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={MainRoutes.Main} component={Main} />
      <Stack.Screen name={MainRoutes.Post} component={Post} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
