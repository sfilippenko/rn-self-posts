import React from 'react';
import { StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import DrawerOpener from '../../components/DrawerOpener';
import AppText from '../../components/AppText';
import AppButton from '../../components/AppButton';
import { addPost } from '../../store/post/actions';
import { MainRoutes } from '../../types/navigation';
import PhotoPicker from '../../components/PhotoPicker';

const Create: React.FC<DrawerScreenProps<any>> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const isFocused = useIsFocused();

  const [text, setText] = React.useState('');
  const [uri, setUri] = React.useState('');

  React.useEffect(() => {
    return () => {
      setText('');
      setUri('');
    };
  }, [isFocused]);

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DrawerOpener />,
      title: 'Создать пост',
    });
  }, [navigation]);

  const handleCreate = React.useCallback(() => {
    if (!text.trim()) {
      Alert.alert('Заполните текст');
    } else if (!uri) {
      Alert.alert('Сделайте фото');
    } else {
      dispatch(
        addPost({
          img: uri,
          date: new Date().toJSON(),
          text: text.trim(),
        }),
      );
      navigation.navigate(MainRoutes.Main);
    }
  }, [navigation, dispatch, text, uri]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={headerHeight}
      behavior="height">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <AppText style={styles.title}>Создай новый пост</AppText>
        <TextInput
          multiline
          value={text}
          onChangeText={setText}
          placeholder="Введите текст"
          style={styles.textarea}
        />
        <PhotoPicker uri={uri} onChange={setUri} />
        <AppButton onPress={handleCreate}>Создать</AppButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  },
});

export default Create;
