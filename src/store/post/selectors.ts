import { AppState } from '../../types/state';

export const selectPosts = (state: AppState) => state.post.posts;
export const selectBookedPosts = (state: AppState) => state.post.bookedPosts;
export const selectPostsLoading = (state: AppState) => state.post.loading;
export const selectPostsLoaded = (state: AppState) => state.post.loaded;
