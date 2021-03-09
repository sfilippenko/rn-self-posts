import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ParamsList, Routes } from '../../types/navigation';
import { DATA } from '../../consts/data';
import { Post as PostInterface } from '../../types/common';
import Post from '../../components/Post';
import AppHeaderIcon from '../../components/AppHeaderIcon';

const Bookmarked: React.FC<StackScreenProps<ParamsList, Routes.Bookmarked>> = (props) => {
  const { navigation } = props;

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Toggle" iconName="ios-menu" />
        </HeaderButtons>
      ),
      title: 'Избранное',
    });
  }, [navigation]);

  const keyExtractor = React.useCallback((post) => post.id, []);

  const renderItem: ListRenderItem<PostInterface> = React.useCallback(({ item }) => {
    return <Post data={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList<PostInterface>
        data={DATA.filter((item) => item.booked)}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Bookmarked;
