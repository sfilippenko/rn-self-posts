import { Alert } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import * as FileSystem from 'expo-file-system';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThunkActionCommon } from '../../types/state';
import {
  addPost,
  addUpdateLoading,
  deletePost,
  getPosts,
  removeUpdateLoading,
  setCreateLoading,
  setPosts,
  updatePost,
} from './actions';
import { DB } from '../../../db';
import { Post } from '../../types/common';
import { MainRoutes } from '../../types/navigation';

export const getPostsAsync = (): ThunkActionCommon => async (dispatch) => {
  dispatch(getPosts());
  await new Promise((res) => setTimeout(res, 1000));
  try {
    const posts: Post[] = await DB.getPosts();
    posts.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
    dispatch(setPosts(posts));
  } catch (e) {
    Alert.alert(e.message);
    dispatch(setPosts([]));
  }
};

export const addPostAsync = (
  post: Pick<Post, 'img' | 'text'>,
  navigation: DrawerNavigationProp<any>,
): ThunkActionCommon => async (dispatch) => {
  dispatch(setCreateLoading(true));
  await new Promise((res) => setTimeout(res, 1000));
  try {
    if (!post.text) {
      throw new Error('Заполните текст');
    } else if (!post.img) {
      throw new Error('Сделайте фото');
    }
    const pathList = post.img.split('/');
    const newPath = FileSystem.documentDirectory + pathList[pathList.length - 1];
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img,
    });
    const newPost = {
      ...post,
      img: newPath,
      booked: false,
      date: new Date().toISOString(),
    };
    const id = await DB.createPost(newPost);
    dispatch(
      addPost({
        ...newPost,
        id,
      }),
    );
    navigation.navigate(MainRoutes.Main);
  } catch (e) {
    Alert.alert(e.message);
    dispatch(setCreateLoading(false));
  }
};

export const toggleBookedAsync = (post: Post): ThunkActionCommon => async (dispatch) => {
  dispatch(addUpdateLoading(post.id));
  await new Promise((res) => setTimeout(res, 1000));
  try {
    const newPost = {
      ...post,
      booked: !post.booked,
    };
    await DB.setPostBooked(newPost);
    dispatch(updatePost(newPost));
  } catch (e) {
    Alert.alert(e.message);
  } finally {
    dispatch(removeUpdateLoading(post.id));
  }
};

export const deletePostAsync = (
  id: number,
  navigation: StackNavigationProp<any>,
): ThunkActionCommon => async (dispatch) => {
  dispatch(addUpdateLoading(id));
  await new Promise((res) => setTimeout(res, 1000));
  try {
    await DB.deletePost(id);
    dispatch(deletePost(id));
    navigation.goBack();
  } catch (e) {
    Alert.alert(e.message);
  } finally {
    dispatch(removeUpdateLoading(id));
  }
};
