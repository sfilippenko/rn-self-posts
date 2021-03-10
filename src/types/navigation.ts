import { Post } from './common';

export enum Routes {
  Main = 'main',
  About = 'about',
  Create = 'create',
}

export enum MainRoutes {
  Main = 'mainRoute',
  Post = 'postRoute',
  Bookmarked = 'bookmarkedRoute',
}

export type MainParamsList = {
  [MainRoutes.Main]: undefined;
  [MainRoutes.Post]: Post;
  [MainRoutes.Bookmarked]: undefined;
};

export enum TabRoutes {
  MainTab = 'mainTab',
  BookmarkedTab = 'bookmarkedTab',
}
