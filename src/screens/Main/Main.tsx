import React from 'react';
import { StyleSheet, View, FlatList, ListRenderItem } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Routes } from '../../types/navigation';
import { DATA } from '../../consts/data';
import { Post as PostInterface } from '../../types/common';
import Post from '../../components/Post';
import AppHeaderIcon from '../../components/AppHeaderIcon';
import DrawerOpener from '../../components/DrawerOpener';

const Main: React.FC<DrawerScreenProps<any>> = (props) => {
  const { navigation } = props;

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Take photo"
            iconName="ios-camera"
            onPress={() => navigation.navigate(Routes.Create)}
          />
        </HeaderButtons>
      ),
      headerLeft: () => <DrawerOpener />,
      title: 'Мой блог',
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
