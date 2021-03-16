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
import { selectIsPostUpdating, selectPost } from '../../store/post/selectors';
import { formatDate } from '../../utils/dates';
import { deletePostAsync, toggleBookedAsync } from '../../store/post/async';
import { AppState } from '../../types/state';

const Post: React.FC<StackScreenProps<MainParamsList, MainRoutes.Post>> = (props) => {
  const { route, navigation } = props;
  const { id } = route.params;
  const loading = useSelector((state: AppState) => selectIsPostUpdating(state, id));
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const post = useSelector((state: AppState) => selectPost(state, id));

  const handlePress = React.useCallback(() => {
    if (post) {
      dispatch(toggleBookedAsync(post));
    }
  }, [dispatch, post]);

  React.useEffect(() => {
    navigation.setOptions({
      title: `Пост от ${formatDate(post?.date, { showHours: true })}`,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            disabled={loading}
            onPress={handlePress}
            title="Take photo"
            iconName={post?.booked ? 'ios-star' : 'ios-star-outline'}
          />
        </HeaderButtons>
      ),
    });
  }, [handlePress, navigation, post, loading]);

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
        { text: 'Удалить', onPress: () => dispatch(deletePostAsync(post.id, navigation)) },
      ],
      { cancelable: false },
    );
  }, [post, dispatch, navigation]);

  if (!post) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }} style={styles.container}>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrapper}>
        <AppText>{post.text}</AppText>
      </View>
      <AppButton disabled={loading} onPress={handleDelete}>
        Удалить
      </AppButton>
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
