import { handleActions } from 'redux-actions';
import * as actions from './actions';
import { Post } from '../../types/common';

export interface PostState {
  loading: boolean;
  loaded: boolean;
  posts: Post[];
  bookedPosts: Post[];
}

const defaultState: PostState = {
  loading: false,
  loaded: false,
  posts: [],
  bookedPosts: [],
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
    [actions.toggleBooked.toString()]: (
      state,
      { payload }: ReturnType<typeof actions.toggleBooked>,
    ) => {
      const allPosts = state.posts.map((post) => {
        if (post.id === payload) {
          return {
            ...post,
            booked: !post.booked,
          };
        }
        return post;
      });
      return {
        ...state,
        posts: allPosts,
        bookedPosts: getBookedPosts(allPosts),
      };
    },
    [actions.addPost.toString()]: (state, { payload }: ReturnType<typeof actions.addPost>) => {
      const newPosts = [{ ...payload, id: String(Math.random()) } as Post, ...state.posts];
      return {
        ...state,
        posts: newPosts,
        bookedPosts: getBookedPosts(newPosts),
      };
    },
  },
  defaultState,
);
