import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainRoutes } from '../types/navigation';
import Post from '../screens/Post';
import { screenOptions } from '../consts/navigation';
import Bookmarked from '../screens/Bookmarked';

const Stack = createStackNavigator();

const BookmarkedNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={MainRoutes.Bookmarked} component={Bookmarked} />
      <Stack.Screen name={MainRoutes.Post} component={Post} />
    </Stack.Navigator>
  );
};

export default BookmarkedNavigator;
