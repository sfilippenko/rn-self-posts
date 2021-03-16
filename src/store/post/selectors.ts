import { createSelector } from 'reselect';
import { AppState } from '../../types/state';

export const selectPosts = (state: AppState) => state.post.posts;
export const selectBookedPosts = (state: AppState) => state.post.bookedPosts;
export const selectPostsLoading = (state: AppState) => state.post.loading;
export const selectPostsLoaded = (state: AppState) => state.post.loaded;
export const selectPostsCreateLoading = (state: AppState) => state.post.createLoading;
export const selectPostsUpdatingIds = (state: AppState) => state.post.updatingIds;

export const selectPost = createSelector(
  [selectPosts, (state: AppState, id: number) => id],
  (posts, id) => {
    return posts.find((post) => post.id === id);
  },
);

export const selectIsPostUpdating = createSelector(
  [selectPostsUpdatingIds, (state: AppState, id: number) => id],
  (updatingIds, id) => {
    return updatingIds[id];
  },
);
