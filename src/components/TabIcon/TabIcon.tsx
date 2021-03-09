import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TabRoutes } from '../../types/navigation';

interface Props {
  focused: boolean;
  color: string;
  size: number;
  route: BottomTabScreenProps<any>['route'];
}

const TabIcon: React.FC<Props> = (props) => {
  const { route, color, size } = props;
  let iconName: any = '';

  if (route.name === TabRoutes.MainTab) {
    iconName = 'ios-albums';
  } else if (route.name === TabRoutes.BookmarkedTab) {
    iconName = 'ios-star';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabIcon;
