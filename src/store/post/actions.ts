import { createAction } from 'redux-actions';
import { Post } from '../../types/common';

export const getPosts = createAction('GET_POSTS');
export const setPosts = createAction<Post[]>('SET_POSTS');
export const updatePost = createAction<Post>('UPDATE_POST');
export const addPost = createAction<Post>('ADD_POST');
export const deletePost = createAction<number>('DELETE_POST');
export const setCreateLoading = createAction<boolean>('SET_CREATE_LOADING');
export const addUpdateLoading = createAction<number>('ADD_UPDATE_LOADING');
export const removeUpdateLoading = createAction<number>('REMOVE_UPDATE_LOADING');
