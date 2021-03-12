import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '../../types/navigation';
import AppHeaderIcon from '../../components/AppHeaderIcon';
import DrawerOpener from '../../components/DrawerOpener';
import { getPostsAsync } from '../../store/post/async';
import { selectPosts, selectPostsLoaded, selectPostsLoading } from '../../store/post/selectors';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';

const Main: React.FC<DrawerScreenProps<any>> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const loaded = useSelector(selectPostsLoaded);

  React.useEffect(() => {
    if (!loaded) {
      dispatch(getPostsAsync());
    }
  }, [dispatch, loaded]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Take photo"
            iconName="ios-camera"
            onPress={() => navigation.navigate(Routes.Create)}
          />
        </HeaderButtons>
      ),
      headerLeft: () => <DrawerOpener />,
      title: 'Мой блог',
    });
  }, [navigation]);

  return <View style={styles.container}>{loading ? <Loader /> : <PostList data={posts} />}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Main;
