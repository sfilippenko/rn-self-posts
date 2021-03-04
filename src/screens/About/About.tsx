import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const About: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>About screen</Text>
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

export default About;
