import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import DrawerOpener from '../../components/DrawerOpener';
import AppText from '../../components/AppText';

const About: React.FC<DrawerScreenProps<any>> = (props) => {
  const { navigation } = props;

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerOpener />,
      title: 'О приложении',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AppText>Личные заметки</AppText>
      <AppText>Версия приложения 1.0.0</AppText>
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

export default About;
