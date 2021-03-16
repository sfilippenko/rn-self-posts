import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { Post } from '../../types/common';

export interface PostState {
  loading: boolean;
  loaded: boolean;
  posts: Post[];
  bookedPosts: Post[];
  createLoading: boolean;
  updatingIds: Record<number, boolean>;
}

const defaultState: PostState = {
  loading: false,
  loaded: false,
  posts: [],
  bookedPosts: [],
  createLoading: false,
  updatingIds: {},
};

const getBookedPosts = (posts: Post[]) => {
  return posts.filter((post) => post.booked);
};

export default handleActions<PostState, any>(
  {
    [actions.getPosts.toString()]: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    [actions.setPosts.toString()]: (state, { payload }: ReturnType<typeof actions.setPosts>) => {
      return {
        ...state,
        loading: false,
        loaded: true,
        posts: payload,
        bookedPosts: getBookedPosts(payload),
      };
    },
    [actions.updatePost.toString()]: (
      state,
      { payload }: ReturnType<typeof actions.updatePost>,
    ) => {
      const newPosts = state.posts.map((post) => {
        if (post.id === payload.id) {
          return payload;
        }
        return post;
      });
      return {
        ...state,
        posts: newPosts,
        bookedPosts: getBookedPosts(newPosts),
      };
    },
    [actions.addPost.toString()]: (state, { payload }: ReturnType<typeof actions.addPost>) => {
      const newPosts = [payload, ...state.posts];
      return {
        ...state,
        posts: newPosts,
        bookedPosts: getBookedPosts(newPosts),
        createLoading: false,
      };
    },
    [actions.deletePost.toString()]: (
      state,
      { payload }: ReturnType<typeof actions.deletePost>,
    ) => {
      const newPosts = state.posts.filter((post) => post.id !== payload);
      return {
        ...state,
        posts: newPosts,
        bookedPosts: getBookedPosts(newPosts),
      };
    },
    [actions.setCreateLoading.toString()]: (
      state,
      { payload }: ReturnType<typeof actions.setCreateLoading>,
    ) => {
      return {
        ...state,
        createLoading: payload,
      };
    },
    [actions.addUpdateLoading.toString()]: (
      state,
      { payload }: ReturnType<typeof actions.addUpdateLoading>,
    ) => {
      return {
        ...state,
        updatingIds: {
          ...state.updatingIds,
          [payload]: true,
        },
      };
    },
    [actions.removeUpdateLoading.toString()]: (
      state,
      { payload }: ReturnType<typeof actions.removeUpdateLoading>,
    ) => {
      return {
        ...state,
        updatingIds: {
          ...state.updatingIds,
          [payload]: false,
        },
      };
    },
  },
  defaultState,
);
