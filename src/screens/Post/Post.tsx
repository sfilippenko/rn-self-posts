import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Post: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Post screen</Text>
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

export default Post;
