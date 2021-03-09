import { Post } from './common';

export enum Routes {
  Main = 'main',
  Post = 'post',
  About = 'about',
  Bookmarked = 'bookmarked',
  Create = 'create',
}

export type ParamsList = {
  [Routes.Main]: undefined;
  [Routes.Post]: Post;
  [Routes.About]: undefined;
  [Routes.Bookmarked]: undefined;
  [Routes.Create]: undefined;
};
