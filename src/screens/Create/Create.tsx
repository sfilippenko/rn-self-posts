import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Create: React.FC = () => {
  return (
    <View style={styles.container}>
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

export default Create;
