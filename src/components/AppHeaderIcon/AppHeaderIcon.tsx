import React from 'react';
import { HeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../consts/theme';

type Props = Omit<HeaderButtonProps, 'iconSize' | 'color' | 'IconComponent'>;

const AppHeaderIcon: React.FC<Props> = (props) => {
  return <HeaderButton IconComponent={Ionicons} iconSize={24} color={Colors.White} {...props} />;
};

export default AppHeaderIcon;
