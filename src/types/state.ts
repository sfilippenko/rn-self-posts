import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { PostState } from '../store/post/reducer';

export interface AppState {
  post: PostState;
}

export type ThunkActionCommon = ThunkAction<any, AppState, unknown, AnyAction>;
