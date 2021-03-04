import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import AppButton from '../../components/AppButton';
import { Routes } from '../../types/navigation';

const Main: React.FC<StackScreenProps<any>> = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <AppButton onPress={() => navigation.navigate(Routes.Post)}>to post</AppButton>
      <Text>Main screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
