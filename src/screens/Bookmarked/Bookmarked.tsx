import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Bookmarked: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Bookmarked screen</Text>
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

export default Bookmarked;
