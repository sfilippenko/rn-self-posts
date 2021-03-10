import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Routes } from './types/navigation';
import TabNavigator from './navigation/TabNavigator';
import AboutNavigator from './navigation/AboutNavigator';
import CreateNavigator from './navigation/CreateNavigator';
import { Colors } from './consts/theme';

const Drawer = createDrawerNavigator();

const Root: React.FC = () => {
  return (
    <Drawer.Navigator drawerContentOptions={{ activeTintColor: Colors.Main }}>
      <Drawer.Screen
        options={{ drawerLabel: 'Главная' }}
        name={Routes.Main}
        component={TabNavigator}
      />
      <Drawer.Screen
        options={{ drawerLabel: 'О приложении' }}
        name={Routes.About}
        component={AboutNavigator}
      />
      <Drawer.Screen
        options={{ drawerLabel: 'Новый пост' }}
        name={Routes.Create}
        component={CreateNavigator}
      />
    </Drawer.Navigator>
  );
};

export default Root;
