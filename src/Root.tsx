import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './screens/Main';
import Post from './screens/Post';
import Bookmarked from './screens/Bookmarked';
import { Routes, TabRoutes } from './types/navigation';
import { Colors } from './consts/theme';
import TabBar from './components/TabBar';

const Tab = createBottomTabNavigator();

const BookmarkedStack = createStackNavigator();
const MainStack = createStackNavigator();

const BookmarkedStackScreen: React.FC = () => {
  return (
    <BookmarkedStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: styles.header,
        headerTitleAlign: 'center',
        headerTintColor: Colors.White,
        cardStyle: styles.card,
      }}>
      <BookmarkedStack.Screen name={Routes.Bookmarked} component={Bookmarked} />
      <BookmarkedStack.Screen name={Routes.Post} component={Post} />
    </BookmarkedStack.Navigator>
  );
};

const MainStackScreen: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: styles.header,
        headerTitleAlign: 'center',
        headerTintColor: Colors.White,
        cardStyle: styles.card,
      }}>
      <BookmarkedStack.Screen name={Routes.Main} component={Main} />
      <BookmarkedStack.Screen name={Routes.Post} component={Post} />
    </MainStack.Navigator>
  );
};

const Root: React.FC = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Все',
        }}
        name={TabRoutes.MainTab}
        component={MainStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Избранное',
        }}
        name={TabRoutes.BookmarkedTab}
        component={BookmarkedStackScreen}
      />
    </Tab.Navigator>
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
