import { ThunkActionCommon } from '../../types/state';
import { getPosts, setPosts } from './actions';
import { DATA } from '../../consts/data';

export const getPostsAsync = (): ThunkActionCommon => async (dispatch) => {
  dispatch(getPosts());
  await new Promise((res) => setTimeout(res, 1000));
  dispatch(setPosts(DATA));
};
