import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { Post as PostInterface } from '../../types/common';
import Post from '../Post';
import AppText from '../AppText';

interface Props {
  data: PostInterface[];
}

const PostList: React.FC<Props> = (props) => {
  const { data } = props;

  const keyExtractor = React.useCallback((post) => post.id, []);

  const renderItem: ListRenderItem<PostInterface> = React.useCallback(({ item }) => {
    return <Post data={item} />;
  }, []);

  if (data.length === 0) {
    return <AppText style={styles.text}>Нет постов</AppText>;
  }

  return (
    <FlatList<PostInterface> data={data} keyExtractor={keyExtractor} renderItem={renderItem} />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PostList;
