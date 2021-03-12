import React from 'react';
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { MainParamsList, MainRoutes } from '../../types/navigation';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import AppHeaderIcon from '../../components/AppHeaderIcon';
import { selectPosts } from '../../store/post/selectors';
import { toggleBooked } from '../../store/post/actions';

const Post: React.FC<StackScreenProps<MainParamsList, MainRoutes.Post>> = (props) => {
  const { route, navigation } = props;
  const { id, date } = route.params;
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  const post = posts.find((item) => item.id === id);

  const handlePress = React.useCallback(() => {
    if (post) {
      dispatch(toggleBooked(post.id));
    }
  }, [dispatch, post]);

  React.useEffect(() => {
    navigation.setOptions({
      title: `Пост от ${new Date(date).toLocaleString()}`,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            onPress={handlePress}
            title="Take photo"
            iconName={post?.booked ? 'ios-star' : 'ios-star-outline'}
          />
        </HeaderButtons>
      ),
    });
  }, [handlePress, navigation, date, post]);

  const handleDelete = React.useCallback(() => {
    if (!post) {
      return;
    }
    Alert.alert(
      'Удаление поста',
      'Вы точно хотите удалить пост?',
      [
        {
          text: 'Отменить',
          style: 'cancel',
        },
        { text: 'Удалить', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }, [post]);

  if (!post) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }} style={styles.container}>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrapper}>
        <AppText>{post.text}</AppText>
      </View>
      <AppButton onPress={handleDelete}>Удалить</AppButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textWrapper: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default Post;
