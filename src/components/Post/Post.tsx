import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Post as PostInterface } from '../../types/common';
import AppText from '../AppText';
import { Colors } from '../../consts/theme';
import { MainRoutes } from '../../types/navigation';

interface Props {
  data: PostInterface;
}

const Post: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  const { data } = props;
  const { img, date } = data;

  const handlePress = React.useCallback(() => {
    navigation.navigate(MainRoutes.Post, data);
  }, [navigation, data]);

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={handlePress}>
      <ImageBackground source={{ uri: img }} style={styles.image}>
        <View style={styles.textWrapper}>
          <AppText style={styles.title}>{new Date(date).toLocaleDateString()}</AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  textWrapper: {
    backgroundColor: Colors.Black,
    opacity: 0.5,
    paddingVertical: 5,
    alignItems: 'center',
  },
  title: {
    color: Colors.White,
  },
});

export default Post;
