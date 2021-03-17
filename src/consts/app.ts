import { Dimensions, Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;
