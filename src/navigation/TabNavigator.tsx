import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';
import { TabRoutes } from '../types/navigation';
import MainNavigator from './MainNavigator';
import BookmarkedNavigator from './BookmarkedNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Все',
        }}
        name={TabRoutes.MainTab}
        component={MainNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Избранное',
        }}
        name={TabRoutes.BookmarkedTab}
        component={BookmarkedNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
