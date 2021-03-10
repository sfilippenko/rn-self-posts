import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../types/navigation';
import { screenOptions } from '../consts/navigation';
import Create from '../screens/Create';

const Stack = createStackNavigator();

const CreateNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={Routes.Create} component={Create} />
    </Stack.Navigator>
  );
};

export default CreateNavigator;
