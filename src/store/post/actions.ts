import { createAction } from 'redux-actions';
import { Post } from '../../types/common';

export const getPosts = createAction('GET_POSTS');
export const setPosts = createAction<Post[]>('SET_POSTS');
export const toggleBooked = createAction<string>('TOGGLE_BOOKED');
export const addPost = createAction<Omit<Post, 'id'>>('ADD_POST');
