import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ParamsList, Routes } from '../../types/navigation';
import { DATA } from '../../consts/data';
import { Post as PostInterface } from '../../types/common';
import Post from './Post';
import AppHeaderIcon from '../../components/AppHeaderIcon';

const Main: React.FC<StackScreenProps<ParamsList, Routes.Main>> = (props) => {
  const { navigation } = props;

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Take photo" iconName="ios-camera" />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Toggle" iconName="ios-menu" />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const keyExtractor = React.useCallback((post) => post.id, []);

  const renderItem: ListRenderItem<PostInterface> = React.useCallback(({ item }) => {
    return <Post data={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList<PostInterface> data={DATA} keyExtractor={keyExtractor} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Main;
