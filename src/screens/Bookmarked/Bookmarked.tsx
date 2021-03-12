import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { MainParamsList, MainRoutes } from '../../types/navigation';
import DrawerOpener from '../../components/DrawerOpener';
import {
  selectBookedPosts,
  selectPostsLoaded,
  selectPostsLoading,
} from '../../store/post/selectors';
import { getPostsAsync } from '../../store/post/async';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';

const Bookmarked: React.FC<StackScreenProps<MainParamsList, MainRoutes.Bookmarked>> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const loading = useSelector(selectPostsLoading);
  const posts = useSelector(selectBookedPosts);
  const loaded = useSelector(selectPostsLoaded);

  React.useEffect(() => {
    if (!loaded) {
      dispatch(getPostsAsync());
    }
  }, [dispatch, loaded]);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerOpener />,
      title: 'Избранное',
    });
  }, [navigation]);

  return <View style={styles.container}>{loading ? <Loader /> : <PostList data={posts} />}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Bookmarked;
