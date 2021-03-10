import React from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import AppHeaderIcon from '../AppHeaderIcon';

const DrawerOpener: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title="Toggle" iconName="ios-menu" onPress={navigation.toggleDrawer} />
    </HeaderButtons>
  );
};

export default DrawerOpener;
