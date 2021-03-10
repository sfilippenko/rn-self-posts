import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import DrawerOpener from '../../components/DrawerOpener';

const Create: React.FC<DrawerScreenProps<any>> = (props) => {
  const { navigation } = props;

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerOpener />,
      title: 'Создать пост',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Main screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Create;
