import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabRoutes } from '../../types/navigation';
import { Colors } from '../../consts/theme';
import AppText from '../AppText';

const iconNameMap: any = {
  [TabRoutes.MainTab]: 'ios-albums',
  [TabRoutes.BookmarkedTab]: 'ios-star',
};

const TabBar: React.FC<BottomTabBarProps> = (props) => {
  const insets = useSafeAreaInsets();
  const { state, descriptors, navigation } = props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ paddingBottom: insets.bottom }}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { name, key } = route;
          const { options } = descriptors[key];
          let label: any = name;
          if (options.tabBarLabel) {
            label = options.tabBarLabel;
          } else if (options.title) {
            label = options.title;
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: key,
            });
          };

          const color = isFocused ? Colors.Main : Colors.Gray;

          return (
            <TouchableOpacity
              key={key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.button}>
              <Ionicons name={iconNameMap[name]} size={30} color={color} />
              <AppText style={[styles.label, { color }]}>{label}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 10,
  },
});

export default TabBar;
