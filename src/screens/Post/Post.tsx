import React from 'react';
import { StyleSheet, View, ScrollView, Alert, Pressable } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
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
import ImageViewer from '../../components/ImageViewer';
import ImageFullWidth from '../../components/ImageFullWidth';

const Post: React.FC<StackScreenProps<MainParamsList, MainRoutes.Post>> = (props) => {
  const { route, navigation } = props;
  const { id } = route.params;
  const loading = useSelector((state: AppState) => selectIsPostUpdating(state, id));
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
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <ImageViewer
        src={post.img}
        sourceRender={({ onOpen }) => {
          return (
            <Pressable onPress={onOpen} style={styles.imageWrapper}>
              <ImageFullWidth src={post.img} srcPrefix="postDetails" />
            </Pressable>
          );
        }}
      />
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
  },
  contentContainer: {
    padding: 10,
  },
  textWrapper: {
    marginBottom: 10,
  },
  imageWrapper: {
    marginBottom: 10,
  },
});

export default Post;
