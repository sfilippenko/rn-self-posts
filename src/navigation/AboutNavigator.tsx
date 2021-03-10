import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../types/navigation';
import { screenOptions } from '../consts/navigation';
import About from '../screens/About';

const Stack = createStackNavigator();

const AboutNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={Routes.About} component={About} />
    </Stack.Navigator>
  );
};

export default AboutNavigator;
