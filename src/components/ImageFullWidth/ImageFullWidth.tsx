import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface Props {
  src: string;
  srcPrefix: string; // для добавления уникальности
}

interface Params {
  width: number;
  height: number;
}

const defaultParams: Params = {
  height: 0,
  width: 0,
};

const cache: Record<string, Params> = {};
const getUniqueKey = (srcPrefix: string, src: string) => `${srcPrefix}-${src}`;

const ImageFullWidth: React.FC<Props> = (props) => {
  const { src, srcPrefix } = props;
  const [{ width, height }, setParams] = React.useState<Params>(
    cache[getUniqueKey(srcPrefix, src)] || defaultParams,
  );

  const imageWrapperRef = React.createRef<View>();

  const measureElement = React.useCallback((): Promise<number> => {
    return new Promise((resolve) => {
      imageWrapperRef.current?.measure((x: number, y: number, width: number) => {
        resolve(width);
      });
    });
  }, [imageWrapperRef]);

  const measureImageDimensions = React.useCallback((): Promise<Params> => {
    return new Promise((resolve) => {
      if (cache[src]) {
        resolve(cache[src]);
      }
      Image.getSize(src, (width: number, height: number) => {
        cache[src] = { width, height };
        resolve({ width, height });
      });
    });
  }, [src]);

  React.useEffect(() => {
    if (cache[getUniqueKey(srcPrefix, src)]) {
      return;
    }
    Promise.all([measureElement(), measureImageDimensions()]).then(([elemWidth, dimensions]) => {
      const coef = dimensions.width / dimensions.height;
      const params = {
        width: elemWidth,
        height: elemWidth / coef,
      };
      cache[getUniqueKey(srcPrefix, src)] = params;
      setParams(params);
    });
  }, [measureElement, measureImageDimensions, srcPrefix, src]);

  return (
    <View renderToHardwareTextureAndroid ref={imageWrapperRef} style={styles.imageWrapper}>
      <Image source={{ uri: src }} style={{ width, height }} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: '100%',
  },
});

export default ImageFullWidth;
