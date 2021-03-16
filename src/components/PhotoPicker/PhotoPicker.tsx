import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, Image, Alert } from 'react-native';
import AppButton from '../AppButton';

interface Props {
  uri: string;
  onChange: (uri: string) => void;
  disabled?: boolean;
}

const PhotoPicker: React.FC<Props> = (props) => {
  const { uri, onChange, disabled } = props;

  const handlePress = React.useCallback(async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      Alert.alert('Нет прав');
      return;
    }
    const img = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: false,
    });
    if (!img.cancelled) {
      onChange(img.uri);
    }
  }, [onChange]);

  return (
    <View style={styles.wrapper}>
      <AppButton disabled={disabled} onPress={handlePress}>
        Сделать фото
      </AppButton>
      {!!uri && <Image resizeMode="contain" style={styles.image} source={{ uri }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});

export default PhotoPicker;
